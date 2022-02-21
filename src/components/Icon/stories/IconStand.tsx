import React, {useCallback, useState} from 'react';
import {Icon} from '../';
import {useClipboard} from 'use-clipboard-copy';
import './styles.css';

type Props = {
  children: JSX.Element;
  name: string;
  type: string;
  color?: string;
};

const getIconCode = (type: string, name: string) =>
  `<Icon type="${type}" name="${name}" />`;

export const IconStand = ({children, name, type, color}: Props) => {
  const clipboard = useClipboard();

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyName = useCallback(() => {
    clipboard.copy(getIconCode(type, name));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1000);
  }, [type, name, clipboard]);

  return (
    <div className={`iconStand ${type}`}>
      <div className="iconStand-icon" style={{color}}>
        {children}
      </div>
      <div className="iconStand-name" onClick={handleCopyName}>
        <span className="iconStand-nameText">{name}</span>
        <span
          className={`iconStand-nameCopyIcon ${
            copySuccess ? 'success' : 'neutral'
          }`}
        >
          {copySuccess ? (
            <Icon type="mono" name="check" />
          ) : (
            <Icon type="mono" name="clipboard" />
          )}
        </span>
      </div>
    </div>
  );
};
