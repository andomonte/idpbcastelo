// Display posts in frontend (in /pages/index.tsx)
import useSWR from 'swr';
import fetch from 'unfetch';
import ListaIgreja from 'src/components/Layout/pesquisaIgreja';
import { Box, Grid } from '@material-ui/core';
import Pesquisar from 'src/components/Layout/pesquisar';
import { makeStyles } from '@material-ui/core/styles';

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
  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;
  return (
    <Box className={classes.input}>
      <Grid container mb={4}>
        <Pesquisar />
      </Grid>
      {data.map((item) => (
        <Grid key={item.id} item xl={12}>
          <ListaIgreja item={item} />
        </Grid>
      ))}
    </Box>
  );
}
