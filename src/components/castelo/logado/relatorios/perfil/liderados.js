import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import TabLideres from './supervisor/abas/tabLideres';
import BuscarNome from './supervisor/buscarNome';

function Celula({ perfilUser, lideranca }) {
  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  //= ===================================================================

  //= ===================================================================

  return (
    <Box height="90vh" minHeight={500} minWidth={370}>
      {!openBuscar ? (
        <Box
          height="100%"
          width="100vw"
          minWidth={370}
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            minWidth={370}
            height="100%"
            width="100vw"
            maxWidth={600}
            border="4px solid #fff"
          >
            <Box height="100%">
              <Box
                style={{
                  borderRadius: '16px',
                }}
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={350}
                minWidth={370}
                width="100%"
                bgcolor={corIgreja.principal}
                borderTop="2px solid #fff"
              >
                <Box width="95%" height="100%">
                  <Box
                    height="10%"
                    minHeight={50}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      bgcolor: corIgreja.principal,
                      color: '#F1F1F1',
                      fontFamily: 'Geneva',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}
                  >
                    EQUIPE DE LÍDERES
                  </Box>
                  <Box
                    height="85%"
                    minHeight={315}
                    display="flex"
                    bgcolor="#fafafa"
                    width="100%"
                    borderRadius={16}
                  >
                    <TabLideres
                      setBuscarNome={setBuscarNome}
                      perfilUser={perfilUser}
                      lideranca={lideranca}
                      setOpenBuscar={setOpenBuscar}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <BuscarNome perfilUser={buscarNome} setOpenBuscar={setOpenBuscar} />
      )}
    </Box>
  );
}

export default Celula;
