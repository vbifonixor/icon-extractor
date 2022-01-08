require('dotenv').config();
const superagent = require('superagent');

const {FIGMA_TOKEN} = process.env;

const FIGMA_API_HOST = 'https://api.figma.com/v1';
const ICONS_FILE_KEY = 'yYOcOaqdNOd40vLvc29Dws';
const CONTAINER_NODE_TYPE = 'FRAME';
const ICON_NODE_TYPE = 'COMPONENT';

const Types = {
  Mono: 'mono',
  Multi: 'multi',
  Illustration: 'illustration',
  Stub: 'stub',
  Unknown: 'unknown',
};

const PREFIXES = {
  [Types.Mono]: 'mono-',
  [Types.Multi]: 'multi-',
  [Types.Illustration]: 'illustration-',
  [Types.Stub]: 'stub-',
};

const getTypeByPrefix = (name) => {
  return Object.entries(PREFIXES).reduce((acc, [type, prefix]) => {
    if (name.startsWith(prefix)) {
      return type;
    }
    return acc;
  }, Types.Unknown);
};

const IGNORED_TYPES = [Types.Stub, Types.Unknown];

const agent = superagent.agent();

const transformFigmaNode = (
  {name, id},
  parentType = Types.Unknown,
) => {
  const iconExplicitType = getTypeByPrefix(name);
  return {
    name,
    id,
    type:
      iconExplicitType !== Types.Unknown
        ? iconExplicitType
        : parentType,
  };
};

async function main() {
  if (!FIGMA_TOKEN) {
    console.error(
      'No figma token found! Make sure FIGMA_TOKEN is in your .env file or is in your environment variables',
    );
    process.exit(1);
  }

  let figmaDocument;

  try {
    figmaDocument = (
      await agent
        .get(`${FIGMA_API_HOST}/files/${ICONS_FILE_KEY}`)
        .set('X-FIGMA-TOKEN', FIGMA_TOKEN)
    ).body;
  } catch (error) {
    console.error('Something terrible happened!');
    console.log(error);
    process.exit(1);
  }

  const iconNodes = figmaDocument?.document?.children
    .map(({children}) => children)
    .reduce((acc, pageNodes) => [...acc, ...pageNodes], [])
    .reduce((acc, node) => {
      if (
        node.type === CONTAINER_NODE_TYPE &&
        node?.children?.length
      ) {
        const containerType = getTypeByPrefix(node.name);
        return [
          ...acc,
          ...node.children
            .map((childNode) =>
              childNode.type === ICON_NODE_TYPE
                ? transformFigmaNode(childNode, containerType)
                : null,
            )
            .filter(Boolean),
        ];
      } else if (node.type === ICON_NODE_TYPE) {
        return [...acc, transformFigmaNode(node)];
      }

      return acc;
    }, [])
    .filter(({type}) => !IGNORED_TYPES.includes(type));
}
main();
