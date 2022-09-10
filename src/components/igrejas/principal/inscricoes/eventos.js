import { Box, Button } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import useSWR from 'swr';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import { Carousel } from 'react-responsive-carousel';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Inscricoes from './inscricoes';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const fetcher = (url) => axios.get(url).then((res) => res.data);

function Eventos({ perfilUser, rolMembros }) {
  //  const eventoIni = consultaInscricoes.filter((val) => Number(val.id) === Number(0));

  const [todos, setTodos] = React.useState('');
  const [openPlan, setOpenPlan] = React.useState(false);
  const [eventoEscolhido, setEventoEscolhido] = React.useState('');
  const url = `/api/consultaInscricoes`;
  const { data, error } = useSWR(url, fetcher);

  React.useEffect(() => {
    if (data) {
      const evento = data.filter((val) => val.Tipo === 'evento');

      setTodos(evento);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);

  const handleIncricao = (index) => {
    setOpenPlan(true);
    const evento = todos.filter((val) => Number(val.id) === Number(index));
    setEventoEscolhido(evento);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
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
        borderRadius={16}
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
              style={{ width: 200, height: 60 }}
              src={corIgreja.logo}
              alt="logo"
            />
          </Box>
          {todos.length ? (
            <Box height="80%" width="100%" mt="4vh">
              <Carousel showThumbs={false} showStatus={false}>
                {todos.map((row) => (
                  <Box key={row.id} height="100%" width="100%" mt={0}>
                    <Box
                      height="45%"
                      width="100%"
                      alignItems="center"
                      display="flex"
                      justifyContent="center"
                    >
                      <img
                        style={{ width: '90%', height: '100%', maxWidth: 220 }}
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
                        flexDirection="column"
                        width="100%"
                        height="30%"
                      >
                        <Box mt={1} color="#bf9f3e" fontFamily="arial black">
                          Local:
                        </Box>
                        <Box
                          mb={2}
                          mt={1}
                          ml={2}
                          color="white"
                          fontFamily="Fugaz One"
                          fontSize="20px"
                        >
                          {row.Local}
                        </Box>
                      </Box>
                    </Box>

                    <Box mb="10vh" mt="3vh" width="100%" height="13%">
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
                          handleIncricao(row.id);
                        }}
                      >
                        FAZER INSCRIÇÃO
                      </Button>
                      <Box width="100%" height="3vh" />
                    </Box>
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
              NADA PREVISTO NESSE PERÍODO
            </Box>
          )}
        </Box>
      </Box>
      <Dialog fullScreen open={openPlan} TransitionComponent={Transition}>
        <Inscricoes
          eventoEscolhido={eventoEscolhido}
          setOpenPlan={setOpenPlan}
          rolMembros={rolMembros}
          perfilUser={perfilUser}
        />
      </Dialog>
    </Box>
  );
}

export default Eventos;
