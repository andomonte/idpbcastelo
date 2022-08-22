import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { Box, Button } from '@material-ui/core';
import { MdDeleteForever } from 'react-icons/md';
import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import api from 'src/components/services/api';
import Erros from 'src/utils/erros';
import Modal from '@mui/material/Modal';
import Espera from 'src/utils/espera';
// import Espera from 'src/utils/espera';

export default function TabCelula({
  nomesVisitantes,
  setNomesVisitantes,
  setQtyVisitante,
  podeEditar,
  setDeleteVis,
}) {
  // const dados = nomesVisitantes.map((row) => createData(row.Nome, true));

  const [respostas, setRespostas] = React.useState({});
  const [openErro, setOpenErro] = React.useState(false);
  const [openEspera, setOpenEspera] = React.useState(false);
  const [openQuestion, setOpenQuestion] = React.useState(false);
  const [indexDel, setindexDel] = React.useState('');

  let dados = [{ Nome: 'Sem nomes registrados', Presenca: false }];
  if (nomesVisitantes) dados = nomesVisitantes;

  const handleRegistro = (index) => {
    let cor;

    if (podeEditar) dados[index].Presenca = !dados[index].Presenca;
    if (dados[index].Presenca) {
      cor = '#F0FFF0';
    } else {
      cor = '#feff';
    }
    setNomesVisitantes(dados);
    const updatedValue = { [index]: cor };
    setRespostas((shopCart) => ({
      ...shopCart,
      ...updatedValue,
    }));
  };

  const handleQuestion = (index) => {
    setindexDel(index);
    setOpenQuestion(true);
  };

  const handleDelete = () => {
    setOpenEspera(true);
    const id = Number(dados[indexDel].Rol);

    api
      .post(`/api/excluirVisitante`, {
        id,
      })
      .then((response) => {
        if (response) {
          setDeleteVis(true);
          setOpenEspera(false);
        }
      })
      .catch((erro) => {
        console.log('deu erro', erro);
        setOpenErro(true);
        setOpenEspera(false);
        return 0;
        //  updateFile(uploadedFile.id, { error: true });
      });
  };

  React.useEffect(() => {
    //    setPresentes(setPresentes(dados.length));
    const qtyPresentes = dados.filter((val) => val.Presenca === true);

    setQtyVisitante(qtyPresentes.length);
  }, [respostas]);

  React.useEffect(() => {
    for (let index = 0; index < dados.length; index += 1) {
      let cor;
      if (dados[index].Presenca) {
        cor = '#F0FFF0';
      } else {
        cor = '#feff';
      }
      setNomesVisitantes(dados);
      const updatedValue = { [index]: cor };
      setRespostas((shopCart) => ({
        ...shopCart,
        ...updatedValue,
      }));
    }
  }, [nomesVisitantes.length]);

  return (
    <Paper
      sx={{
        background: '#fff9',
        width: '98%',
        height: '98%',

        marginTop: 1,
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ height: '100%' }}>
        {dados.length > 0 && dados[0] ? (
          dados.map((row, index) => (
            <Box
              mt={0}
              bgcolor={Object.keys(respostas).length && respostas[index]}
              display="flex"
              alignItems="center"
              key={
                row.Nome.length > 30
                  ? row.Nome.substring(0, row.Nome.lastIndexOf(' '))
                  : row.Nome
              }
              height={40}
              sx={{ borderBottom: '1px solid #00a' }}
            >
              <Box display="flex" width="100%">
                <Box
                  onClick={() => {
                    handleQuestion(index);
                  }}
                  width="10%"
                  display="flex"
                  alignItems="center"
                  ml={1}
                >
                  <MdDeleteForever size={20} color="#455a64" />
                </Box>
                <Box width="100%" display="flex" alignItems="center" ml={1}>
                  {row.Nome.length > 30
                    ? row.Nome.substring(0, row.Nome.lastIndexOf(' '))
                    : row.Nome}
                </Box>
                <Box
                  onClick={() => {
                    handleRegistro(index);
                  }}
                  width="10%"
                  display="flex"
                  alignItems="center"
                  ml={1}
                >
                  {dados[index].Presenca ? (
                    <BsFillCheckCircleFill color="green" />
                  ) : (
                    <BsXCircleFill color="red" />
                  )}
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            color="black"
            fontFamily="Fugaz One"
            width="100%"
            fontSize="20px"
          >
            SEM NOMES REGISTRADOS
          </Box>
        )}
      </TableContainer>
      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}

      <Modal
        open={openQuestion}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box
            height="100vh"
            width="100%"
            sx={{ background: '#ffebee' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              fontSize="16px"
              justifyContent="center"
              display="flex"
              flexDirection="column"
            >
              <Box textAlign="center">Quer mesmo Excluir</Box>
              <Box fontFamily="arial black" textAlign="center">
                {nomesVisitantes[indexDel] && nomesVisitantes[indexDel].Nome}
              </Box>
              <Box textAlign="center">da sua lista?</Box>

              <Box mt={5} display="flex" justifyContent="center">
                <Button
                  style={{
                    background: '#780810',
                    color: '#ffff',

                    fontFamily: 'arial black',
                  }}
                  component="a"
                  variant="contained"
                  onClick={() => {
                    setOpenQuestion(false);
                  }}
                >
                  Não
                </Button>
                <Box ml={10} />
                <Button
                  style={{
                    background: '#69f0ae',
                    color: '#780810',
                    fontFamily: 'arial black',
                  }}
                  component="a"
                  variant="contained"
                  onClick={() => {
                    handleDelete();
                    setOpenQuestion(false);
                  }}
                >
                  Sim
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      {openEspera && <Espera descricao="Excluindo Visitante" />}
    </Paper>
  );
}
