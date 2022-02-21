import React, {ReactNode, SVGProps, useEffect, useState} from 'react';
import {Preloader, Sizes as PreloaderSizes} from '../Preloader';
import {
  MonochromeIconNames,
  MulticolorIconNames,
  IllustrationsNames,
} from './iconNames';
import loadable from '@loadable/component';
import './styles.css';

type Props = (
  | {
      type: 'mono';
      name: MonochromeIconNames;
      fill?: string;
    }
  | {
      type: 'multi';
      name: MulticolorIconNames;
    }
  | {
      type: 'illustration';
      name: IllustrationsNames;
    }
) & {
  fallback?: ReactNode;
  loader?: ReactNode;
};

type State = {
  hasError?: boolean;
};

const DynamicComponentIcon = loadable(
  (props: SVGProps<SVGSVGElement> & Pick<Props, 'type' | 'name'>) =>
    import(`./img/${props.type}/${props.name}.jsx.svg`),
  {cacheKey: ({type, name}) => `${type}-${name}`},
);

const ImageIcon = ({
  type,
  name,
  loader,
  className,
}: Pick<Props, 'type' | 'name' | 'loader'> & {
  className?: string;
}) => {
  const [image, setImage] = useState<null | string>(null);

  const [error, setError] = useState<unknown>(null);

  if (error) {
    throw error;
  }

  useEffect(() => {
    (async function getImage() {
      try {
        const loadedImage = (await import(
          `./img/${type}/${name}.svg`
        )) as {default: string};
        setImage(loadedImage.default);
      } catch (err) {
        setError(err);
      }
    })();
  }, [type, name]);

  if (image) {
    return <img src={image} alt={name} className={className} />;
  }

  return <>{loader}</>;
};
export class Icon extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  override componentDidUpdate({
    name: prevName,
    type: prevType,
  }: Props) {
    const {name, type} = this.props;
    const {hasError} = this.state;

    if (hasError && (name !== prevName || type !== prevType)) {
      this.setState({hasError: false});
    }
  }

  render() {
    const {type, name, fallback = null, loader = null} = this.props;
    const {hasError} = this.state;

    if (hasError) {
      return fallback;
    }

    switch (type) {
      case 'mono':
        return (
          <DynamicComponentIcon
            type={type}
            name={name}
            // fallback prop for loadable compnents means
            // "the thing that renders when component is being loaded"
            // more: https://loadable-components.com/docs/fallback/
            fallback={<Preloader />}
            className="icon icon-mono"
          />
        );
      case 'multi':
        return (
          <ImageIcon
            type={type}
            name={name}
            loader={loader || <Preloader />}
            className="icon icon-multi"
          />
        );
      case 'illustration':
        return (
          <ImageIcon
            type={type}
            name={name}
            loader={
              loader || <Preloader size={PreloaderSizes.LARGE} />
            }
            className="icon icon-illustration"
          />
        );
      default:
        return null;
    }
  }
}
