import React from 'react';
import { Box, Grid } from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '95%',
};
function Gabi() {
  return (
    <Box
      bgcolor="#fff"
      display="flex"
      flexDirection="row"
      alignItems="center"
      height="100vh"
    >
      <Box align="center" width="99%">
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

export default Gabi;
