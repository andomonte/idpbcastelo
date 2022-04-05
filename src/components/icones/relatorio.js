import React from 'react';
import { Icon } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

function Relatorio({ cor }) {
  return (
    <Icon>
      <AssignmentIcon style={{ color: cor }} />
      {/* <img src="/images/relatorio.svg" height={25} width={25} alt="relatorio" /> */}
    </Icon>
  );
}

export default Relatorio;
