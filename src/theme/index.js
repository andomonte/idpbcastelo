import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { colors } from '@material-ui/core';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#304ffe', // '#ff3d00',
    },
    secondary: {
      main: '#000000',
    },
    default: {
      main: '#1a237e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ffff8d',
      dark: '#ffff',
      paper: colors.common.white,
      yellow: '#ffd600',
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

export default theme;
