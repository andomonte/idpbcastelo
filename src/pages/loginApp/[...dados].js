import { Box } from '@mui/material';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import useSWR from 'swr';
import axios from 'axios';
import { Oval } from 'react-loading-icons';
import cpfMask from 'src/components/mascaras/cpf';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Login() {
  const router = useRouter();
  const { dados } = router.query;
  const [authState, setAuthState] = React.useState({
    cpf: '',
    password: '',
  });
  const url1 = `/api/consultaMembros`;
  const { data: rolMembros } = useSWR(url1, fetcher);
  const handleAuth = async () => {
    if (authState.password.length > 3 && authState.cpf.length) {
      try {
        const user = rolMembros?.filter((val) => {
          if (val.CPF) {
            return (
              String(val.CPF.replace(/\D/g, '')) ===
              String(authState.cpf.replace(/\D/g, ''))
            );
          }
          return 0;
        });

        if (user && user.length) {
          signIn('credentials', {
            ...authState,
            redirect: false,
          })
            .then((response) => {
              if (response.ok && response.error === null) {
                // Authenticate user

                router.push({
                  pathname: '/selectPerfilCPF',
                  query: { cpf: authState.cpf },
                });
              }
            })
            .catch(() => {
              router.push({
                pathname: '/selectPerfilCPF',
                query: { cpf: authState.cpf },
              });
            });
        } else {
          router.push({
            pathname: '/cadastro',
            query: { cpf: authState.cpf },
          });
        } // ola
      } catch (error) {
        if (error.response) {
          const { message } = error.response.data;
          throw new Error(message);
        } else console.log(error);
      }
    }

    return 0;
  };

  React.useEffect(() => {
    handleAuth('credencial');
  }, [handleAuth]);
  React.useEffect(() => {
    if (dados && dados.length && rolMembros && rolMembros.length) {
      setAuthState({
        cpf: cpfMask(dados[0]),
        password: dados[1],
      });
    }
  }, [dados, rolMembros]);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal}
    >
      carregando...
      <Box display="flex" alignItems="center">
        <Oval stroke="white" width={30} height={30} />
      </Box>
    </Box>
  );
}
