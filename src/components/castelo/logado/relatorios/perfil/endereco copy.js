import { Box, Avatar } from '@material-ui/core';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GoogleMapIcon from 'src/components/icones/mapasGoogle';
import Tooltip from '@material-ui/core/Tooltip'; // dica ao passar o mouse
import corIgreja from 'src/utils/coresIgreja';

function Celula({ perfilUser, Celulas, rolMembros }) {
  const dadosCelula = Celulas.filter(
    (val) => val.Celula === Number(perfilUser.Celula),
  );
  const dadosAnfitriao = rolMembros.filter(
    (val) => val.RolMembro === Number(dadosCelula[0].Anfitriao),
  );

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  const nomes = dadosCelula[0].Lider;
  let nomeLider;
  if (nomes.length > 30) nomeLider = nomes.substring(0, nomes.lastIndexOf(' '));
  else nomeLider = nomes;
  //= ===================================================================

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  const nomeCelulas = dadosCelula[0].Nome;
  let nomeCelula;
  if (nomeCelulas.length > 30)
    nomeCelula = nomeCelulas.substring(0, nomeCelulas.lastIndexOf(' '));
  if (nomeCelulas.length === 0) nomeCelula = 'Sem Nome Registrado';

  //= ===================================================================
  let endereco = 'Endereço não Informado';
  let localizador = 'Não Regisgtrado';
  if (dadosAnfitriao.length) {
    endereco = `${dadosAnfitriao[0].Logradouro}, ${dadosAnfitriao[0].Numero} - ${dadosAnfitriao[0].Bairro}`;
    if (endereco.length < 8) endereco = 'Enderço não Registrado';

    localizador = dadosAnfitriao[0].Localizador;
  }
  if (localizador.length < 8) localizador = 'Não Registrado';

  const handleGooglemap = () => {
    if (localizador !== 'Não Regisgtrado') {
      const url = localizador;
      window.open(url, '_blank');
    }
  };
  return (
    <Box height="90vh" minHeight={500}>
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
              height="25%"
              minHeight={150}
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
              height="73%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={350}
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
                    color: '#ffeb3b',
                    fontFamily: 'Geneva',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  {nomeCelula.toUpperCase()}
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  display="flex"
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  <Box height="100%" mt={0} width="100%">
                    <Box height="100%">
                      <Box
                        height="25%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box>
                          <Box
                            sx={{
                              color: '#000',
                              fontFamily: 'Times New Roman Times serif',
                              fontSize: '16px',
                            }}
                          >
                            Lider:
                          </Box>
                          <Box
                            ml={2}
                            mt={0}
                            sx={{
                              color: corIgreja.principal,
                              fontFamily: 'arial black',
                              fontWeight: 'bold',
                              fontSize: '16px',
                            }}
                          >
                            {nomeLider}
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        height="25%"
                        bgcolor="#e0e0e0"
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mt={0}
                      >
                        <Box
                          width="100%"
                          sx={{
                            color: '#000',
                            fontFamily: 'Times New Roman Times serif',
                            fontSize: '16px',
                          }}
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Box textAlign="center" width="33%">
                              Célula:
                            </Box>
                            <Box textAlign="center" width="33%">
                              Supervisão:
                            </Box>
                            <Box textAlign="center" width="33%">
                              Coordenacão:
                            </Box>
                          </Box>
                          <Box
                            mt={1}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Box
                              color={corIgreja.principal}
                              style={{ fontFamily: 'arial black' }}
                              textAlign="center"
                              width="33%"
                            >
                              {dadosCelula[0].Celula}
                            </Box>
                            <Box
                              style={{ fontFamily: 'arial black' }}
                              color={corIgreja.principal}
                              textAlign="center"
                              width="33%"
                            >
                              {dadosCelula[0].Supervisao}
                            </Box>
                            <Box
                              color={corIgreja.principal}
                              textAlign="center"
                              width="33%"
                              style={{ fontFamily: 'arial black' }}
                            >
                              {dadosCelula[0].Coordenacao}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box height="25%" display="flex" alignItems="center">
                        <Box ml={5}>
                          <Box
                            sx={{
                              color: '#000',
                              fontFamily: 'Times New Roman Times serif',
                              fontSize: '16px',
                            }}
                          >
                            Endereço:
                          </Box>
                          <Box
                            ml={2}
                            mt={0}
                            sx={{
                              color: corIgreja.principal,
                              fontFamily: 'Times New Roman Times serif',
                              fontWeight: 'bold',
                              fontSize: '18px',
                            }}
                          >
                            {endereco}
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        height="25%"
                        bgcolor="#e0e0e0"
                        style={{
                          borderBottomLeftRadius: '16px',
                          borderBottomRightRadius: '16px',
                        }}
                      >
                        <Box ml={5}>
                          <Box
                            mt={1}
                            sx={{
                              color: '#000',
                              fontFamily: 'Times New Roman Times serif',
                              fontSize: '16px',
                            }}
                          >
                            Como Chegar:
                          </Box>
                          <Box
                            ml={2}
                            mt={0}
                            sx={{
                              color: corIgreja.principal,
                              fontFamily: 'Times New Roman Times serif',
                              fontWeight: 'bold',
                              fontSize: '18px',
                            }}
                          >
                            {localizador !== 'Não Registrado' ? (
                              <Box mt={-1.2}>
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
                                        color: corIgreja.principal,
                                      }}
                                    >
                                      Ir para o Google Map
                                    </Box>
                                    <GoogleMapIcon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            ) : (
                              'Não Registrado'
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
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

export default Celula;
