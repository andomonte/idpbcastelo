import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Box } from '@material-ui/core';
import Image from 'material-ui-image';
import MicIcon from '@material-ui/icons/Mic';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Fuse from 'fuzzy-search';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchResult from './searchResult';
import dados from './dados';

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
    height: '10%',
    width: '10%',
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

const options = {
  // Sort by score (metrix of similarity)
  shouldSort: true,
  // threshold: 0.3,
  threshold: 1,
  location: 0,
  distance: 10,
  maxPatternLength: 10,
  minMatchCharLength: 1,
  keys: ['studentId', 'name.firstName', 'name.lastName'],
};

// Sleep function for DEMO
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const data = dados;
const fuse = new Fuse(data, options);

const SearchBar = ({ keyword, setKeyword }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //--------------------------------------------------------------------------

  const [query, setQuery] = React.useState('');
  // Are data loaded?
  const [loading, setLoading] = React.useState(true);
  // Do search
  const searchResult = fuse.search(query);
  // Showing large data causes frame dropping
  const searchResultShown = query ? searchResult : data;

  //------------------------------------------------------------------------------

  React.useEffect(
    () => {
      // Load data only once this component is mounted
      if (loading) {
        // Sleep to demonstrate capability of handle async requests
        (async () => {
          //  console.log('Loading data...');
          await sleep(3e3); // For demo purposes.
          //  console.log('Data loaded!');

          setLoading(false);
        })();
      }
    },
    /* Run this callback only once */ [],
  );

  return (
    <Box>
      <Image
        src="images/IDPBNAC.png"
        alt="IDPB"
        className={classes.imgSearch}
      />
      <Paper component="form" className={classes.search}>
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          key="random1"
          value={keyword}
          className={classes.input}
          placeholder="Pesquisar Igreja"
          inputProps={{ 'aria-label': 'search google maps' }}
          // onChange={(e) => setKeyword(e.target.value)}
          onChange={(e) => {
            setQuery(e.target.value);
            setKeyword(e.target.value);
          }}
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
      {loading ? <CircularProgress /> : <SearchResult searchResultShown />}

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
};

export default SearchBar;
