import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { colors } from '@material-ui/core';

// Create a theme instance.
const Cores = createTheme({
  principal: '#800004',
  principal2: '#B55E5E',
  secundaria: '#fafafa',
  tercenaria: '#3f51b5',
  fundo: '#e1f5fe',
  iconeOn: '#ffff8d',
  iconeOff: '#eeee',
  textoP: '#fff9c4',
  textoS: '#fafafa',
  fundo1: '#ffff8d',
  button1: '#3f51b5',
  button2: '#e65100',

  logo: 'images/castelo/logo.png',
  logo2: 'images/castelo/logo2.png',
  palette: {
    primary: {
      main: '#304ffe', // '#ff3d00',
    },
    secondary: {
      main: '#000000',
    },
    danger: {
      main: '#ff3d00',
    },
    default: {
      main: '#1a237e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      dark: '#ffff',
      paper: colors.common.white,
      white: '#ffd600',
    },
    text: {
      primary: colors.blueGrey[900],
      secundary: colors.blueGrey[600],
    },
    action: {
      active: '#000',
    },
  },
});

export default Cores;
