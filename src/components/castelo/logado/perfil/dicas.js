import { Box, Avatar } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function Dicas() {
  const [nomeDica, setNomeDica] = React.useState('');

  const url = `/api/consultaDicas`;
  const { data, error } = useSWR(url, fetcher);
  React.useEffect(() => {
    if (data) {
      const index = Math.floor(Math.random() * data.length);
      setNomeDica(data[index].Dica);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);
  //= ===================================================================
  return (
    <Box height="90vh" minHeight={500} minWidth={300}>
      <Box
        height="100%"
        width="100vw"
        minWidth={300}
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box minWidth={300} height="100%" width="100vw" border="4px solid #fff">
          <Box height="100%">
            <Box
              height="25vh"
              minHeight={150}
              minWidth={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={corIgreja.principal}
              style={{
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
            >
              <Box>
                <Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Avatar
                      style={{
                        width: 80,
                        height: 80,
                      }}
                      alt="Remy Sharp"
                      src="images/castelo/castelo.png"
                    />
                  </Box>

                  <Box
                    mt={2}
                    sx={{
                      fontFamily: 'Geneva',
                      fontWeight: 'bold',
                      fontSize: '22px',
                      color: '#fff',
                    }}
                    textAlign="center"
                  >
                    IDPB - CASTELO{' '}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              style={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
              height="65vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={350}
              minWidth={300}
              width="100%"
              bgcolor={corIgreja.principal}
              borderTop="2px solid #fff"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <Box
                  height="90%"
                  minHeight={315}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor="#fafafa"
                  width="96%"
                  borderRadius={16}
                >
                  <Box
                    fontSize="16px"
                    fontFamily="arial black"
                    textAlign="center"
                    width="90%"
                  >
                    {nomeDica}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dicas;
