import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Icon} from '../';
import catalog from '../catalog.json';
import {IconStand} from './IconStand';
import {
  IllustrationsNames,
  MonochromeIconNames,
  MulticolorIconNames,
} from '../iconNames';
import './styles.css';

export default {
  title: 'Icon',
  controls: {
    hideNoControlsWarning: true,
  },
  argTypes: {},
} as ComponentMeta<typeof Icon>;

const MonochromeCupboard = ({color}: {color: string}) => (
  <div className="wrapper">
    <h1 className="heading">Monochrome Icons</h1>
    <div className="container">
      {catalog.mono.map((iconName) => {
        return (
          <div className="item">
            <IconStand
              name={iconName}
              key={`mono-${iconName}`}
              type="mono"
              color={color}
            >
              <Icon
                name={iconName as MonochromeIconNames}
                type="mono"
              />
            </IconStand>
          </div>
        );
      })}
    </div>
  </div>
);

export const Monochrome: ComponentStory<typeof MonochromeCupboard> =
  ({color}) => {
    return <MonochromeCupboard color={color} />;
  };

Monochrome.argTypes = {
  color: {
    control: {
      type: 'color',
      presetColors: [
        {color: '#f368e0', title: 'Lian Hong Lotus Pink'},
        {color: '#feca57', title: 'Casandora Yellow'},
        {color: '#ff6b6b', title: 'Pastel Red'},
        {color: '#48dbfb', title: 'Megaman'},
        {color: '#1dd1a1', title: 'Wild Carribean Green'},
        {color: '#00d2d3', title: 'Jade Dust'},
        {color: '#54a0ff', title: 'Joust Blue'},
        {color: '#5f27cd', title: 'Nasu Purple'},
        {color: '#222f3e', title: 'Imperial Primer'},
      ],
    },
  },
};

Monochrome.args = {
  color: '#222f3e',
};

const MulticolorCupboard = () => (
  <div className="wrapper">
    <h1 className="heading">Multicolor Icons</h1>
    <div className="container">
      {catalog.multi.map((iconName) => {
        return (
          <div className="item">
            <IconStand
              name={iconName}
              key={`multi-${iconName}`}
              type="multi"
            >
              <Icon
                name={iconName as MulticolorIconNames}
                type="multi"
              />
            </IconStand>
          </div>
        );
      })}
    </div>
  </div>
);

export const Multicolor: ComponentStory<typeof MulticolorCupboard> =
  () => {
    return <MulticolorCupboard />;
  };

const IllustrationCupboard = ({name}: {name: IllustrationsNames}) => (
  <div className="wrapper">
    <h1 className="heading">Illustration</h1>
    <div className="container illustration">
      <IconStand
        name={name}
        key={`illustration-${name}`}
        type="illustration"
      >
        <Icon name={name} type="illustration" />
      </IconStand>
    </div>
  </div>
);

export const Illustration: ComponentStory<
  typeof IllustrationCupboard
> = ({name}: {name: IllustrationsNames}) => (
  <IllustrationCupboard name={name} />
);

Illustration.argTypes = {
  name: {
    control: {
      type: 'select',
      options: catalog.illustration as IllustrationsNames[],
    },
  },
};

Illustration.args = {
  name: catalog.illustration[0] as IllustrationsNames,
};
