// Display posts in frontend (in /pages/index.tsx)
import useSWR from 'swr';
import fetch from 'unfetch';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');
import Pesquisar from './searchResult';
import ListaIgreja from '../pesquisa/searchList';

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 4,
    [theme.breakpoints.down('md')]: {
      marginLeft: 4,
      marginRight: 4,
      marginTop: 4,
    },
  },
}));

const fetcher = (url) => fetch(url).then((r) => r.json());
export default function App() {
  const classes = useStyles();
  const { data, error } = useSWR('/api/consultaDados', fetcher);

  const searcher = new FuzzySearch(data, ['igreja', 'logradouro'], {
    caseSensitive: false,
  });
  const result = searcher.search(Pesquisar.query);

  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;
  return (
    <Box className={classes.input}>
      <Grid container mb={4}>
        <Pesquisar />
      </Grid>
      {result.map((item) => (
        <Grid key={item.id} item xl={12}>
          <ListaIgreja item={item} />
        </Grid>
      ))}
    </Box>
  );
}
