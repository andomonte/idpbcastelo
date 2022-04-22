import React from 'react';
import { useSession } from 'next-auth/client';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, TextField } from '@material-ui/core';
import Cadastro from 'src/components/castelo/cadastro';

import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/router';
import { IdpbCastelo } from 'src/components/castelo/normal';
import Espera from 'src/utils/espera';
import corIgreja from 'src/utils/coresIgreja';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tamanhoDonw600: {
    [theme.breakpoints.between('xl', 'lg')]: {
      maxWidth: 500,
    },
    [theme.breakpoints.between('md', 'sm')]: {
      maxWidth: 600,
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: 300,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    width: '50%',
    height: '30%',
    textAlign: 'center',
  },
  formControl: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tf_s: {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    width: '90%',
    height: '40px',
    fontSize: '14px',
    [theme.breakpoints.down('md')]: {},
    //  borderRadius: '10px',
    //   border: '0px solid #b91a30',
  },
}));
function SelectPerfil() {
  const classes = useStyles();

  const [session] = useSession();
  const [open, setOpen] = React.useState(false);
  const [openEspera, setOpenEspera] = React.useState(true);
  const [contagem, setContagem] = React.useState(false);
  const [perfilUser, setPerfilUser] = React.useState('');
  const [perfilSelect] = React.useState('0');
  const router = useRouter();
  const [lideranca, setLideranca] = React.useState('');
  const [rolMembros, setRolMembros] = React.useState('');
  const [celulas, setCelulas] = React.useState('');
  const [userIgrejas, setUserIgrejas] = React.useState('');

  const url = `/api/consultaMembros`;
  const { data: members, error: errorMembers } = useSWR(url, fetcher);
  const url2 = `/api/consultaLideranca`;
  const { data: lideres, error: errorLideres } = useSWR(url2, fetcher);
  const url3 = `/api/consultaCelulas`;
  const { data: cells, error: errorCells } = useSWR(url3, fetcher);
  const url4 = `/api/consultaIgreja`;
  const { data: igrejas, error: errorIgrejas } = useSWR(url4, fetcher);

  React.useEffect(() => {
    if (errorMembers) return <div>An error occured.</div>;
    if (!members) return <div>Loading ...</div>;
    if (members) {
      setRolMembros(members);
    }

    return 0;
  }, [members]);

  React.useEffect(() => {
    if (errorLideres) return <div>An error occured.</div>;
    if (!lideres) return <div>Loading ...</div>;
    if (lideres) {
      setLideranca(lideres);
    }

    return 0;
  }, [lideres]);

  React.useEffect(() => {
    if (errorCells) return <div>An error occured.</div>;
    if (!cells) return <div>Loading ...</div>;
    if (cells) {
      setCelulas(cells);
    }

    return 0;
  }, [cells]);

  React.useEffect(() => {
    if (errorIgrejas) return <div>An error occured.</div>;
    if (!igrejas) return <div>Loading ...</div>;
    if (igrejas) {
      setUserIgrejas(igrejas);
    }

    return 0;
  }, [igrejas]);

  let secao = [{ email: '' }];
  console.log(
    'sera aqui o inicio do erro',
    openEspera,
    celulas.length,
    rolMembros.length,
    lideranca.length,
    userIgrejas.length,
  );

  React.useEffect(() => {
    if (
      userIgrejas.length &&
      lideranca.length &&
      rolMembros.length &&
      celulas.length
    ) {
      setOpenEspera(false);
    }
    console.log('veio aqui');
    return 0;
  }, [userIgrejas, lideranca, rolMembros, celulas]);

  if (openEspera) return <Espera descricao="Buscando Seu Perfil" />;

  console.log('em fim');
  const dadosUser = userIgrejas.filter((val) => val.codigo === 'AM-030');

  if (session) {
    secao = lideranca.filter((val) => val.Email === session.user.email);

    const valorPerfil = secao.map((items, index) => {
      if (items.Funcao === 'Presidente')
        return {
          Funcao: items.Funcao,
          Descricao: `Pastor Presidente`,
          id: index + 1,
          numero: items.Igreja,
          Celula: items.Celula,
          Coordenacao: items.Coordenacao,
          Distrito: items.Distrito,
          Email: items.Email,
          Igreja: items.Igreja,
          Nascimento: items.Nascimento,
          Nome: items.Nome,
          RolMembro: items.RolMembro,
          supervisao: items.supervisao,
        };
      if (items.Funcao === 'PastorDistrito')
        return {
          Funcao: items.Funcao,
          Descricao: `Pastor (Distrito ${items.Distrito})`,
          id: index + 1,
          numero: items.Distrito,
          Celula: items.Celula,
          Coordenacao: items.Coordenacao,
          Distrito: items.Distrito,
          Email: items.Email,
          Igreja: items.Igreja,
          Nascimento: items.Nascimento,
          Nome: items.Nome,
          RolMembro: items.RolMembro,
          supervisao: items.supervisao,
        };

      if (items.Funcao === 'Coordenador')
        return {
          Funcao: items.Funcao,
          Descricao: `Coordenador (Coordenação ${items.Coordenacao})`,
          id: index + 1,
          numero: items.Coordenacao,
          Celula: items.Celula,
          Coordenacao: items.Coordenacao,
          Distrito: items.Distrito,
          Email: items.Email,
          Igreja: items.Igreja,
          Nascimento: items.Nascimento,
          Nome: items.Nome,
          RolMembro: items.RolMembro,
          supervisao: items.supervisao,
        };
      if (items.Funcao === 'Supervisor')
        return {
          Funcao: items.Funcao,
          Descricao: `Supervisor (Supervisao ${items.supervisao})`,
          id: index + 1,
          numero: items.supervisao,
          Celula: items.Celula,
          Coordenacao: items.Coordenacao,
          Distrito: items.Distrito,
          Email: items.Email,
          Igreja: items.Igreja,
          Nascimento: items.Nascimento,
          Nome: items.Nome,
          RolMembro: items.RolMembro,
          supervisao: items.supervisao,
        };

      if (items.Funcao === 'Lider')
        return {
          Funcao: items.Funcao,
          Descricao: `Líder (Celula ${items.Celula})`,
          id: index + 1,
          numero: items.Celula,
          Celula: items.Celula,
          Coordenacao: items.Coordenacao,
          Distrito: items.Distrito,
          Email: items.Email,
          Igreja: items.Igreja,
          Nascimento: items.Nascimento,
          Nome: items.Nome,
          RolMembro: items.RolMembro,
          supervisao: items.supervisao,
        };

      return 0;
    });
    const membro = rolMembros.filter((val) => val.Email === session.user.email);
    let userMembro = {};
    console.log('val membro e rolMembros', membro, rolMembros);
    if (membro.length > 0) {
      userMembro = {
        Celula: membro[0].Celula,
        Coordenacao: membro[0].Coordenacao,
        Descricao: `Membro (Célula ${membro[0].Celula})`,
        Distrito: membro[0].Distrito,
        Email: membro[0].Email,
        Funcao: `Membro`,
        Igreja: membro[0].Igreja,
        Nascimento: membro[0].Nascimento,
        Nome: membro[0].Nome,
        RolMembro: membro[0].RolMembro,
        id: secao.length + 1,
        supervisao: membro[0].Supervisao,
        numero: membro[0].Celula,
      };
    }

    valorPerfil.push(userMembro); // para objeto -> Object.assign(secao, userMembro);
    // expected output: Object { a: 1, b: 4, c: 5 }

    // expected output: Object { a: 1, b: 4, c: 5 }

    const handleChange = (event) => {
      setContagem(true);
      const indexPerfil = Number(event.target.value - 1);
      setPerfilUser(() => [valorPerfil[indexPerfil]]);
    };
    console.log('valor do pefil selectPefil-->', valorPerfil);

    if (Object.keys(userMembro).length === 0) {
      return (
        <Cadastro
          title="IDPB-CELULAS"
          lideranca={lideranca}
          rolMembros={rolMembros}
        />
      );
    }

    const body = (
      <Box width="100vw">
        <Box
          height="100vh"
          width="100%"
          minWidth={300}
          minHeight={500}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor={corIgreja.principal}
        >
          <Box width="100%">
            <Box textAlign="center" mt={-3} mb={2}>
              <img src="/images/castelo.png" alt="Castelo" width={80} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                width="90%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minWidth={280}
                borderRadius={16}
                height="auto"
                bgcolor="#fafafa"
              >
                <Box>
                  <Box
                    mt={3}
                    mb={3}
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    width="100%"
                    minWidth={300}
                  >
                    <Box
                      color="#000"
                      style={{ fontSize: '22px', fontFamily: 'arial black' }}
                    >
                      <Grid item container direction="column" xs={12}>
                        <Box
                          textAlign="center"
                          color="#000"
                          style={{
                            fontSize: '18px',
                            fontFamily: 'arial black',
                          }}
                        >
                          VOCÊ TEM {valorPerfil.length} Pefis
                        </Box>
                      </Grid>
                      <Grid item container direction="column" xs={12}>
                        <Box
                          textAlign="center"
                          mt={1}
                          color="#000"
                          style={{ fontSize: '16px', fontFamily: 'arial' }}
                        >
                          <strong style={{ color: '' }}>
                            Escolha qual deseja acessar{' '}
                          </strong>{' '}
                        </Box>
                      </Grid>
                    </Box>
                    <Box mt={5} mb={3} width="100%" textAlign="center">
                      <Grid item xs={12} md={12}>
                        <Box>
                          <TextField
                            value={perfilSelect}
                            select
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="Escolha seu Perfil"
                            className={classes.tf_s}
                            style={{
                              textAlign: 'start',
                              WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                            }}
                          >
                            <MenuItem value={perfilSelect}>
                              <em>Escolha seu Perfil</em>
                            </MenuItem>

                            {valorPerfil?.map((items) => (
                              <MenuItem key={items.id} value={items.id}>
                                {items.Descricao ?? items.Descricao}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      </Grid>
                    </Box>

                    {contagem && <Espera descricao="Atualizando Seu Perfil" />}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
    if (valorPerfil.length === 1 && perfilUser === '')
      setPerfilUser(valorPerfil);
    if (valorPerfil.length > 1 && !open && perfilUser === '') setOpen(true);

    if (perfilUser !== '') {
      router.push(
        {
          pathname: '/meuPerfil',
          query: perfilUser[0],
        },
        '/meuPerfil',
      );
    }
    return <Box>{open && <Box minHeight={500}>{body}</Box>} </Box>;
  }

  return (
    <Box display="flex" align="center" justifyContent="center">
      <Box>
        <IdpbCastelo
          lideranca={lideranca}
          rolMembros={rolMembros}
          userIgrejas={dadosUser}
          celulas={celulas}
          perfilUser={perfilUser[0]}
          title="IDPB-CELULAS"
        />
      </Box>
    </Box>
  );
}

export default SelectPerfil;
