import React from 'react';
import { useSession } from 'next-auth/client';
import prisma from 'src/lib/prisma';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, TextField } from '@material-ui/core';
import Cadastro from 'src/components/castelo/cadastro';

import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/router';
import { IdpbCastelo } from 'src/components/castelo/normal';
import Espera from 'src/utils/espera';
import corIgreja from 'src/utils/coresIgreja';

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
function selectPerfil({ userIgrejas, lideranca, rolMembros, celulas }) {
  const classes = useStyles();

  const [session] = useSession();
  const [open, setOpen] = React.useState(false);
  const [openEspera, setOpenEspera] = React.useState(false);
  const [perfilUser, setPerfilUser] = React.useState('');
  const [perfilSelect] = React.useState('0');
  const router = useRouter();
  let secao = [{ email: '' }];

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
    console.log('valor do pefil selectPefil-->', valorPerfil);
    // expected output: Object { a: 1, b: 4, c: 5 }

    // expected output: Object { a: 1, b: 4, c: 5 }

    const handleChange = (event) => {
      const indexPerfil = Number(event.target.value - 1);
      setPerfilUser(() => [valorPerfil[indexPerfil]]);

      setOpenEspera(true);
    };

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

                    {openEspera && <Espera descricao="Buscando Seu Perfil" />}
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
  console.log('sem secao agora no select perfil');
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

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const celulas = await prisma.celulas.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const userIgrejas = await prisma.igreja.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const rolMembros = await prisma.membros
    .findMany({
      orderBy: [
        {
          Nome: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  const lideranca = await prisma.lideranca.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
      lideranca: JSON.parse(JSON.stringify(lideranca)),
      rolMembros: JSON.parse(JSON.stringify(rolMembros)),
      celulas: JSON.parse(JSON.stringify(celulas)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default selectPerfil;
