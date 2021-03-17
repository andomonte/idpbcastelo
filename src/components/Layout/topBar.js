/* import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import Apps from '@material-ui/icons/Apps';
import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Hidden from '@material-ui/core/Hidden';
import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import HomeIcon from '@material-ui/icons/Home';
import Tab from '@material-ui/core/Tab';
// import Pesquisar from './pesquisar';
import { a11yProps, TabPanel } from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'theme.palette.background.default',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    cursor: 'pointer',
    height: 18,
    marginLeft: theme.spacing(3),
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 35,
    width: 700,
  },
  input: {
    flex: 1,
  },
}));

export default function topBar() {
  const classes = useStyles();
  const [session] = useSession();

  return (
    <AppBar className={classes.root} color="default">
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <MenuIcon />
          <img src="/images/IDPBNAC.png" alt="logo" className={classes.logo} />
        </Box>
        <Box display="flex">
          <Tabs
            value={TabPanel.value}
            onChange={TabPanel.handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />

            <IconButton className={classes.icons}>
              <HomeIcon {...a11yProps(0)} />
            </IconButton>
            <IconButton className={classes.icons}>
              <Apps {...a11yProps(1)} />
            </IconButton>
            <IconButton className={classes.icons}>
              <MoreVert {...a11yProps(2)} />
            </IconButton>
          </Tabs>
        </Box>
        {!session ? (
          <Button
            color="#000E2B"
            component="a"
            variant="outlined"
            startIcon={<AccountCircle />}
            onClick={() => signIn('google')}
          >
            Entrar
          </Button>
        ) : (
          <Box display="flex" alignItems="center">
            <Avatar
              onClick={() => signOut()}
              alt="User"
              className={classes.avatar}
              src={session?.user?.image}
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
 */
