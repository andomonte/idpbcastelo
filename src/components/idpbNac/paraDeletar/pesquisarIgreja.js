import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Box } from '@material-ui/core';

import MicIcon from '@material-ui/icons/Mic';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  search: {
    backgroundColor: '#fafafa',
    padding: '4px 4px',
    display: 'flex',
    // alignItems: 'center',
    height: 45,
    width: '80%',
    borderRadius: 16,
    marginLeft: 110,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 4,
      marginTop: 4,
      marginBottom: 25,
    },
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
  },
  imgSearch: {
    display: 'flex',
    alignItems: 'center',
    height: '40%',
    width: '15%',
    marginLeft: '40%',
    marginBottom: 20,
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '20%',
      marginLeft: '40%',
      marginTop: 4,
    },
  },
}));

export default function pesquisar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [name, setName] = React.useState();
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Box>
      <img className={classes.imgSearch} src="images/IDPBNAC.png" alt="IDPB" />
      <Paper component="form" className={classes.search}>
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          value={name}
          placeholder="Pesquisar Igreja"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={handleChange}
        />
        <IconButton type="submit" aria-label="search">
          <MicIcon
            style={{ color: '#304ffe' }}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          />
        </IconButton>
      </Paper>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>Pesquisa de voz.</Typography>
      </Popover>
    </Box>
  );
}
