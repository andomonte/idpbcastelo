import * as React from 'react';
import dynamic from 'next/dynamic';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, Typography } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import TamanhoJanela from 'src/utils/getSize';

const janela = TamanhoJanela();
const altura = janela.height;
const largura = janela.width;
const alturaImg = altura / 5;
// console.log(altura, largura);
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
    padding: 0,
    margin: 0,
  },
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: alturaImg,
  },
  QrCode: {
    //    maxWidth: '1410px',
    //    maxHeight: '600px',
    width: '70%',
    height: '70%',
  },
  img1: {
    width: '20px',
    height: '20px',
    marginLeft: 40,
    marginRight: 8,
  },
  input1: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
  letras1: {
    display: 'flex',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fffd',
    marginBottom: 0,
  },
  letras2: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  letras3: {
    display: 'flex',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
    padding: 2,
  },
  legenda1: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fffd',
  },

  fundoBranco: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  button1: {
    display: 'flex',
    background: '#790208',
    '&:hover': {
      backgroundColor: '#990208',
    },
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#FFF',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#b91a30',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },

  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    marginLeft: '10px',
    marginRight: '10px',
  },
  texto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },
  tf_s: {
    backgroundColor: '#ffff',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '14px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #b91a30',
  },
  paper: {
    backgroundColor: '#b91a30', // theme.palette.background.paper,
    border: '0px solid #000',
    boxShadow: theme.shadows[5],
    //  padding: theme.spacing(1, 1, 1),
    height: '100%',
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    with: '100%',
  },
  tf_input: {
    backgroundColor: '#ffff',
    borderRadius: '8px',
    border: '2px solid #b91a30',

    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px', // fonte
    borderWidth: '0.5px',
    borderStyle: 'solid',
  },
}));
/* const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#b91a30'),
    backgroundColor: '#b91a30',
    '&:hover': {
      backgroundColor: '#b91a30',
    },
  },
}))(Button); */
const defaultProps = {
  bgcolor: 'background.paper',
  m: 0,
  border: '2px solid #b91a30',
  width: largura,
  height: altura + 0,
};
const defaultProps2 = {
  bgcolor: 'background.paper',
  m: 1,

  border: '2px solid #000',
  width: '90%',
};
const divisor = {
  bgcolor: 'background.paper',
  m: 0,
  border: '1px solid #000',
  borderLeft: 0,
  borderRight: 0,
  width: '100%',
};
function changeTimezone() {
  // const date = new Date();
  // const tz = date.toString().split('GMT')[1];
  const s = new Date().toLocaleString();

  return s;
}

const GeneratePDF = dynamic(
  () => import('src/components/Global/Comprar/pdfs/GeneratePDF'),
  {
    ssr: false,
  },
);

