import { Box, Grid, Paper, Button } from '@material-ui/core';
import React from 'react';
// import { useRouter } from 'next/router';
import corIgreja from 'src/utils/coresIgreja';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Erros from 'src/utils/erros';

import { TiUserAdd } from 'react-icons/ti';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { IoArrowUndoSharp, IoArrowRedoSharp } from 'react-icons/io5';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import TabCelula from './tabCelula';
import TabVisitantes from './tabVisitantes';

import 'react-toastify/dist/ReactToastify.css';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));

function RelCelebracao({ celula, setOpenCeleb }) {
  //  const classes = useStyles();
  // const router = useRouter();

  const nomesCelulas = JSON.parse(celula.NomesMembros);

  const presLive = nomesCelulas.filter((val) => val.Presenca === 'live').length;
  const presIgreja = nomesCelulas.filter(
    (val) => val.Presenca === 'igreja',
  ).length;

  const visitantesCelula = JSON.parse(celula.NomesVisitantes);
  // const timeElapsed2 = Date.now();
  const [selectedDate, setSelectedDate] = React.useState(celula.Data);
  const [nomesVisitantes, setNomesVisitantes] = React.useState(
    visitantesCelula || [],
  );

  const [openErro, setOpenErro] = React.useState(false);

  // let enviarDia;
  // let enviarData;
  const [qtyVisitante, setQtyVisitante] = React.useState(celula.Visitantes);

  const [tela, setTela] = React.useState(1);

  const [openVisitantes, setOpenVisitantes] = React.useState(false);

  //= ==============================================================

  //= =================================================================

  //= ========================calcular adulto e crianca========================

  const handleTela2 = () => {
    setTela(2);
  };

  const handleVisitantes = () => {
    setOpenVisitantes(true);
    // setVisBackUp(nomesVisitantes);
    // setQtyVisitanteBackUp(qtyVisitante);
  };
  //= =========================================

  //= ============================================================

  const handleCancelaVisitante = () => {
    // setNomesVisitantes(visBackUp);
    //  setQtyVisitante(qtyVisitanteBackUp);
    setOpenVisitantes(false);
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
            fontSize="14px"
            fontFamily="Fugaz One"
            color="white"
          >
            RELATÓRIO DE CELEBRAÇÃO (CÉLULA - {celula.Celula})
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="15%"
            width="100%"
          >
            <Paper style={{ background: '#fafafa', height: 40, width: '45%' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  value={selectedDate}
                  minDate={dayjs('2017-01-01')}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </LocalizationProvider>
            </Paper>
            <Paper
              style={{
                textAlign: 'center',
                background: '#fafafa',
                height: 40,
                width: '45%',
                marginLeft: 10,
              }}
            >
              <Button
                style={{ width: '100%' }}
                onClick={handleVisitantes}
                startIcon={<TiUserAdd color="red" />}
              >
                <Box
                  display="flex"
                  mt={0.8}
                  sx={{
                    fontSize: '12px',
                    fontFamily: 'arial black',
                  }}
                >
                  <Box mt={-0.2}> VISITANTES: </Box>
                  <Box
                    color="blue"
                    fontFamily="arial black"
                    fontSize="16px"
                    mt={-0.8}
                    ml={1}
                  >
                    {qtyVisitante}
                  </Box>
                </Box>
              </Button>
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
                    borderRight="2px solid #fff"
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
                      LIVE
                    </Box>
                    <Box
                      fontFamily="arial black"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {presLive}
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
                      IGREJA
                    </Box>
                    <Box
                      fontFamily="arial black"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {presIgreja}{' '}
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
            height="60%"
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
                    <Box
                      width="100%"
                      mt={0}
                      display="flex"
                      justifyContent="center"
                    >
                      <TextareaAutosize
                        maxRows={4}
                        value={celula.Observacoes}
                        aria-label="maximum height"
                        placeholder="Observações"
                        style={{
                          display: 'flex',
                          marginTop: 20,
                          textAlign: 'center',
                          width: '90%',
                          height: 80,
                          borderRadius: 15,
                          border: '1px solid #000',
                          resize: 'vertical',
                          overflow: 'auto',
                        }}
                      />
                    </Box>
                  </Box>
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
                              setOpenCeleb(false);
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
                                setOpenCeleb(false);
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
      <Dialog fullScreen open={openVisitantes} TransitionComponent={Transition}>
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
            bgcolor={corIgreja.principal}
            width="96%"
            height="97%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            borderRadius={16}
            ml={0}
          >
            <Box
              width="100%"
              height="10%"
              display="flex"
              justifyContent="center"
              alignItems="end"
            >
              <Box
                color="white"
                fontSize="18px"
                fontFamily="arial black"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="90%"
              >
                LISTA DE VISITANTES
              </Box>
            </Box>

            <Box
              height="80%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Box height="100%" width="96%">
                <TabVisitantes
                  nomesVisitantes={nomesVisitantes}
                  setQtyVisitante={setQtyVisitante}
                  setNomesVisitantes={setNomesVisitantes}
                />
              </Box>
            </Box>

            <Box
              width="100%"
              height="12%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="94%"
                height="100%"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12} xl={12}>
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
                        startIcon={<IoArrowUndoSharp color="blue" />}
                        onClick={() => {
                          handleCancelaVisitante();
                        }}
                      >
                        <Box sx={{ fontFamily: 'arial black' }}>VOLTAR</Box>
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default RelCelebracao;
