import { Box, Button } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import useSWR from 'swr';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import { Carousel } from 'react-responsive-carousel';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function Dicas() {
  const [todos, setTodos] = React.useState('');

  const url = `/api/consultaInscricoes`;
  const { data, error } = useSWR(url, fetcher);
  React.useEffect(() => {
    if (data) {
      const dataEventos = data.filter((val) => val.Tivo === 'evento');

      setTodos(dataEventos);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);

  const handleIncricao = (index) => {
    console.log(index);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={350}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      <Box
        height="97%"
        width="100%"
        bgcolor={corIgreja.principal}
        ml={1.2}
        mr={1.2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box height="100%" width="100%">
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            width="100%"
            height="10%"
          >
            <img
              style={{ width: 220, height: 50 }}
              src="images/filadelfia/filadelfia2.png"
              alt="logo"
            />
          </Box>
          {todos.length ? (
            <Box height="80%" width="100%" mt="4vh">
              <Carousel showThumbs={false} showStatus={false}>
                {todos.map((row) => (
                  <Box height="100%" width="100%" mt={0}>
                    <Box
                      height="55%"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                    >
                      <img
                        style={{ width: '90%', height: '100%', maxWidth: 300 }}
                        src={row.Imagem}
                        alt="brasil"
                      />
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      width="100%"
                      height="26%"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        height="50%"
                      >
                        <Box mt={-1} color="#bf9f3e" fontFamily="arial black">
                          Data:
                        </Box>
                        <Box
                          ml={2}
                          color="white"
                          fontFamily="Fugaz One"
                          fontSize="20px"
                        >
                          {row.DataEvento}
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        height="30%"
                      >
                        <Box mt={-1} color="#bf9f3e" fontFamily="arial black">
                          Local:
                        </Box>
                        <Box
                          ml={2}
                          color="white"
                          fontFamily="Fugaz One"
                          fontSize="20px"
                        >
                          {row.Local}
                        </Box>
                      </Box>
                    </Box>

                    <Box width="100%" height="13%">
                      <Button
                        style={{
                          background: 'white',
                          color: corIgreja.principal,
                          fontFamily: 'Fugaz One',
                          fontSize: '18px',
                          width: '90%',
                          maxWidth: 300,
                          height: '70%',
                          borderRadius: 16,
                        }}
                        component="a"
                        variant="contained"
                        onClick={() => {
                          handleIncricao(todos[0].id);
                        }}
                      >
                        FAZER INSCRIÇÃO
                      </Button>
                    </Box>
                    <Box width="100%" height={100} />
                  </Box>
                ))}
              </Carousel>
            </Box>
          ) : (
            <Box
              width="100%"
              height="80%"
              fontFamily="Fugaz One"
              fontSize="18px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
            >
              NENHUM EVENTO NESSE PERÍODO
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Dicas;
