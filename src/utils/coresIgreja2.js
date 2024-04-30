import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { colors } from '@material-ui/core';

// Create a theme instance.
/* const Cores = createTheme({
  principal: '#1a237e',
  principal2: '#5c6bc0', // '#3f50b5',
  secundaria: '#fafafa',
  tercenaria: '#b91072',
  textoP: '#fff9c4',
  textoS: '#fafafa',
  button1: '#e6ee9c',
  button2: '#9c27b0',
  box1: '#e1bee7',
  box2: '#e6ee9c',
  iconeOn: '#ffff00',
  iconeOff: '#eeee',

  logo: 'images/logo1.png',
  logo2: 'images/logo.png',
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
}); */
const Cores = createTheme({
  principal: '#1a237e',
  principal2: '#5c6bc0', // '#3f50b5',
  secundaria: '#fafafa',
  tercenaria: '#b91072',
  texto1: '#90a4ae',
  texto2: '#ffff8d',
  textoP: '#fff9c4',
  textoS: '#fafafa',
  fundo1: '#ffff8d',
  button1: '#781008',
  button2: '#e65100',
  iconeOn: '#ffff8d',
  iconeOff: '#eeee',
  logo: '/images/logo1.png',
  logo2: '/images/logo.png',
  palette: {
    primary: {
      main: '#304ffe', // '#ff3d00',
    },
    secondary: {
      main: '#000000',
    },
    danger: {
      main: '#ff3d0A',
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
