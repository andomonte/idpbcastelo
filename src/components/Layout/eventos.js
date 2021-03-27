import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 45,
    width: '100%',
    borderRadius: 16,
  },
  input: {
    flex: 1,
    padding: 10,
  },
}));

export default function eventos() {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.search}>
      <Box />
      <InputBase
        className={classes.input}
        placeholder="Pesquisar Igreja"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
