import React, {ReactNode, SVGProps, useEffect, useState} from 'react';
import loadable from '@loadable/component';
import './styles.css';

type Props = (
  | {
      type: 'mono';
      name: string;
      fill?: string;
    }
  | {
      type: 'multi' | 'illustration';
      name: string;
    }
) & {
  fallback?: ReactNode;
};

type State = {
  hasError?: boolean;
};

const DynamicComponentIcon = loadable(
  (props: SVGProps<SVGSVGElement> & Pick<Props, 'type' | 'name'>) =>
    import(`./img/${props.type}/${props.name}.jsx.svg`),
);

const ImageIcon = ({
  type,
  name,
  className,
}: Pick<Props, 'type' | 'name'> & {className?: string}) => {
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

  return null;
};
export class Icon extends React.PureComponent<
  Props,
  {hasError: false}
> {
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
    const {type, name, fallback = null} = this.props;
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
            className="icon icon-mono"
          />
        );
      case 'multi':
        return (
          <ImageIcon
            type={type}
            name={name}
            className="icon icon-multi"
          />
        );
      case 'illustration':
        return (
          <ImageIcon
            type={type}
            name={name}
            className="icon icon-illustration"
          />
        );
      default:
        return null;
    }
  }
}
