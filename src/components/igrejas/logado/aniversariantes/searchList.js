import { Box, Typography, makeStyles, Divider, Paper } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import corIgreja from 'src/utils/coresIgreja';
import TableContainer from '@mui/material/TableContainer';

dayjs.extend(relativeTime);

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
    fontWeight: 'bold',

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
function SearchList({ rolMembros }) {
  const classes = useStyles();

  const handleSistema = () => {};
  let nomeCelula = rolMembros.Nome;
  if (nomeCelula === '') nomeCelula = 'Nome não registrado';
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const distrito = [
    'Castelo',
    'União da Vitório',
    'Campos Sales',
    'Bairro da Paz',
    'Calado',
  ];
  const diaAniversario = converteData(rolMembros.Nascimento).getDate();
  const mesAniversario = converteData(rolMembros.Nascimento).getMonth();

  return (
    <Box sx={{ maxHeight: 310 }} className={classes.dadosBox}>
      <TableContainer sx={{ maxHeight: 310 }}>
        <Box mt={2} ml={2}>
          <Box mt={4} ml={2}>
            <Typography
              style={{ marginLeft: 15 }}
              className={classes.caption}
              gutterBottom
              component="span"
              variant="body1"
              color="textPrimary"
              button="true"
              onClick={handleSistema}
            >
              <Box fontSize="10px" color={corIgreja.principal}>
                Nome:
              </Box>{' '}
              {rolMembros.Nome}
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
                    <Box fontSize="10px" color={corIgreja.principal}>
                      Dia do Aniversário:
                    </Box>
                    {diaAniversario} de {meses[mesAniversario]}
                  </Box>
                </Box>
              </Typography>
            </Box>
            <Typography
              className={classes.caption}
              gutterBottom
              component="span"
              variant="body1"
              color="textPrimary"
              button="true"
              onClick={handleSistema}
            />
            <Box mb={2} display="flex" ml={2}>
              <Typography
                display="block"
                variant="body2"
                component="span"
                color="textSecondary"
              >
                <small style={{ color: corIgreja.principal }}> Célula: </small>{' '}
                {rolMembros.Celula}
              </Typography>
              <Typography
                display="block"
                variant="body2"
                component="span"
                color="textSecondary"
                style={{ marginLeft: 20 }}
              >
                Supervisão: {rolMembros.Supervisao}
              </Typography>
              <Typography
                display="block"
                variant="body2"
                component="span"
                color="textSecondary"
                style={{ marginLeft: 20 }}
              >
                {distrito[rolMembros.Distrito - 1]}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
      </TableContainer>
    </Box>
  );
}

export default SearchList;
