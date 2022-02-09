import React from 'react';
import spinnerImg from './img/loader.svg';
import './styles.css';

export enum Sizes {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
  FIT = 'FIT',
}

export const Preloader = ({size = Sizes.FIT}) => {
  return (
    <img className={`preloader preloader-${size}`} src={spinnerImg} />
  );
};
