import React from 'react';

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

export class Icon extends React.Component<Props> {
  render() {
    const {type, name} = this.props;

    console.log(type, name);
    return null;
  }
}
