import { Box, Grid, Paper, Button } from '@material-ui/core';
import React from 'react';
// import { useRouter } from 'next/router';
import corIgreja from 'src/utils/coresIgreja';
import Erros from 'src/utils/erros';
import ConverteData from 'src/utils/convData2';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { IoArrowUndoSharp, IoArrowRedoSharp } from 'react-icons/io5';

import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import TabCelula from './tabCelula';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));

function RelCelula({ celula, setOpenPlan }) {
  //  const classes = useStyles();
  // const router = useRouter();

  const nomesCelulas = JSON.parse(celula.NomesMembros);
  const [openErro, setOpenErro] = React.useState(false);
  const [openObs, setOpenObs] = React.useState(false);
  const [qtyVisitantesCriancas, setQtyVisitantesCriancas] = React.useState(0);

  React.useEffect(() => {
    if (Number.isInteger(Number(celula.NomesVisitantes))) {
      setQtyVisitantesCriancas(Number(celula.NomesVisitantes));
    }
  }, []);
  // let enviarDia;
  // let enviarData;

  const [tela, setTela] = React.useState(1);

  //= ========================calcular adulto e crianca========================

  const handleTela2 = () => {
    setTela(2);
  };

  //= ============================================================

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="calc(100vh)"
    >
      <Box
        width="96%"
        height="97%"
        minHeight={550}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={16}
        bgcolor={corIgreja.principal} // cor principal tela inteira
      >
        <Box height="100%" width="100%">
          <Box
            display="flex"
            alignItems="end"
            justifyContent="center"
            height="5%"
            width="100%"
            fontSize="18px"
            fontFamily="Fugaz One"
            color="white"
          >
            REUNIÃO DA CÉLULA - {celula.Celula}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="8%"
            width="100%"
          >
            <Paper style={{ background: '#fafafa', height: 40, width: '90%' }}>
              <Box
                fontFamily="arial"
                fontSize="18px"
                alignItems="center"
                justifyContent="center"
                width="100%"
                display="flex"
                height="100%"
              >
                {' '}
                {ConverteData(celula.Data)}
              </Box>
            </Paper>
          </Box>
          <Box mt={2} mb={-2} width="100%" display="flex" height={10}>
            <Box
              ml={0}
              width="50%"
              height="100%"
              display="flex"
              alignItems="end"
              justifyContent="center"
              color="white"
              fontFamily="Fugaz one"
            >
              VISITANTES ADULTOS
            </Box>
            <Box
              ml={0}
              width="50%"
              height="100%"
              display="flex"
              alignItems="end"
              justifyContent="center"
              color="white"
              fontFamily="Fugaz one"
            >
              VISITANTES CRIANÇAS
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="8%"
            width="100%"
            mb={2}
          >
            <Paper
              style={{
                marginTop: 20,
                width: '40%',
                textAlign: 'center',
                background: '#fafafa',
                height: 40,
                borderRadius: 15,
                border: '1px solid #000',
              }}
            >
              <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="16px"
                fontFamily="arial black "
              >
                {celula.Visitantes}
              </Box>
            </Paper>
            <Box width="10%" />
            <Paper
              style={{
                marginTop: 20,
                width: '40%',
                textAlign: 'center',
                background: '#fafafa',
                height: 40,
                borderRadius: 15,
                border: '1px solid #000',
              }}
            >
              <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="16px"
                fontFamily="arial black "
              >
                {qtyVisitantesCriancas}
              </Box>
            </Paper>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="8%"
            borderTop="2px solid #fff"
            borderBottom="2px solid #fff"
            width="100%"
          >
            <Box
              height="100%"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                color: '#fff',
                fontFamily: 'Fugaz One',
                fontSize: '20px',
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                >
                  <Box
                    sx={{ fontSize: '16px' }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    borderRight="2px solid #fff"
                    width="50%"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      PRESENTES
                    </Box>
                    <Box
                      fontFamily="arial black"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {celula.Adultos + celula.Criancas}
                    </Box>
                  </Box>
                  <Box
                    sx={{ fontSize: '16px' }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    width="50%"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      MEMBROS
                    </Box>
                    <Box
                      fontFamily="arial black"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {nomesCelulas.length}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="56%"
            width="100%"
          >
            <Box display="flex" alignItems="end" height="100%" width="96%">
              {tela === 1 && (
                <TabCelula nomesCelulas={nomesCelulas} podeEditar={false} />
              )}
              {tela === 2 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  flexDirection="column"
                  height="100%"
                  mt={1}
                >
                  <Box display="flex" justifyContent="center" width="100%">
                    <Box width="90%" ml={1}>
                      <Grid container item xs={12} spacing={1}>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height={40}
                            bgcolor="#fafafa"
                            sx={{
                              fontSize: '14px',
                              fontFamily: 'arial black',
                              borderRadius: 15,
                            }}
                          >
                            <Box display="flex" mt={-0.2}>
                              ADULTOS
                              <Box
                                mt={0.3}
                                ml={1}
                                mr={0}
                                display="flex"
                                color="#000"
                                fontSize="16px"
                                fontFamily="arial "
                              >
                                <FaLongArrowAltRight />
                              </Box>
                            </Box>
                            <Box
                              color="blue"
                              fontFamily="arial black"
                              fontSize="16px"
                              mt={-0.2}
                              ml={1}
                            >
                              {celula.Adultos}
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height={40}
                            bgcolor="#fafafa"
                            sx={{
                              fontSize: '14px',
                              fontFamily: 'arial black',
                              borderRadius: 15,
                            }}
                          >
                            <Box display="flex" mt={-0.2}>
                              CRIANÇAS
                              <Box
                                mt={0.3}
                                ml={1}
                                mr={0}
                                display="flex"
                                color="#000"
                                fontSize="16px"
                                fontFamily="arial "
                              >
                                <FaLongArrowAltRight />
                              </Box>
                            </Box>
                            <Box
                              color="blue"
                              fontFamily="arial black"
                              fontSize="16px"
                              mt={-0.2}
                              ml={1}
                            >
                              {celula.Criancas}
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={2}
                    mb={2}
                  >
                    <Paper
                      style={{
                        marginTop: 10,
                        width: '90%',
                        textAlign: 'center',
                        background: '#fafafa',
                        height: 40,
                        borderRadius: 15,
                      }}
                    >
                      <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          width="70%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontFamily: 'arial black' }}
                        >
                          <Box width="100%" display="flex" textAlign="center">
                            <Box
                              ml={1}
                              width="60%"
                              mt={0.5}
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              CONVERSÕES
                            </Box>
                            <Box
                              width="40%"
                              mt={0}
                              ml={-2}
                              display="flex"
                              color="blue"
                              textAlign="center"
                              fontSize="16px"
                              fontFamily="arial black"
                            >
                              <Box
                                mt={0.9}
                                ml={2}
                                mr={2}
                                display="flex"
                                color="#000"
                                fontSize="16px"
                                fontFamily="arial "
                              >
                                <FaLongArrowAltRight />
                              </Box>
                              <Box
                                mt={0.5}
                                display="flex"
                                color="blue"
                                fontSize="16px"
                                fontFamily="arial black "
                              >
                                {celula.Conversoes}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                  <Box display="flex" justifyContent="center" width="100%">
                    <Paper
                      style={{
                        marginTop: 10,
                        width: '90%',
                        textAlign: 'center',
                        background: '#fafafa',
                        height: 40,
                        borderRadius: 15,
                        border: '1px solid #000',
                      }}
                    >
                      <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          width="70%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontFamily: 'arial black' }}
                        >
                          <Box width="100%" display="flex" textAlign="center">
                            <Box
                              ml={2}
                              width="60%"
                              mt={0.5}
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              EVENTOS
                            </Box>
                            <Box
                              width="40%"
                              mt={0}
                              ml={-3}
                              display="flex"
                              color="blue"
                              fontSize="20px"
                              fontFamily="arial black"
                            >
                              <Box
                                mt={0.9}
                                ml={2}
                                mr={2}
                                display="flex"
                                color="#000"
                                fontSize="16px"
                                fontFamily="arial "
                              >
                                <FaLongArrowAltRight />
                              </Box>
                              <Box
                                mt={0.5}
                                display="flex"
                                color="blue"
                                fontSize="16px"
                                fontFamily="arial black "
                              >
                                {celula.PresentesEventos}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={2}
                  >
                    <Paper
                      style={{
                        marginTop: 10,
                        width: '90%',
                        textAlign: 'center',
                        background: '#fafafa',
                        height: 40,
                        borderRadius: 15,
                        border: '1px solid #000',
                      }}
                    >
                      <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          width="70%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontFamily: 'arial black' }}
                        >
                          <Box width="100%" display="flex" textAlign="center">
                            <Box
                              ml={2}
                              width="90%"
                              mt={0.5}
                              display="flex"
                              justifyContent="center"
                              fontSize="14px"
                            >
                              VISITAS DO LIDER
                            </Box>
                            <Box
                              width="40%"
                              mt={0}
                              ml={-3}
                              display="flex"
                              color="blue"
                              textAlign="center"
                              fontSize="20px"
                              fontFamily="arial black"
                            >
                              <Box
                                mt={0.9}
                                ml={2}
                                mr={2}
                                display="flex"
                                color="#000"
                                fontSize="16px"
                                fontFamily="arial "
                              >
                                <FaLongArrowAltRight />
                              </Box>
                              <Box
                                mt={0.5}
                                display="flex"
                                color="blue"
                                fontSize="16px"
                                fontFamily="arial black "
                              >
                                {celula.Visitas}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                  <Box
                    mt={5}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="2.5vh"
                    minHeight={10}
                    bgcolor="#fafafa"
                  >
                    {celula.Observacoes ? (
                      <Button
                        style={{
                          background: 'white',
                          color: 'blue',
                          fontFamily: 'arial black',
                          width: '100%',
                        }}
                        component="a"
                        variant="contained"
                        onClick={() => {
                          setOpenObs(true);
                        }}
                      >
                        VER OBSERVAÇÕES
                      </Button>
                    ) : (
                      <Button
                        style={{
                          background: 'white',
                          color: 'gray',
                          fontFamily: 'arial black',
                          width: '100%',
                        }}
                        component="a"
                        variant="contained"
                      >
                        SEM OBSERVAÇÕES
                      </Button>
                    )}
                  </Box>
                  <Dialog
                    fullScreen
                    open={openObs}
                    TransitionComponent={Transition}
                  >
                    <Box
                      mt={0}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="95%"
                      color="black"
                      bgcolor="#fafafa"
                    >
                      <Box
                        mt={-1}
                        height="100%"
                        width="94%"
                        display="flex"
                        fontSize="18px"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {celula.Observacoes !== undefined &&
                        celula.Observacoes !== null ? (
                          <Box textAlign="justify"> {celula.Observacoes}</Box>
                        ) : (
                          'Sem Observações'
                        )}
                      </Box>
                    </Box>
                    <Box
                      mb={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="5%"
                      minHeight={10}
                      bgcolor="#fafafa"
                    >
                      <Button
                        style={{
                          background: 'orange',
                          color: 'black',
                          fontFamily: 'arial black',
                          fontSize: '16px',
                          width: '90%',
                        }}
                        component="a"
                        variant="contained"
                        onClick={() => {
                          setOpenObs(false);
                        }}
                      >
                        FECHAR OBSERVAÇÕES
                      </Button>
                    </Box>
                  </Dialog>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="12%"
            width="100%"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              <Box width="90%">
                <Grid container spacing={2}>
                  {tela === 1 && (
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          style={{
                            borderRadius: 16,
                            textAlign: 'center',
                            background: '#ffffaa',
                            height: 40,
                          }}
                        >
                          <Button
                            style={{ width: '100%' }}
                            onClick={() => {
                              setOpenPlan(false);
                            }}
                            startIcon={<IoArrowUndoSharp color="blue" />}
                          >
                            <Box
                              mr={2}
                              ml={2}
                              mt={0.3}
                              sx={{ fontFamily: 'arial black' }}
                            >
                              VOLTAR
                            </Box>
                          </Button>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          style={{
                            borderRadius: 16,
                            textAlign: 'center',
                            background: '#feeffa',
                            height: 40,
                          }}
                        >
                          <Button
                            style={{ width: '100%' }}
                            onClick={() => {
                              handleTela2();
                            }}
                            endIcon={<IoArrowRedoSharp color="blue" />}
                          >
                            <Box
                              mr={2}
                              ml={2}
                              mt={0.3}
                              sx={{ fontFamily: 'arial black' }}
                            >
                              Próxima
                            </Box>
                          </Button>
                        </Paper>
                      </Grid>
                    </Grid>
                  )}
                  {tela === 2 && (
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          style={{
                            borderRadius: 16,
                            textAlign: 'center',
                            background: '#ffeeee',
                            height: 40,
                          }}
                        >
                          <Button
                            style={{ width: '100%' }}
                            onClick={() => {
                              setTela(1);
                            }}
                            startIcon={<IoArrowUndoSharp color="blue" />}
                          >
                            <Box mt={0.3} sx={{ fontFamily: 'arial black' }}>
                              ANTERIOR
                            </Box>
                          </Button>
                        </Paper>
                      </Grid>

                      <Grid item xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          style={{
                            borderRadius: 16,
                            textAlign: 'center',
                            background: 'yellow',

                            height: 40,
                          }}
                        >
                          <Box>
                            <Button
                              style={{ width: '100%' }}
                              onClick={() => {
                                setOpenPlan(false);
                              }}
                            >
                              <Box
                                mt={0.3}
                                sx={{
                                  fontFamily: 'arial black',
                                }}
                              >
                                <Box>FECHAR</Box>
                              </Box>
                            </Button>
                          </Box>
                        </Paper>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}
    </Box>
  );
}

export default RelCelula;