const PdfCompra = ({
  codigo,
  nome,
  adultos,
  criancas,
  valor,
  fp,
  status,
  parcelas,
  cpf,
}) => {
  const classes = useStyles();
  const ref = React.useRef();
  const [dataTime, setDataTime] = React.useState('');
  console.log('parc', parcelas);
  // const dataFinal = String(`${data} `);

  React.useEffect(() => {
    const data = changeTimezone();
    const dataFinal = String(`${data} `);
    setDataTime(dataFinal);
  }, []);
  const fonteSize = () => {
    if (janela.height > 500) return '18px';
    return '14px';
  };
  const vfonte = fonteSize();
  console.log(vfonte);
  return (
    <Box className={classes.root}>
      <Box width="100%" mb={1}>
        <div className="content" ref={ref} id="comprovante">
          <Box m={0} {...defaultProps}>
            <Box mt={-2} ml={-0.3}>
              <img
                src="/images/global/global1.png"
                alt=""
                width="100%"
                className={classes.img}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              mt={altura < 610 ? 0 : 4}
              mb={0}
              sx={{ fontSize: '16px', color: '#b91a30', fontWeight: 'bold' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '16px',
                  fontFamily: 'Arial Black',
                  color: '#000',
                  fontWeight: 'bold',
                }}
              >
                COMPROVANTE DE PAGAMENTO
              </Typography>
            </Box>
            <Box
              display="flex"
              width="100%"
              mt={0}
              mb={2}
              justifyContent="center"
              sx={{ fontSize: '15px', color: '#b91a30', fontWeight: 'bold' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '18px',
                  color: '#b91a30',
                  fontFamily: 'Arial Black',
                  fontWeight: 'bold',
                }}
              >
                {nome}
              </Typography>
            </Box>
            <Box
              display="flex"
              width="100%"
              mt={-3}
              justifyContent="center"
              sx={{ fontSize: '15px', color: '#b91a30', fontWeight: 'bold' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '14px',
                  color: '#000',
                  fontWeight: 'bold',
                }}
              >
                CPF: {cpf}
              </Typography>
            </Box>
            <Box {...divisor}>
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                mt={altura < 610 ? 2 : 4}
                sx={{
                  fontSize: '16px',
                  color: '#b91a30',
                  fontWeight: 'bold',
                }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '12px',
                    fontFamily: 'Arial Black',
                    color: '#000',
                    fontWeight: 'bold',
                  }}
                >
                  QUANTIDADE DE INGRESSOS:
                </Typography>
              </Box>

              <Box mt={-1} mb={1}>
                <Box display="flex" width="100%" mt={1} justifyContent="center">
                  <Box
                    sx={{
                      fontSize: '16px',
                      color: '#b91a30',
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '14px',
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >
                      Adultos:{' '}
                      <strong
                        style={{
                          fontSize: '14px',
                          color: '#b91a30',
                          fontWeight: 'bold',
                        }}
                      >
                        {adultos}
                      </strong>
                    </Typography>
                  </Box>
                  <Box width={30} />
                  <Box
                    sx={{
                      fontSize: '16px',
                      color: '#b91a30',
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '14px',
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >
                      Crianças:{' '}
                      <strong
                        style={{
                          fontSize: '14px',
                          color: '#b91a30',
                          fontWeight: 'bold',
                        }}
                      >
                        {criancas}
                      </strong>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box bgcolor="#81c784">
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                mt={0}
                mb={2}
                sx={{
                  fontSize: '16px',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '18px',
                    marginTop: 10,
                    color: '#000',
                    fontFamily: 'Arial Black',
                    fontWeight: 'bold',
                  }}
                >
                  {status}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                mt={altura < 610 ? -3 : -2}
                mb={0}
                sx={{ fontSize: '20px', color: '#b91a30', fontWeight: 'bold' }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '20px',
                    color: '#b91a30',
                    fontFamily: 'Arial Black',
                    fontWeight: 'bold',
                    marginTop: -3,
                    marginLeft: 10,
                  }}
                >
                  {codigo}
                </Typography>
              </Box>
            </Box>
            <Box {...divisor}>
              {fp === 'Pix' && (
                <Box>
                  <Box display="flex" width="100%" mt={1} ml={2}>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          fontSize: '16px',
                          color: '#b91a30',
                          fontWeight: 'bold',
                        }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '14px',
                            color: '#000',
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                          }}
                        >
                          PAGO COM PIX
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                  <Box
                    display="flex"
                    width="100%"
                    mt={0}
                    mb={-1}
                    ml={2}
                    sx={{
                      fontSize: '16px',
                      color: '#b91a30',
                      fontWeight: 'bold',
                    }}
                  >
                    <Grid item xs={8} md={6}>
                      <Box>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '12px',
                            color: '#000',
                            fontWeight: 'bold',
                          }}
                        >
                          Valor avista
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              )}
              {fp === 'Boleto' && (
                <Box>
                  <Box display="flex" width="100%" mt={1} ml={2}>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          fontSize: '16px',
                          color: '#b91a30',
                          fontWeight: 'bold',
                        }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '14px',
                            color: '#000',
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                          }}
                        >
                          BOLETO BANCÁRIO
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                  <Box
                    display="flex"
                    width="100%"
                    mt={0}
                    mb={-1}
                    ml={2}
                    sx={{
                      fontSize: '16px',
                      color: '#b91a30',
                      fontWeight: 'bold',
                    }}
                  >
                    <Grid item xs={8} md={6}>
                      <Box>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '12px',
                            color: '#000',
                            fontWeight: 'bold',
                          }}
                        >
                          Valor a vista
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              )}
              {fp === 'Cartão de Crédito' && (
                <Box>
                  <Box display="flex" width="100%" mt={1} ml={2}>
                    <Grid item xs={3} md={6}>
                      <Box
                        sx={{
                          fontSize: '16px',
                          color: '#b91a30',
                          fontWeight: 'bold',
                        }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '14px',
                            color: '#000',
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                          }}
                        >
                          CRÉDITO
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                  <Box
                    display="flex"
                    width="100%"
                    mt={0}
                    mb={-1}
                    ml={2}
                    sx={{
                      fontSize: '16px',
                      color: '#b91a30',
                      fontWeight: 'bold',
                    }}
                  >
                    <Grid item xs={8} md={6}>
                      <Box>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '12px',
                            color: '#000',
                            fontWeight: 'bold',
                          }}
                        >
                          {parcelas}
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              )}

              <Box
                display="flex"
                width="100%"
                mt={2}
                ml={2}
                sx={{ fontSize: '16px', color: '#b91a30', fontWeight: 'bold' }}
              >
                <Grid item xs={6} md={1}>
                  <Box mb={0} display="flex" justifyContent="flex-start">
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '12px',
                        color: '#000',
                        fontFamily: 'Arial Black',
                        fontWeight: 'bold',
                      }}
                    >
                      <Box mt={1}>VALOR TOTAL</Box>
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} md={6}>
                  <Box
                    display="flex"
                    mr={4}
                    mb={-1}
                    justifyContent="flex-end"
                    sx={{
                      color: '#b91a30',
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{
                        fontSize: '16px',
                        color: '#b91a30',
                        fontWeight: 'bold',
                        marginLeft: 10,
                        marginTop: 2,
                      }}
                    >
                      {`R$ ${valor}`}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              mt={1}
              //    ml={2}
              sx={{ fontSize: '16px', color: '#b91a30', fontWeight: 'bold' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '14px',
                  color: '#000',
                  fontWeight: 'bold',
                }}
              >
                {dataTime}
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
      <Box mt={altura < 610 ? -14 : -19}>
        <GeneratePDF html={ref} cpf={cpf} />
      </Box>
    </Box>
  );
};

export default PdfCompra;
