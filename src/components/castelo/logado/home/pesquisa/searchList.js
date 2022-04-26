import { Box, Typography, makeStyles, Divider, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import GoogleMapIcon from 'src/components/icones/mapasGoogle';
import Tooltip from '@material-ui/core/Tooltip'; // dica ao passar o mouse

dayjs.extend(relativeTime);

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
    marginLeft: 50,
    marginBottom: -20,
    marginTop: 40,
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '90%',
      marginLeft: 40,

      //      marginBottom: 25,
    },
    [theme.breakpoints.down('sm')]: {
      width: '94%',
      marginLeft: 4,

      //      marginBottom: 25,
    },
  },
  icons: {
    marginRight: 20,
    marginTop: 10,
  },
}));

function SearchList({ celulas }) {
  const classes = useStyles();

  const handleGooglemap = () => {
    if (celulas.Localizador && celulas.localizador) {
      const url = celulas.Localizador;
      window.open(url, '_blank');
    }
  };

  const handleSistema = () => {};
  let nomeCelula = celulas.Nome;
  if (nomeCelula === '') nomeCelula = 'Nome não registrado';
  return (
    <Box>
      <Box mt="1" ml={2}>
        <Box mt={2} className={classes.dadosBox}>
          <Typography
            className={classes.caption}
            gutterBottom
            variant="body1"
            color="textPrimary"
            button="true"
            onClick={handleSistema}
          >
            Célula - {celulas.Celula} ({nomeCelula})
          </Typography>
          <Typography
            className={classes.caption}
            gutterBottom
            variant="body1"
            color="textPrimary"
            button="true"
            onClick={handleSistema}
          >
            Líder - {celulas.Lider}
          </Typography>
          <Typography display="block" variant="body2" color="textSecondary">
            {celulas.Logradouro}, {celulas.Numero} - {celulas.Bairro} - Cep:{' '}
            {celulas.CEP}, {celulas.Localidade}-{celulas.UF}
          </Typography>
          <Grid container spacing={2}>
            <Grid className={classes.icons}>
              <Tooltip title="GoogleMap">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  button="true"
                  onClick={handleGooglemap}
                >
                  <Box
                    mr={2}
                    sx={{
                      fontFamily: 'arial',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#033a',
                    }}
                  >
                    {' '}
                    Como Chegar
                  </Box>
                  <GoogleMapIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <Divider />
        </Box>
      </Box>
    </Box>
  );
}

export default SearchList;
