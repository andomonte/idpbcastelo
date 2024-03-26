import React from 'react';
import { Box, TextField } from '@material-ui/core';

import axios from 'axios';
import useSWR, { mutate } from 'swr';
// const fetcher = (urls) => axios.get(urls).then((res) => res.data);
import '@fontsource/rubik';
import '@fontsource/fugaz-one';
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import TabInscritos from './tabInscritos';

function Quantidade({ inscritos1 }) {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const url = `/api/consultaInscritosSim`;
  const { data: inscritos, error } = useSWR(url, fetcher);
  const [newInscritos, setNewInscritos] = React.useState(inscritos1);
  const [listaInscritos, setListaInscritos] = React.useState(inscritos1);

  React.useEffect(() => {
    if (inscritos) {
      let qtyAprovados;
      if (inscritos && inscritos.length)
        qtyAprovados = inscritos.filter((val) => val.status === 'approved');
      const listaInscritos2 = qtyAprovados.sort((a, b) => {
        if (a.Nome > b.Nome) return 1;
        if (b.Nome > a.Nome) return -1;
        return 0;
      });
      setListaInscritos(listaInscritos2);
      setNewInscritos(listaInscritos2);
    }
    if (error) return <div>An error occured.</div>;
    if (!inscritos) return <div>Loading ...</div>;

    return 0;
  }, [inscritos]);
  mutate(url);

  const [querys, updateQuery] = React.useState(null);
  const [valor, setValor] = React.useState('');

  const handleChange = ({ currentTarget }) => {
    setValor(currentTarget.value);

    if (currentTarget.value === '') updateQuery(' ');
  };

  const handlePress = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      updateQuery(valor);
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
  const searcher = new FuzzySearch(
    newInscritos,
    ['Nome', 'Igreja', 'Jurisdicao', 'Estadia'],
    {
      caseSensitive: false,
    },
  );

  React.useEffect(() => {
    let result = '';

    if (querys) result = searcher.search(querys);
    if (newInscritos === 'error') return <div>Erro ao acessar o Banco.</div>;
    if (!newInscritos) return <div>Carregando ...</div>;
    if (result.length) setListaInscritos(result);
    return 0;
  }, [querys]);

  return (
    <Box bgcolor="#D2691E" height="100vh" minHeight={500}>
      <Box height="100%" width="100vw" display="flex" justifyContent="center">
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="94%"
            width="100vw"
            mb={0}
          >
            <Box
              display="flex"
              justifyContent="center"
              height="80vh"
              width="94%"
              mt="20vh"
              minHeight={400}
              bgcolor="#803300"
              color="white"
              fontFamily="Fugaz One"
              fontSize="16px"
              borderRadius={16}
            >
              <Box
                flexDirection="column"
                display="flex"
                mt={0}
                height="100%"
                width="100%"
              >
                <Box mt={1} mb={2} width="100%">
                  <Box display="flex" justifyContent="center" width="100%">
                    <Box display="flex" justifyContent="center" width="100%">
                      <TextField
                        InputProps={{
                          style: {
                            background: '#fafafa',
                            height: 40,
                            width: '90vw',
                          },
                          endAdornment: (
                            <Tooltip title="Pesquisar Igreja">
                              <Box
                                onClick={handleClick}
                                style={{ cursor: 'pointer' }}
                              >
                                <SearchIcon />
                              </Box>
                            </Tooltip>
                          ),
                        }}
                        id="field1"
                        name="password"
                        autoComplete="off"
                        type="text"
                        value={valor}
                        variant="outlined"
                        placeholder="pesquisar nome"
                        onChange={handleChange}
                        // onKeyPress={handlePress}
                        onKeyPress={handlePress}
                      />
                    </Box>
                  </Box>
                  {/*  <Box width="100%">{result && setListaInscritos(result)}</Box> */}
                </Box>
                <Box height="100%" width="100%" mt={0}>
                  <Box minHeight={405} display="flex">
                    <TabInscritos inscritos={listaInscritos} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Quantidade;
