import { Box, Avatar } from '@material-ui/core';
import React from 'react';
import QRCode from 'react-qr-code';
import corIgreja from 'src/utils/coresIgreja';

import '@fontsource/rubik';
import api from 'src/components/services/api';
import { styled } from '@mui/material/styles';
import imageCompression from 'browser-image-compression';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import CropImage from './cropEasy';

const Input = styled('input')({
  display: 'none',
});

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

/* import useSWR from 'swr';

function getDados(email, nome) {
  const Nome = nome;
  const Email = email;
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const url = `${window.location.origin}/api/consultarolMembros/${Email}/${Nome}`;

  const { data, error } = useSWR(url, fetcher);

  
  

  return data;
} */
const nomeDistrito = [
  'Castelo',
  'União da Vitória',
  'Campos Sales',
  'Bairro da Paz',
  'Calado',
];

function meuPerfil({ secao, perfilUser }) {
  const [upLoadFile, setUpLoadFile] = React.useState('');
  const [imageSize, setImageSize] = React.useState('');
  const [urlImage, setUrlImage] = React.useState('');
  const [fileImage, setFileImage] = React.useState(perfilUser.foto);
  const [openCrop, setOpenCrop] = React.useState('inicio');

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const url = `/api/consultaRolMembros2/${perfilUser.RolMembro}`;
  const { data: inscritos, error2 } = useSWR(url, fetcher);
  React.useEffect(() => {
    if (inscritos) {
      setFileImage(inscritos[0].foto);
    }
    if (error2) return <div>An error occured.</div>;
    if (!inscritos) return <div>Loading ...</div>;

    return 0;
  }, [inscritos]);
  mutate(url);

  const process = async (selectedImage) => {
    try {
      const createFile = async (Myfile) => {
        const response = await fetch(Myfile);
        const data = await response.blob();
        const metadata = {
          type: 'image/png',
        };
        const nomeFoto = perfilUser.RolMembro;
        const file = new File([data], perfilUser.RolMembro, metadata);
        const dataFile = new FormData();
        //      dataFile.append('file', uploadedFile[0], nomeFoto);
        dataFile.append('file', file, nomeFoto);

        api
          .post('/api/fotos', dataFile)
          .then((responses) => {
            if (responses) {
              api
                .post('/api/imagePerfil', {
                  RolMembro: perfilUser.RolMembro,
                  fileImage: `https://arquivocastelo.s3.amazonaws.com/${perfilUser.RolMembro}`,
                  // urlImage -> esse urlImage é o da imagem selecionada já em blob
                })
                .then((response2) => {
                  if (response2) {
                    //         console.log(response);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
              // console.log('ccc', valCep);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      createFile(selectedImage);
    } catch (err) {
      console.log(err);
    }
  };
  const atualizarImagem = async () => {
    if (upLoadFile) {
      await process(fileImage);
    }
  };

  React.useEffect(() => {
    if (fileImage !== '' && !openCrop) atualizarImagem();
  }, [openCrop]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={350}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      {!openCrop || openCrop === 'inicio' ? (
        <Box
          height="97%"
          width="100%"
          ml={1.2}
          mr={1.2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minWidth={300}
            height="100%"
            width="100%"
          >
            <Box
              height="100%"
              width="100%"
              bgcolor={corIgreja.principal}
              style={{
                borderRadius: '16px',
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Box>
                  <Box
                    mt="0vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      width={181}
                      src="images/castelo/castelo3.png"
                      alt="logo"
                    />
                  </Box>
                </Box>
                <Box
                  mt="2vh"
                  display="flex"
                  width="100%"
                  height="74%"
                  sx={{ minHeight: 400 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Box
                      height="100%"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mt="1vh"
                    >
                      <Box
                        height={160}
                        width={160}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="4px solid #fff"
                        borderRadius="100%"
                      >
                        <label htmlFor="icon-button-file">
                          <Input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            onChange={async (e) => {
                              const imageFile = e.target.files[0];

                              const options = {
                                maxSizeMB: 1,
                                maxWidthOrHeight: 1080,
                                useWebWorker: true,
                              };
                              try {
                                const compressedFile = await imageCompression(
                                  imageFile,
                                  options,
                                );

                                setUpLoadFile(compressedFile);
                                const imageDataUrl = await readFile(
                                  compressedFile,
                                );
                                setImageSize(compressedFile.size);
                                setUrlImage(imageDataUrl);
                                setOpenCrop(true);
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          />
                          <Avatar
                            style={{ width: 150, height: 150 }}
                            alt="nome"
                            src={
                              fileImage !== '' && fileImage !== null
                                ? fileImage
                                : null
                            }
                          >
                            {fileImage === '' || fileImage === null ? (
                              <IconButton
                                style={{ color: 'black' }}
                                aria-label="upload picture"
                                component="span"
                              >
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  flexDirection="column"
                                  fontSize="12px"
                                  color="'#fff  '"
                                  fontFamily="arial black"
                                  width="100%"
                                >
                                  <Box color="'#fff'" mt={0.5}>
                                    CLICK AQUI
                                  </Box>
                                  <Box mt={0.5}>PARA</Box>

                                  <Box mt={0.5}>INSERIR SUA</Box>
                                  <Box mt={0.5}>FOTO</Box>
                                </Box>
                              </IconButton>
                            ) : null}
                          </Avatar>
                        </label>
                      </Box>
                    </Box>
                    <Box
                      mt="8vh"
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      height="100%"
                      width="100%"
                    >
                      <Box
                        height={90}
                        width={100}
                        display="flex"
                        bgcolor="white"
                        borderRadius={6}
                        justifyContent="center"
                        alignItems="center"
                        mt={1}
                        ml={2}
                      >
                        <QRCode
                          size={78}
                          value={perfilUser.Igreja + perfilUser.RolMembro}
                        />
                      </Box>
                      <Box ml={3} width="60%">
                        <Box
                          fontFamily="Fugaz One"
                          fontSize="16px"
                          color="white"
                        >
                          {secao.user.name.toUpperCase()}
                        </Box>
                        <Box fontFamily="Rubik" fontSize="18px" color="white">
                          {(perfilUser.Funcao === 'Lider' ||
                            perfilUser.Funcao === 'Membro') && (
                            <Box
                              sx={{
                                color: 'white',
                                fontFamily: 'Rubik',

                                fontSize: '12px',
                              }}
                              display="flex"
                            >
                              {perfilUser.Funcao}:
                              <Box
                                ml={1}
                                sx={{
                                  color: '#ffdd55',
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                Célula {perfilUser.Celula}
                              </Box>
                            </Box>
                          )}
                          {perfilUser.Funcao === 'Supervisor' && (
                            <Box
                              sx={{
                                color: 'white',
                                fontFamily: 'Rubik',

                                fontSize: '12px',
                              }}
                              display="flex"
                            >
                              {perfilUser.Funcao}:
                              <Box
                                ml={1}
                                sx={{
                                  color: '#ffdd55',
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                {perfilUser.supervisao}
                              </Box>
                            </Box>
                          )}
                          {perfilUser.Funcao === 'Coordenador' && (
                            <Box
                              sx={{
                                color: 'white',
                                fontFamily: 'Rubik',

                                fontSize: '12px',
                              }}
                              display="flex"
                            >
                              {perfilUser.Funcao}:
                              <Box
                                ml={1}
                                sx={{
                                  color: '#ffdd55',
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                {perfilUser.Coordenacao}
                              </Box>
                            </Box>
                          )}
                          {perfilUser.Funcao === 'Secretaria' && (
                            <Box
                              sx={{
                                color: 'white',
                                fontFamily: 'Rubik',

                                fontSize: '12px',
                              }}
                              display="flex"
                            >
                              {perfilUser.Funcao}:
                              <Box
                                ml={1}
                                sx={{
                                  color: '#ffdd55',
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                Igreja - {perfilUser.Igreja}
                              </Box>
                            </Box>
                          )}
                          {perfilUser.Funcao === 'PastorDistrito' && (
                            <Box
                              sx={{
                                color: 'white',
                                fontFamily: 'Rubik',

                                fontSize: '12px',
                              }}
                              display="flex"
                            >
                              {perfilUser.Funcao}:
                              <Box
                                ml={1}
                                sx={{
                                  color: '#ffdd55',
                                  fontFamily: 'Rubik',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                }}
                              >
                                {nomeDistrito[perfilUser.Distrito - 1]}
                              </Box>
                            </Box>
                          )}
                        </Box>
                        <Box
                          display="flex"
                          sx={{
                            color: '#fff',
                            fontFamily: 'Rubik',
                            fontSize: '12px',
                          }}
                        >
                          Supervisão:
                          <Box
                            ml={1}
                            sx={{
                              color: '#ffdd55',
                              fontFamily: 'Rubik',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {perfilUser.supervisao}{' '}
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          sx={{
                            color: '#fff',
                            fontFamily: 'Rubik',
                            fontSize: '12px',
                          }}
                        >
                          Coordenação:
                          <Box
                            ml={1}
                            sx={{
                              color: '#ffdd55',
                              fontFamily: 'Rubik',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {perfilUser.Coordenacao}{' '}
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          sx={{
                            color: '#fff',
                            fontSize: '12px',
                            fontFamily: 'Rubik',
                          }}
                        >
                          Distrito:
                          <Box
                            ml={1}
                            sx={{
                              color: '#ffdd55',
                              fontFamily: 'Rubik',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {nomeDistrito[perfilUser.Distrito - 1]}
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      mt="3vh"
                      height="40%"
                      minHeight={100}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        height="40%"
                        minHeight={150}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Box fontFamily="Rubik" fontSize="12px" color="white">
                          MATRÍCULA
                        </Box>
                        <Box
                          mt={0}
                          sx={{
                            color: '#ffdd55',
                            fontFamily: 'Rubik',
                            fontWeight: 'bold',
                            fontSize: '28px',
                          }}
                        >
                          {perfilUser.Igreja}
                          {perfilUser.RolMembro}{' '}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box mt={0} height="100%" width="99vw">
          <Box>
            <CropImage
              photoURL={urlImage}
              setOpenCrop={setOpenCrop}
              setPhotoURL={setUrlImage}
              setFileImage={setFileImage}
              imageSize={imageSize}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default meuPerfil;
