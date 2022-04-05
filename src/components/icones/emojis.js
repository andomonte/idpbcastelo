import React from 'react';
import { Icon } from '@material-ui/core';

function Emojis({ tipo }) {
  return (
    <div>
      {tipo === 'alegre' && (
        <img src="/images/alegre.png" height={30} width={30} alt="emojis" />
      )}
      {tipo === 'igual' && (
        <img src="/images/igual.png" height={30} width={30} alt="emojis" />
      )}
      {tipo === 'triste' && (
        <img src="/images/triste.png" height={30} width={30} alt="emojis" />
      )}
    </div>
  );
}

export default Emojis;
