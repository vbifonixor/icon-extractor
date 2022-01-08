require('dotenv').config();
const superagent = require('superagent');

const {FIGMA_TOKEN} = process.env;

const FIGMA_API_HOST = 'https://api.figma.com/v1';
const ICONS_FILE_KEY = 'yYOcOaqdNOd40vLvc29Dws';

const agent = superagent.agent();

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

  console.log(
    figmaDocument?.document?.children
      .map(({children}) => children)
      .reduce((acc, children) => [...acc, ...children])
      .filter(({type}) => type === 'FRAME'),
  );

  // .map((el) => el.children)
  // .reduce((acc, children) => [...acc, ...children], [])
  // .filter((child) => child.type === 'FRAME'),
}
main();
