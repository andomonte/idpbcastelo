import * as React from 'react';
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Divider,
} from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import corIgreja from 'src/utils/coresIgreja';
import TableContainer from '@mui/material/TableContainer';
import Image from 'next/image';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@mui/material/Modal';

dayjs.extend(relativeTime);
const bannerBlurHash =
  'data:image/webp;base64,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';

function converteData(DataDDMMYY) {
  const dataSplit = DataDDMMYY.split('/');
  const novaData = new Date(
    parseInt(dataSplit[2], 10),
    parseInt(dataSplit[1], 10) - 1,
    parseInt(dataSplit[0], 10),
  );
  return novaData;
}
const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
  },
  caption: {
    fontFamily: 'Fugaz One',
    fontSize: '12pix',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },

  dados: {
    // backgroundColor: '#fafafa',
    //    padding: '4px 4px',
    //    display: 'flex',
    // alignItems: 'center',
    height: 45,
    width: '100%',
    borderRadius: 16,
    marginLeft: 10,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 4,
      marginBottom: -40,

      //      marginBottom: 25,
    },
  },
  dadosBox: {
    marginBottom: -20,
    marginTop: 0,
    width: '100%',
    marginLeft: 0,
    maxHeight: 310,
    marginRight: 0,
  },
  icons: {
    marginRight: 20,
    marginTop: 10,
  },
}));
function SearchList({ rolMembros, semanaAtual }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [imagem, setImagem] = React.useState('');
  const handleSistema = () => {};
  let nomeCelula = rolMembros.Nome;
  if (nomeCelula === '') nomeCelula = 'Nome não registrado';
  const diaSemana = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ];

  const distrito = ['Filadelfia ', 'Filadelfia2'];
  const diaAniversario = converteData(rolMembros.Nascimento).getDate();
  // const mesAniversario = converteData(rolMembros.Nascimento).getMonth();

  const dia = converteData(semanaAtual).getDate();

  return (
    <Box
      width="10vw"
      height="100%"
      sx={{ maxHeight: 310, minWidth: 300 }}
      className={classes.dadosBox}
    >
      <TableContainer sx={{ maxHeight: 310 }}>
        <Box mt={2} ml={1} display="flex" alignItems="center">
          {rolMembros.foto !== null && rolMembros.foto !== undefined ? (
            <Avatar
              onClick={() => {
                setOpenModal(true);
                setImagem(rolMembros.foto);
              }}
              src=""
              alt="User"
              style={{
                width: 70,
                height: 70,
              }}
            >
              <Image
                src={rolMembros.foto}
                layout="fill"
                objectFit="contain"
                loading="eager"
                placeholder="blur"
                blurDataURL={bannerBlurHash}
              />
            </Avatar>
          ) : (
            <Avatar
              src=""
              alt="User"
              style={{
                width: 50,
                height: 50,
              }}
            />
          )}
          <Box ml={0} mt={2}>
            <Typography
              style={{ marginLeft: 15, marginRight: 5 }}
              className={classes.caption}
              gutterBottom
              component="span"
              variant="body1"
              color="textPrimary"
              button="true"
              onClick={handleSistema}
            >
              {rolMembros.Nome.toUpperCase()}
            </Typography>
            <Box ml={2} display="flex">
              <Typography
                className={classes.caption}
                gutterBottom
                component="span"
                variant="body1"
                color="textPrimary"
                button="true"
                onClick={handleSistema}
              >
                <Box display="flex">
                  <Box>
                    <Box
                      display="flex"
                      fontSize="14px"
                      color={corIgreja.principal}
                    >
                      Dia:
                      <Box color="black" ml={1}>
                        {diaSemana[diaAniversario - dia]} {diaAniversario}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Typography>
              <Typography
                display="block"
                variant="body2"
                component="span"
                color="textSecondary"
                style={{ marginLeft: 20, color: 'black' }}
              >
                <strong
                  style={{ color: corIgreja.principal, fontSize: '14px' }}
                >
                  Célula:{' '}
                </strong>{' '}
                <strong style={{ color: 'black' }}>{rolMembros.Celula}</strong>
              </Typography>
            </Box>

            <Box mb={2} display="flex" ml={-0.5}>
              <Typography
                display="block"
                variant="body2"
                component="span"
                color="textSecondary"
                style={{
                  marginLeft: 20,
                  fontSize: '14px',
                  color: corIgreja.principal,
                }}
              >
                Supervisão:{' '}
                <strong style={{ color: 'black' }}>
                  {rolMembros.Supervisao}
                </strong>
              </Typography>
              <Typography
                display="block"
                variant="body2"
                component="span"
                color="textSecondary"
                style={{ marginLeft: 20, color: 'black' }}
              >
                <Box className={classes.caption}>
                  {distrito[rolMembros.Distrito - 1]}
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
      </TableContainer>
      <Modal
        open={openModal}
        //  onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          bgcolor={corIgreja.principal2}
          display="block"
          flexDirection="column"
          width="auto"
          height="100vh"
        >
          <Box sx={{ position: 'relative' }}>
            <img
              src={imagem || '/images/inserirFoto.jpg'}
              width="100%"
              alt="install"
            />

            <Box mt={5}>
              <Box textAlign="center">
                <Button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  style={{
                    background: corIgreja.principal,
                    color: 'white',
                    fontFamily: 'Fugaz One',
                  }}
                  variant="contained"
                  severity="success"
                  //   endIcon={<TouchAppIcon />}
                >
                  Fechar
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default SearchList;
