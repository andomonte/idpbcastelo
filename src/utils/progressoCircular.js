import * as React from 'react';
import Slider from '@mui/material/Slider';

export default function SxProp({ percentual, setPercentual }) {
  return (
    <Slider
      defaultValue={percentual}
      onChange={(e) => {
        setPercentual(e.target.value);
      }}
      sx={{
        width: '100%',
        color: 'white',
      }}
    />
  );
}
