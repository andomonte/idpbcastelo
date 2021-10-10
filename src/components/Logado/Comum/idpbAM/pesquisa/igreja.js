// Display posts in frontend (in /pages/index.tsx)
import React from 'react';
import { Box, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip'; // dica ao passar o mouse
import SearchList from './searchList';

const useStyles = makeStyles((theme) => ({
  input_Box: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 4,
    [theme.breakpoints.down('md')]: {
      marginLeft: 4,
      marginRight: 4,
      marginTop: 4,
    },
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  search: {
    // backgroundColor: '#fafafa',
    padding: '4px 4px',
    display: 'flex',
    // alignItems: 'center',
    height: 45,
    width: '100%',
    borderRadius: 16,
    marginLeft: 100,
    maxWidth: 900,
    marginBottom: 0,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 4,
      marginTop: 4,
      marginBottom: 5,
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

function Igreja({ item }) {
  const classes = useStyles();
  console.log('ola', item);
  const [querys, updateQuery] = React.useState(null);
  const [valor, setValor] = React.useState('');

  const handleChange = ({ currentTarget }) => {
    setValor(currentTarget.value);
  };

  const handlePress = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      updateQuery(e.target.value);

      // write your functionality here
    }
    if (e.target.value === '') {
      updateQuery(null);
    }
  };
  const handleClick = () => {
    if (valor === '') {
      updateQuery(null);
    } else {
      updateQuery(valor);
    }
  };

  //= para procurar os dados  ==========================================
  const searcher = new FuzzySearch(item, ['igreja', 'logradouro'], {
    caseSensitive: false,
  });
  const result = searcher.search(querys);
  if (item === 'error') return <div>Erro ao acessar o Banco.</div>;
  if (!item) return <div>Carregando ...</div>;
  //= =================================================================

  return (
    <Box className={classes.input_box}>
      <Grid container mb={4}>
        <Box>
          <img
            className={classes.imgSearch}
            src="/images/IDPBNAC.png"
            alt="IDPB"
          />

          <TextField
            InputProps={{
              endAdornment: (
                <Tooltip title="Pesquisar Igreja">
                  <IconButton
                    style={{ color: '#304ffe' }}
                    type="button"
                    aria-label="search"
                    onClick={handleClick}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
            className={classes.search}
            id="field1"
            name="password"
            autoComplete="off"
            type="text"
            value={valor}
            variant="outlined"
            placeholder="Pesquisar Igreja"
            onChange={handleChange}
            // onKeyPress={handlePress}
            onKeyPress={handlePress}
          />
        </Box>
      </Grid>
      {result.map((items) => (
        <Grid key={items.id} item xl={12} className={classes.dados}>
          {items.vinculado === 'IDPB-AM' && <SearchList item={items} />}
        </Grid>
      ))}
    </Box>
  );
}

export default Igreja;
