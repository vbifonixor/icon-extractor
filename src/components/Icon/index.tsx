import React, {SVGProps, useEffect, useState} from 'react';
import loadable from '@loadable/component';
import './styles.css';

type Props =
  | {
      type: 'mono';
      name: string;
      fill?: string;
    }
  | {
      type: 'multi' | 'illustration';
      name: string;
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

  useEffect(() => {
    (async function getImage() {
      try {
        const loadedImage = (await import(
          `./img/${type}/${name}.svg`
        )) as {default: string};
        setImage(loadedImage.default);
      } catch (error) {
        // Do nothing for now
      }
    })();
  }, [type, name]);

  if (image) {
    return <img src={image} alt={name} className={className} />;
  }

  return null;
};
export class Icon extends React.Component<Props> {
  render() {
    const {type, name} = this.props;

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
