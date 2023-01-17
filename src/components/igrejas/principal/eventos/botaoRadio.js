import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup({ setBotaoRadio }) {
  return (
    <FormControl
      style={{
        fontFamily: 'Fugaz One',
        width: '96vw',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <FormLabel
        style={{
          fontFamily: 'Fugaz One',
          width: '100%',
          color: 'white',
          textAlign: 'center',
        }}
        id="demo-row-radio-buttons-group-label"
      >
        QUEM SERÁ INSCRITO?
      </FormLabel>
      <RadioGroup
        onChange={(e) => setBotaoRadio(e.target.value)}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="eu"
        style={{
          fontFamily: 'Fugaz One',
          width: '100%',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <FormControlLabel
          style={{
            fontFamily: 'Fugaz One',
            color: 'white',
            margin: 10,
          }}
          value="eu"
          control={<Radio style={{ color: 'white', marginRight: 1 }} />}
          label="EU "
        />
        <FormControlLabel
          style={{
            fontFamily: 'Fugaz One',
            color: 'white',
            marginLeft: 20,
          }}
          value="outros"
          control={<Radio style={{ color: 'white', marginRight: 1 }} />}
          label="M"
        />
        <FormControlLabel
          style={{
            fontFamily: 'Fugaz One',
            color: 'white',
            marginLeft: 10,
          }}
          value="outros"
          control={<Radio style={{ color: 'white', marginRight: 1 }} />}
          label="OUTROS"
        />
      </RadioGroup>
    </FormControl>
  );
}
