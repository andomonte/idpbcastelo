import { Box, Typography, makeStyles, Divider, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import FacebookIcon from 'src/components/icones/facebook';
import YouTubeIcon from 'src/components/icones/youtube';
import InstagramIcon from 'src/components/icones/instagram';
import GoogleMapIcon from 'src/components/icones/mapasGoogle';
import Tooltip from '@material-ui/core/Tooltip'; // dica ao passar o mouse

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
  },
  caption: {
    fontWeight: 500,
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
    marginLeft: 100,
    marginBottom: -20,
    marginTop: 40,
    width: '82%',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 4,

      //      marginBottom: 25,
    },
  },
  icons: {
    marginRight: 20,
    marginTop: 10,
  },
}));

function SearchList({ item }) {
  const classes = useStyles();

  const handleInstagram = () => {
    if (item.instagram) {
      const url = item.instagram;
      window.open(url, '_blank');
    }
  };
  const handleFacebook = () => {
    if (item.facebook) {
      const url = item.facebook;
      window.open(url, '_blank');
    }
  };
  const handleYoutube = () => {
    if (item.youtube) {
      const url = item.youtube;
      window.open(url, '_blank');
    }
  };
  const handleGooglemap = () => {
    if (item.latitude && item.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;
      window.open(url, '_blank');
    }
  };

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
          >
            {item.igreja}
          </Typography>
          <Typography display="block" variant="body2" color="textSecondary">
            {item.logradouro} - Bairro: {item.bairro} - Cep: {item.cep}
          </Typography>
          <Grid container spacing={0}>
            <Grid className={classes.icons}>
              <Tooltip title="FaceBook">
                <IconButton
                  color="primary"
                  button="true"
                  aria-label="upload picture"
                  component="span"
                  onClick={handleFacebook}
                >
                  <FacebookIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid className={classes.icons}>
              <Tooltip title="YouTube">
                <IconButton
                  color="primary"
                  button="true"
                  aria-label="upload picture"
                  component="span"
                  onClick={handleYoutube}
                >
                  <YouTubeIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid className={classes.icons}>
              <Tooltip title="Instagram">
                <IconButton
                  color="primary"
                  button="true"
                  aria-label="upload picture"
                  component="span"
                  onClick={handleInstagram}
                >
                  <InstagramIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid className={classes.icons}>
              <Tooltip title="GoogleMap">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  button="true"
                  onClick={handleGooglemap}
                >
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
