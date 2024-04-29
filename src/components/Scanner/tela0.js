import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField } from '@material-ui/core';
import axios from 'axios';
import useSWR from 'swr';
import meuDataTime from 'src/utils/meuDataTime';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import api from 'src/components/services/api';
import Select from 'react-select';
import corIgreja from 'src/utils/coresIgreja';
// import Select from 'react-select';

import Scaner from './scaner';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },

  tf_s: {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    width: '60vw',
    maxWidth: 300,
    height: '40px',
    fontSize: '14px',
    [theme.breakpoints.down('md')]: {},
    //  borderRadius: '10px',
    //   border: '0px solid #b91a30',
  },
}));

function createListaEvento(label, value) {
  return {
    label,
    value,
  };
}
const customStyles = {
  backgroundColor: 'blue',
  control: (provided) => ({
    ...provided,
    backgroundColor: '#f0f4c3',

    textAlign: 'center',
  }),
};

function App({ eventos }) {
  const classes = useStyles();
  const dataAtual = new Date();
  const eventos2 = eventos.filter(
    (e) =>
      meuDataTime(new Date(e.DataFechamento).toISOString()).getTime() -
        dataAtual.getTime() >
      0,
  );

  const listaEventos = eventos2.map((rol, index) =>
    createListaEvento(rol.nomeEvento, index),
  );

  const [numeroCPF, setNumeroCPF] = React.useState('');
  const [data, setData] = React.useState('');
  const [cpfF, setCpfF] = React.useState('');
  const [botao, setBotao] = React.useState('PROCESSANDO...');
  const [corBotao, setCorBotao] = React.useState('gray');
  const [start, setStart] = React.useState(false);
  const [inscritoF, setInscritoF] = React.useState('Ler QR-CODE');

  const valorInicial = {
    label: listaEventos[0].label,
    value: 0,
  };
  const [evento, setEvento] = React.useState(valorInicial);
  const numeroCPFRef = React.useRef();
  const { load } = useGlobalAudioPlayer();
  const [contEvento, setContEvento] = React.useState(0);

  const url1 = `/api/consultaInscritosEventosTipo/${listaEventos[contEvento].label}`;
  const { data: listaInsc, errorListaInsc } = useSWR(url1, fetcher, {
    refreshInterval: 1000,
  });
  const entregarPulseira = (inscFinal) => {
    // console.log('inscritosF api:', inscritoFiltrado, inscFinal);
    setBotao('PROCESSANDO...');
    api
      .post('/api/entregarPulseira', {
        idPagamento: inscFinal.idPagamento,
      })
      .then((response) => {
        if (response) {
          load('/images/good.mp3', {
            autoplay: true,
          });
          setBotao('ENTREGAR PULSEIRA(S)');
          setCorBotao('green');
          // router.push(cursoSelecionado[0].link);
        }
      })
      .catch((error) => {
        console.log('error:', error);
        setInscritoF('ERRO AO ACESSAR O BANCO, TENTE NOVAMENTE');
        load('/images/erroBD.mp3', {
          autoplay: true,
        });
        //  updateFile(uploadedFile.id, { error: true });
      });
  };
  //= ==============================================================
  React.useEffect(() => {
    numeroCPFRef.current.focus();
  }, []);
  React.useEffect(() => {
    if (listaInsc && listaInsc.length) {
      setData(listaInsc);

      //      console.log('lista Inscrito', listaInsc);
    }

    if (errorListaInsc) return <div>An error occured.</div>;
    if (!listaInsc) return <div>Loading ...</div>;

    return 0;
  }, [listaInsc]);

  const handleFiltraInscrito = (cpfs) => {
    const inscrito = data.filter(
      (val) =>
        val.status === 'approved' &&
        (val.CPF.replace(/\D/g, '') === cpfs.replace(/\D/g, '') ||
          val.idPagamento === cpfs),
    );

    setStart(false);
    setCpfF(cpfs);
    if (inscrito.length) {
      setInscritoF(inscrito[0]);

      setNumeroCPF('');
      if (inscrito[0].pulseira !== 'entregue') entregarPulseira(inscrito[0]);
      else {
        load('/images/somNG.mp3', {
          autoplay: true,
        });
      }
    } else {
      setInscritoF('NÃO INSCRITO');
      load('/images/erroBD.mp3', {
        autoplay: true,
      });

      setNumeroCPF('');
    }
  };
  React.useEffect(() => {
    if (start) {
      handleFiltraInscrito(numeroCPF);
    }
  }, [start]);
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const form = event.target.id;

      if (form === 'NumeroNF') handleFiltraInscrito(numeroCPF);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      flexDirection="column"
      bgcolor={corIgreja.principal2}
    >
      <Box mt={10} height="80%" width="90%" bgcolor="#FAFAFA">
        <Box display="flex" justifyContent="center" width="100%">
          <Box mt={2} width="90%">
            <Select
              // menuPlacement="top"
              styles={customStyles}
              isSearchable={false}
              id="Distrito"
              defaultValue={evento}
              noOptionsMessage={() => 'Selecione o Evento'}
              onChange={(e) => {
                setContEvento(e.value);
                setEvento(e);
                console.log('inscritos');
              }}
              options={listaEventos || ''}
            />
          </Box>
        </Box>

        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="45vh"
            width="90vw"
            mt="1vh"
          >
            <Box mt={-2}>
              {/* <Select
                styles={customStyles}
                id="Igreja"
                value={eventoSelecionado}
                onChange={(e) => {
                  setEventoSelecionado(e);
                }}
                options={listaEventos}
              /> */}
              {data.length && data[0].label}
            </Box>
            <Scaner setStart={setStart} setNumeroCPF={setNumeroCPF} />
            {/* <Tela1
              setDadosFiltradosNF={setDadosFiltradosNF}
              setDadosNF={setDadosNF}
              dadosNF={dadosNF}
              data={data}
              dadosFiltradosNF={dadosFiltradosNF}
              setCheckMudancas={setCheckMudancas}
            /> */}
          </Box>
          <Box
            width="90vw"
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="blue"
            fontFamily="Fugaz One"
          >
            {inscritoF && inscritoF.Nome ? (
              <Box>
                {' '}
                <Box textAlign="center"> {inscritoF.Nome.toUpperCase()}</Box>
                <Box mt={2} display="flex" justifyContent="center">
                  <Box color="black" display="flex">
                    Adultos:{' '}
                    <Box color="blue" ml={2}>
                      {inscritoF.qtyAdultos}
                    </Box>
                  </Box>
                  <Box ml={5} color="black" display="flex">
                    Crianças:{' '}
                    <Box color="blue" ml={2}>
                      {inscritoF.qtyCriancas1 !== null
                        ? Number(inscritoF.qtyCriancas1)
                        : 0}
                    </Box>
                  </Box>
                </Box>
                <Box mt={2} display="flex" justifyContent="center">
                  <Box color="black" display="flex">
                    Igreja:{' '}
                    <Box color="blue" ml={2}>
                      {inscritoF.Igreja}
                    </Box>
                  </Box>
                </Box>
                <Box
                  mt={2}
                  width={300}
                  height={40}
                  bgcolor={inscritoF.pulseira !== 'entregue' ? corBotao : 'red'}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color="white"
                  onClick={() => {
                    setCpfF(numeroCPF);
                    setNumeroCPF('');
                    setInscritoF('LER QR-CODE');
                    setBotao('PROCESSANDO');
                    setCorBotao('gray');
                  }}
                >
                  {inscritoF.pulseira !== 'entregue' ? (
                    <Box>{botao} </Box>
                  ) : (
                    'PULSEIRA JÁ ENTREGUE'
                  )}
                </Box>
              </Box>
            ) : (
              <Box display="flex">
                <Box> {cpfF}</Box>
                <Box ml={1}>- {inscritoF}</Box>
              </Box>
            )}
          </Box>
          {console.log('botao', botao)}
          <Box
            height="8vh"
            width="90vw"
            mt={0}
            display={
              botao === 'ENTREGAR PULSEIRA(S)' ||
              inscritoF.pulseira === 'entregue'
                ? 'none'
                : 'flex'
            }
            justifyContent="center"
            alignItems="end"
          >
            <Box>
              <TextField
                autoComplete="off"
                className={classes.tf_s}
                inputProps={{
                  style: {
                    textAlign: 'center',
                    WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                  },
                }}
                id="NumeroNF"
                // label="Matricula"
                type="tel"
                InputLabelProps={{
                  shrink: true,
                }}
                value={numeroCPF}
                variant="outlined"
                placeholder="digite o CPF"
                onChange={(e) => {
                  const cpf = e.target.value.replace(/\D/g, '');

                  setNumeroCPF(e.target.value);
                  if (cpf.length <= 10) {
                    setInscritoF('LER QR-CODE');
                  }

                  if (cpf.length === 11 && !start) handleFiltraInscrito(cpf);
                }}
                onKeyDown={handleEnter}
                inputRef={numeroCPFRef}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
