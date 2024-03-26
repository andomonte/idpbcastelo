import React from 'react';
import { Box, Typography } from '@material-ui/core';
// import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
// const fetcher = (urls) => axios.get(urls).then((res) => res.data);
import '@fontsource/rubik';
import '@fontsource/fugaz-one';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import { Carousel } from 'react-responsive-carousel';

function Quantidade({ inscritos1 }) {
  const qtyAprovados1 = inscritos1.filter((val) => val.status === 'approved');

  const somaMO1 = qtyAprovados1
    .map((item) => item.GrauMinisterial === 'MINISTRO ORDENADO')
    .reduce((prev, curr) => prev + curr, 0);
  const somaML1 = qtyAprovados1
    .map((item) => item.GrauMinisterial === 'MINISTRO LICENCIADO')
    .reduce((prev, curr) => prev + curr, 0);

  const somaMC1 = qtyAprovados1
    .map((item) => item.GrauMinisterial === 'MINISTRO COOPERADOR')
    .reduce((prev, curr) => prev + curr, 0);

  const somaCM1 = qtyAprovados1
    .map((item) => item.GrauMinisterial === 'CÔNJUGE')
    .reduce((prev, curr) => prev + curr, 0);

  const somaAP1 = qtyAprovados1
    .map((item) => item.GrauMinisterial === 'ASPIRANTE AO MINISTÉRIO')
    .reduce((prev, curr) => prev + curr, 0);

  const somaDL1 = qtyAprovados1
    .map((item) => item.GrauMinisterial === 'DELEGADO')
    .reduce((prev, curr) => prev + curr, 0);

  const somaAM1 = qtyAprovados1
    .map((item) => item.Jurisdicao === 'IDPB-AM')
    .reduce((prev, curr) => prev + curr, 0);

  const somaPA1 = qtyAprovados1
    .map((item) => item.Jurisdicao === 'IDPB-PA')
    .reduce((prev, curr) => prev + curr, 0);

  const somaRR1 = qtyAprovados1
    .map((item) => item.Jurisdicao === 'IDPB-RR')
    .reduce((prev, curr) => prev + curr, 0);

  const somaRO1 = qtyAprovados1
    .map((item) => item.Jurisdicao === 'IDPB-RO')
    .reduce((prev, curr) => prev + curr, 0);

  const somaMG1 = qtyAprovados1
    .map((item) => item.Jurisdicao === 'IDPB-MG')
    .reduce((prev, curr) => prev + curr, 0);

  const somaSP1 = qtyAprovados1
    .map((item) => item.Jurisdicao === 'IDPB-SP')
    .reduce((prev, curr) => prev + curr, 0);

  const somaMM1 = qtyAprovados1
    .map((item) => item.Jurisdicao === 'MINISTÉRIO DE MISSÕES')
    .reduce((prev, curr) => prev + curr, 0);

  const somaVisAdulto1 = qtyAprovados1
    .map(
      (item) =>
        item.GrauMinisterial === 'VISITANTE' && item.Responsavel === 'Adulto',
    )
    .reduce((prev, curr) => prev + curr, 0);

  const somaVisCrianca1 = qtyAprovados1
    .map(
      (item) =>
        item.GrauMinisterial === 'VISITANTE' && item.Responsavel !== 'Adulto',
    )
    .reduce((prev, curr) => prev + curr, 0);

  const somaEscola1 = qtyAprovados1
    .map((item) => item.Estadia === 'Escola Bíblica')
    .reduce((prev, curr) => prev + curr, 0);

  const somaEscolaHomens1 = qtyAprovados1
    .map(
      (item) => item.Estadia === 'Escola Bíblica' && item.Sexo === 'Masculino',
    )
    .reduce((prev, curr) => prev + curr, 0);

  const somaEscolaMulheres1 = qtyAprovados1
    .map(
      (item) => item.Estadia === 'Escola Bíblica' && item.Sexo === 'Feminino',
    )
    .reduce((prev, curr) => prev + curr, 0);

  const outros1 = qtyAprovados1
    .map((item) => item.Estadia !== 'Escola Bíblica')
    .reduce((prev, curr) => prev + curr, 0);

  const [EscolaBiblica, setEscolaBiblica] = React.useState(somaEscola1);
  const [outrosLugares, setOutrosLugares] = React.useState(outros1);
  const [total, setTotal] = React.useState(qtyAprovados1.length);
  const [MO, setMO] = React.useState(somaMO1);
  const [ML, setML] = React.useState(somaML1);
  const [MC, setMC] = React.useState(somaMC1);
  const [CM, setCM] = React.useState(somaCM1);
  const [AM, setAM] = React.useState(somaAP1);
  const [DL, setDL] = React.useState(somaDL1);

  const [homens, setHomens] = React.useState(somaEscolaHomens1);
  const [mulheres, setMulheres] = React.useState(somaEscolaMulheres1);

  const [idpbAM, setIdpbAM] = React.useState(somaAM1);
  const [idpbPA, setIdpbPA] = React.useState(somaPA1);
  const [idpbRO, setIdpbRO] = React.useState(somaRO1);
  const [idpbRR, setIdpbRR] = React.useState(somaRR1);
  const [idpbMG, setIdpbMG] = React.useState(somaMG1);
  const [idpbSP, setIdpbSP] = React.useState(somaSP1);
  const [MM, setMM] = React.useState(somaMM1);
  const [visAdul, setVisAdul] = React.useState(somaVisAdulto1);
  const [visCrianca, setVisCrianca] = React.useState(somaVisCrianca1);

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const url = `/api/consultaInscritosSim`;
  const { data: inscritos, error } = useSWR(url, fetcher);

  React.useEffect(() => {
    if (inscritos) {
      let qtyAprovados;
      if (inscritos && inscritos.length)
        qtyAprovados = inscritos.filter((val) => val.status === 'approved');
      setTotal(qtyAprovados.length);

      const somaMO = qtyAprovados
        .map((item) => item.GrauMinisterial === 'MINISTRO ORDENADO')
        .reduce((prev, curr) => prev + curr, 0);
      setMO(somaMO);

      const somaML = qtyAprovados
        .map((item) => item.GrauMinisterial === 'MINISTRO LICENCIADO')
        .reduce((prev, curr) => prev + curr, 0);
      setML(somaML);

      const somaMC = qtyAprovados
        .map((item) => item.GrauMinisterial === 'MINISTRO COOPERADOR')
        .reduce((prev, curr) => prev + curr, 0);
      setMC(somaMC);

      const somaCM = qtyAprovados
        .map((item) => item.GrauMinisterial === 'CÔNJUGE')
        .reduce((prev, curr) => prev + curr, 0);
      setCM(somaCM);

      const somaAP = qtyAprovados
        .map((item) => item.GrauMinisterial === 'ASPIRANTE AO MINISTÉRIO')
        .reduce((prev, curr) => prev + curr, 0);
      setAM(somaAP);

      const somaDL = qtyAprovados
        .map((item) => item.GrauMinisterial === 'DELEGADO')
        .reduce((prev, curr) => prev + curr, 0);
      setDL(somaDL);

      const somaAM = qtyAprovados
        .map((item) => item.Jurisdicao === 'IDPB-AM')
        .reduce((prev, curr) => prev + curr, 0);
      setIdpbAM(somaAM);

      const somaPA = qtyAprovados
        .map((item) => item.Jurisdicao === 'IDPB-PA')
        .reduce((prev, curr) => prev + curr, 0);
      setIdpbPA(somaPA);

      const somaRR = qtyAprovados
        .map((item) => item.Jurisdicao === 'IDPB-RR')
        .reduce((prev, curr) => prev + curr, 0);
      setIdpbRR(somaRR);

      const somaRO = qtyAprovados
        .map((item) => item.Jurisdicao === 'IDPB-RO')
        .reduce((prev, curr) => prev + curr, 0);
      setIdpbRO(somaRO);

      const somaMG = qtyAprovados
        .map((item) => item.Jurisdicao === 'IDPB-MG')
        .reduce((prev, curr) => prev + curr, 0);
      setIdpbMG(somaMG);

      const somaSP = qtyAprovados
        .map((item) => item.Jurisdicao === 'IDPB-SP')
        .reduce((prev, curr) => prev + curr, 0);
      setIdpbSP(somaSP);

      const somaMM = qtyAprovados
        .map((item) => item.Jurisdicao === 'MINISTÉRIO DE MISSÕES')
        .reduce((prev, curr) => prev + curr, 0);
      setMM(somaMM);

      const somaVisAdulto = qtyAprovados
        .map(
          (item) =>
            item.GrauMinisterial === 'VISITANTE' &&
            item.Responsavel === 'Adulto',
        )
        .reduce((prev, curr) => prev + curr, 0);
      setVisAdul(somaVisAdulto);

      const somaVisCrianca = qtyAprovados
        .map(
          (item) =>
            item.GrauMinisterial === 'VISITANTE' &&
            item.Responsavel !== 'Adulto',
        )
        .reduce((prev, curr) => prev + curr, 0);
      setVisCrianca(somaVisCrianca);

      const somaEscola = qtyAprovados
        .map((item) => item.Estadia === 'Escola Bíblica')
        .reduce((prev, curr) => prev + curr, 0);
      setEscolaBiblica(somaEscola);

      const somaEscolaHomens = qtyAprovados
        .map(
          (item) =>
            item.Estadia === 'Escola Bíblica' && item.Sexo === 'Masculino',
        )
        .reduce((prev, curr) => prev + curr, 0);
      setHomens(somaEscolaHomens);

      const somaEscolaMulheres = qtyAprovados
        .map(
          (item) =>
            item.Estadia === 'Escola Bíblica' && item.Sexo === 'Feminino',
        )
        .reduce((prev, curr) => prev + curr, 0);
      setMulheres(somaEscolaMulheres);

      const outros = qtyAprovados
        .map((item) => item.Estadia !== 'Escola Bíblica')
        .reduce((prev, curr) => prev + curr, 0);
      setOutrosLugares(outros);
    }
    if (error) return <div>An error occured.</div>;
    if (!inscritos) return <div>Loading ...</div>;

    return 0;
  }, [inscritos]);
  mutate(url);

  return (
    <Box bgcolor="#D2691E" height="100vh" minHeight={500}>
      <Box height="100%" width="100vw" display="flex" justifyContent="center">
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="94%"
            width="100vw"
            maxWidth={400}
            mb={0}
          >
            <Box
              display="flex"
              justifyContent="center"
              height="82vh"
              width="94%"
              mt="18vh"
              bgcolor="#803300"
              color="white"
              fontFamily="Fugaz One"
              fontSize="16px"
              borderRadius={16}
            >
              <Box
                flexDirection="column"
                display="flex"
                mt={2}
                height="100%"
                width="100%"
              >
                <Box
                  mb={0}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  height="10%"
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    width="100%"
                  >
                    <Box
                      mb={0}
                      height="100%"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Box display="flex">
                        <Box>
                          <img
                            src="/images/idpb.png"
                            alt="Castelo"
                            width={40}
                            height={45}
                          />
                        </Box>
                        <Box
                          width="100%"
                          ml={1}
                          color="white"
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                          fontSize="15px"
                          fontFamily="Fugaz One"
                        >
                          <Box width="100%" textAlign="left" mt={-0.5}>
                            CONVENÇÃO NACIONAL
                          </Box>
                          <Box width="100%" textAlign="left" mt={-0.5}>
                            2022 ANO DA UNIDADE
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* <Box
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  mt={3}
                  mb={0}
                  sx={{
                    fontSize: '10px',

                    fontWeight: 'bold',
                  }}
                >
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    style={{
                      fontSize: '12px',
                      fontFamily: 'Fugaz One',
                    }}
                  >
                    QUANTIDADE DE INSCRITOS
                  </Typography>
                </Box> */}

                <Carousel showThumbs={false} showStatus={false}>
                  <div>
                    <Box mt={-4} height="50vh" minHeight={450}>
                      <Box
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        mr={3}
                      >
                        <Box>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                            mt={1}
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Rubik',
                              }}
                            >
                              Ministros Ordenados:{' '}
                              <strong
                                style={{
                                  fontSize: '14px',
                                  color: '#c6ff00',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                {MO}
                              </strong>
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                            mt={1}
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Rubik',
                              }}
                            >
                              Ministros Licenciados:{' '}
                              <strong
                                style={{
                                  fontSize: '14px',
                                  color: '#c6ff00',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                {ML}
                              </strong>
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                            mt={1}
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Rubik',
                              }}
                            >
                              Ministros Cooperadores:{' '}
                              <strong
                                style={{
                                  fontSize: '14px',
                                  color: '#c6ff00',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                {MC}
                              </strong>
                            </Typography>
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                            mt={1}
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Rubik',
                              }}
                            >
                              Cônjuge do Ministro:{' '}
                              <strong
                                style={{
                                  fontSize: '14px',
                                  color: '#c6ff00',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                {CM}
                              </strong>
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                            mt={1}
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Rubik',
                              }}
                            >
                              Aspirante ao Ministério:{' '}
                              <strong
                                style={{
                                  fontSize: '14px',
                                  color: '#c6ff00',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                {AM}
                              </strong>
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                            mt={1}
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Rubik',
                              }}
                            >
                              Delegado:{' '}
                              <strong
                                style={{
                                  fontSize: '14px',
                                  color: '#c6ff00',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                {DL}
                              </strong>
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                            mt={1}
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Rubik',
                              }}
                            >
                              Visitante Adultos:{' '}
                              <strong
                                style={{
                                  fontSize: '14px',
                                  color: '#c6ff00',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                {visAdul}
                              </strong>
                            </Typography>
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                            mt={1}
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Rubik',
                              }}
                            >
                              Visitantes Crianças:{' '}
                              <strong
                                style={{
                                  fontSize: '14px',
                                  color: '#c6ff00',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                {visCrianca}
                              </strong>
                            </Typography>
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                            mt={1}
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                fontSize: '16px',
                                fontFamily: 'Rubik',
                              }}
                            >
                              TOTAL:{' '}
                              <strong
                                style={{
                                  fontSize: '14px',
                                  color: '#c6ff00',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                {total}
                              </strong>
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </div>
                  <Box>
                    <Box
                      mt={5}
                      display="flex"
                      fontSize="14px"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      HOSPEDAGEM
                      <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        width="100%"
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={2}
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '16px',
                              fontFamily: 'Rubik',
                            }}
                          >
                            Escola Bíblica:{' '}
                            <strong
                              style={{
                                fontSize: '14px',
                                color: '#c6ff00',
                                fontFamily: 'Arial Black',
                                fontWeight: 'bold',
                              }}
                            >
                              {EscolaBiblica}
                            </strong>
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={1}
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '16px',
                              fontFamily: 'Rubik',
                            }}
                          >
                            Homens:{' '}
                            <strong
                              style={{
                                fontSize: '14px',
                                color: '#c6ff00',
                                fontFamily: 'Arial Black',
                                fontWeight: 'bold',
                              }}
                            >
                              {homens}
                            </strong>
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={1}
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '16px',
                              fontFamily: 'Rubik',
                            }}
                          >
                            Mulheres:{' '}
                            <strong
                              style={{
                                fontSize: '14px',
                                color: '#c6ff00',
                                fontFamily: 'Arial Black',
                                fontWeight: 'bold',
                              }}
                            >
                              {mulheres}
                            </strong>
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={3}
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '16px',
                              fontFamily: 'Rubik',
                            }}
                          >
                            Outros Lugares:{' '}
                            <strong
                              style={{
                                fontSize: '14px',
                                color: '#c6ff00',
                                fontFamily: 'Arial Black',
                                fontWeight: 'bold',
                              }}
                            >
                              {outrosLugares}
                            </strong>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <div>
                    <Box mt={5} fontSize="14px">
                      INSCRIÇÕES POR JURISDIÇÃO
                      <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={1}
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '16px',
                              fontFamily: 'Rubik',
                            }}
                          >
                            IDPB-AM:{' '}
                            <strong
                              style={{
                                fontSize: '14px',
                                color: '#c6ff00',
                                fontFamily: 'Arial Black',
                                fontWeight: 'bold',
                              }}
                            >
                              {idpbAM}
                            </strong>
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={1}
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '16px',
                              fontFamily: 'Rubik',
                            }}
                          >
                            IDPB-PA:{' '}
                            <strong
                              style={{
                                fontSize: '14px',
                                color: '#c6ff00',
                                fontFamily: 'Arial Black',
                                fontWeight: 'bold',
                              }}
                            >
                              {idpbPA}
                            </strong>
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={1}
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '16px',
                              fontFamily: 'Rubik',
                            }}
                          >
                            IDPB-RR:{' '}
                            <strong
                              style={{
                                fontSize: '14px',
                                color: '#c6ff00',
                                fontFamily: 'Arial Black',
                                fontWeight: 'bold',
                              }}
                            >
                              {idpbRR}
                            </strong>
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          mt={1}
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{
                              fontSize: '16px',
                              fontFamily: 'Rubik',
                            }}
                          >
                            IDPB-RO:{' '}
                            <strong
                              style={{
                                fontSize: '14px',
                                color: '#c6ff00',
                                fontFamily: 'Arial Black',
                                fontWeight: 'bold',
                              }}
                            >
                              {idpbRO}
                            </strong>
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mt={1}
                        sx={{ fontSize: 'bold' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '16px',
                            fontFamily: 'Rubik',
                          }}
                        >
                          IDPB-MG:{' '}
                          <strong
                            style={{
                              fontSize: '14px',
                              color: '#c6ff00',
                              fontFamily: 'Arial Black',
                              fontWeight: 'bold',
                            }}
                          >
                            {idpbMG}
                          </strong>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mt={1}
                        sx={{ fontSize: 'bold' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '16px',
                            fontFamily: 'Rubik',
                          }}
                        >
                          IDPB-SP:{' '}
                          <strong
                            style={{
                              fontSize: '14px',
                              color: '#c6ff00',
                              fontFamily: 'Arial Black',
                              fontWeight: 'bold',
                            }}
                          >
                            {idpbSP}
                          </strong>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        mt={1}
                        sx={{ fontSize: 'bold' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            fontSize: '16px',
                            fontFamily: 'Rubik',
                          }}
                        >
                          MINISTÉRIO DE MISSÕES:{' '}
                          <strong
                            style={{
                              fontSize: '14px',
                              color: '#c6ff00',
                              fontFamily: 'Arial Black',
                              fontWeight: 'bold',
                            }}
                          >
                            {MM}
                          </strong>
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                </Carousel>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Quantidade;
