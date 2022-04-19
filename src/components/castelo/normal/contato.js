import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { Box, Typography } from '@material-ui/core';
import SvgIcon from '@mui/material/SvgIcon';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import Avatar from '@mui/material/Avatar';
import WhatsappSharpIcon from '@mui/icons-material/WhatsappSharp';
// import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  img: {
    maxWidth: '1110px',
    maxHeight: '544px',
    width: '100%',
    height: 'auto',
  },
}));

const contato = ({ userIgrejas }) => {
  const classes = useStyles();
  // somente letras  const zapOnlyLetters = userIgrejas[0].contatoWhatsApp.replace(/[^a-z]+/gi, '').split('');
  const zapOnlyNumber = userIgrejas[0].contatoWhatsApp.replace(/\D/g, '');
  const whatsApp = `https://wa.me/55${zapOnlyNumber}`;

  const telSecretaria = `tel:${userIgrejas[0].foneSecretaria}`;
  return (
    <Box bgcolor="#c5cae9" height="90vh">
      <Hidden smDown>
        <Box display="flex" justifyContent="center">
          <Box
            mt={10}
            ml={2}
            sx={{
              fontSize: '22px',
              color: '#000',
              fontFamily: 'Arial Black',
              fontWeight: 'bold',
            }}
          >
            Nossos Contatos:
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Box
            display="flex"
            mt={10}
            ml={2}
            sx={{ color: '#000', fontSize: '22px' }}
          >
            <Box>
              <Avatar style={{ background: '#b91030' }}>
                <SvgIcon sx={{ color: '#fff' }}>
                  <CallIcon />
                </SvgIcon>
              </Avatar>
            </Box>
            <Box ml={2} mt={-0.8}>
              Secretaria
              <Typography
                variant="body1"
                display="block"
                gutterBottom
                align="left"
                className={classes.caption}
              >
                <a href={telSecretaria}>{userIgrejas[0].foneSecretaria}</a>

                {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                 */}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            mt={10}
            ml={10}
            sx={{ color: '#000', fontSize: '22px' }}
          >
            <Box>
              <Avatar style={{ background: 'green' }}>
                <SvgIcon sx={{ color: '#fff', background: 'green' }}>
                  <WhatsappSharpIcon fontSize="large" />
                </SvgIcon>
              </Avatar>
            </Box>

            <Box ml={2} mt={-0.7}>
              WhatsApp
              <Typography
                variant="body1"
                display="block"
                gutterBottom
                align="left"
                className={classes.caption}
              >
                <a href={whatsApp}>{userIgrejas[0].contatoWhatsApp}</a>
                {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                 */}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box display="flex" justifyContent="center">
          <Box
            mt={10}
            ml={2}
            sx={{
              fontSize: '22px',
              color: '#000',
              fontFamily: 'Arial Black',
              fontWeight: 'bold',
            }}
          >
            Nossos Contatos:
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Box
            display="flex"
            justifyContent="center"
            mt={10}
            sx={{ color: '#000', fontSize: '22px' }}
          >
            <Box>
              <Avatar style={{ background: '#b91030' }}>
                <SvgIcon sx={{ color: '#fff' }}>
                  <CallIcon />
                </SvgIcon>
              </Avatar>
            </Box>
            <Box ml={2} mt={-0.8}>
              Secretaria
              <Typography
                variant="body1"
                display="block"
                gutterBottom
                align="left"
                className={classes.caption}
              >
                <a href={telSecretaria}>{userIgrejas[0].foneSecretaria}</a>

                {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                 */}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            mt={10}
            sx={{ color: '#000', fontSize: '22px' }}
          >
            <Box>
              <Avatar style={{ background: 'green' }}>
                <SvgIcon sx={{ color: '#fff', background: 'green' }}>
                  <WhatsappSharpIcon fontSize="large" />
                </SvgIcon>
              </Avatar>
            </Box>

            <Box ml={2} mt={-0.7}>
              WhatsApp
              <Typography
                variant="body1"
                display="block"
                gutterBottom
                align="left"
                className={classes.caption}
              >
                <a href={whatsApp}>{userIgrejas[0].contatoWhatsApp}</a>
                {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                 */}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

export default contato;
