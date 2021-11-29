import React from 'react';
import { Box, Grid } from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '95%',
};
function InicioGame({ mesa }) {
  const submitData = async () => {
    // e.preventDefault();

    //    const valida = valid();
    //  setLoading('enviando');
    //   setOpen(true);
    //    if (valida) {
    try {
      const body = {
        status: 'ON',
      };

      let urlCreate = '';
      if (mesa.length === 0) {
        urlCreate = `${window.location.origin}/api/criarEvento`;
      } else {
        urlCreate = `${window.location.origin}/api/updateGames/${mesa[0].codigoMesa}`;
      }

      await fetch(urlCreate, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      //    setLoading('enviado');
    } catch (errors) {
      //  setLoading('falha');

      console.errors();
    }
    //  } // else //setLoading('naoPreenchido');
  };
  return (
    <Box
      bgcolor="#fce4ec"
      display="flex"
      flexDirection="row"
      alignItems="center"
      height="100vh"
    >
      <Box align="center" width="99%">
        <Box>
          <h2>MESA - {mesa[0].Mesa}</h2>
        </Box>
        <Box mt={1} ml={2} sx={{ fontSize: 'bold' }}>
          <Avatar
            sx={{ width: 86, height: 86 }}
            alt="Remy Sharp"
            src="https://sistemaidpb.s3.amazonaws.com/FOTO+(3).jpg"
          />
        </Box>
        <Box display="flex" flexDirection="row" mt={2}>
          <Grid item xs={12} md={3}>
            <Box borderRadius={16} {...defaultProps}>
              <img width={100} src="/images/gamer/17973872.jpg" alt="onde" />
              <Box>
                <strong>Onde foi Isso</strong>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box borderRadius={16} {...defaultProps}>
              <CardMedia
                component="img"
                height="125"
                image="/images/gamer/quizGabi.png"
                alt="green iguana"
                style={{ borderRadius: 16 }}
              />
            </Box>
          </Grid>
        </Box>
        <Box display="flex" flexDirection="row" mt={2}>
          <Grid item xs={12} md={3}>
            <Box borderRadius={16} {...defaultProps}>
              <img width={100} src="/images/gamer/17973872.jpg" alt="onde" />
              <Box>
                <strong>Onde foi Isso</strong>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box borderRadius={16} {...defaultProps}>
              <img width={100} src="/images/gamer/17973872.jpg" alt="onde" />
              <Box>
                <strong>Onde foi Isso</strong>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default InicioGame;
