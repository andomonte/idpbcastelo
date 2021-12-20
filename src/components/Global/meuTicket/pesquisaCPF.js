import React from 'react';
import { Box, Grid, Typography, TextField } from '@material-ui/core';
// import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Loading from 'src/utils/loading';
import MesageErro from 'src/utils/mesageErro';
import Drawer from '@material-ui/core/Drawer';
import QRCode from 'react-qr-code';
import TamanhoJanela from 'src/utils/getSize';

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  tf_s: {
    backgroundColor: '#ffff',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #b91a30',
  },
}));
const fetcher = (url) => axios.get(url).then((res) => res.data);
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '95%',
};

function PesquisaCPF({ cpf }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  let urls;
  let dadosCPF;
  const janela = TamanhoJanela();
  if (typeof window !== 'undefined') {
    urls = `${window.location.origin}/api/consultaInscGlobal/${cpf}`;
  }
  if (cpf) {
    const { data, error } = useSWR(urls, fetcher);
    if (error)
      return (
        <div>
          <MesageErro />
        </div>
      );
    if (!data)
      return (
        <div>
          <Loading />
        </div>
      );
    if (data) {
      dadosCPF = data;
    }
  }
  //  if (dadosCPF.CPF) setOpenDrawer(true);
  return (
    <>
      <Box>
        {!openDrawer && (
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              mt={0}
              mb={0}
              sx={{ fontSize: '16px', color: '#b91a30', fontWeight: 'bold' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '14px',
                  color: '#b91a30',
                  fontWeight: 'bold',
                }}
              >
                Esse CPF aind não tem inscrição
              </Typography>
            </Box>
          </Box>
        )}
        <Drawer
          height={janela.height}
          variant="persistent"
          anchor="bottom"
          open={openDrawer}
        >
          <Box height={janela.height} sx={{ background: '#FFFF' }}>
            <Box mt={1} borderRadius={16} {...defaultProps}>
              <Box mt={-1} ml={0}>
                <img src="/images/global/global1.png" alt="" width="100.8%" />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                mt={0}
                mb={0}
                sx={{ fontSize: '16px', color: '#b91a30', fontWeight: 'bold' }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '14px',
                    color: '#b91a30',
                    fontWeight: 'bold',
                  }}
                >
                  {dadosCPF.Nome}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                mt={0}
                sx={{ fontSize: 'bold', color: '#b91a30' }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '14px',
                    color: '#b91a30',
                    fontWeight: 'bold',
                  }}
                >
                  {dadosCPF.status}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                mt={0}
                sx={{ fontSize: 'bold', color: '#b91a30' }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '14px',
                    color: '#3f51b5',
                    fontWeight: 'bold',
                  }}
                >
                  OU
                </Typography>
              </Box>
              <Box
                mt={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              />

              <Box
                mt={2}
                mb={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box mt={3}>
                  <QRCode size={janela.height > 600 ? 180 : 150} value={cpf} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default PesquisaCPF;
