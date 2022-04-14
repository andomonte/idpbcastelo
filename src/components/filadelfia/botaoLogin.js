import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@mui/material/IconButton';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import LoginIcon from 'src/components/icones/login';

const useStyles = makeStyles(() => ({
  avatar: {
    cursor: 'pointer',
    width: 35,
    height: 35,
  },
  button2: {
    display: 'flex',
    background: '#ffa',
    '&:hover': {
      backgroundColor: '#ff9100',
    },
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'blue',
    justifyContent: 'center',
  },
}));
export default function BotaoLogin() {
  const [session] = useSession();
  const router = useRouter();
  const classes = useStyles();
  if (session)
    router.push({
      pathname: '/selectPerfil',
    });
  return (
    <Box>
      {console.log('fora da seção', session)}
      {!session ? (
        <IconButton
          onClick={() =>
            signIn('google', {
              callbackUrl: `${window.location.origin}/selectPerfil`,
            })
          }
        >
          {' '}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <LoginIcon />{' '}
            <Box mt={0} style={{ fontFamily: 'arial black', fontSize: '10px' }}>
              LOGIN
            </Box>
          </Box>
        </IconButton>
      ) : (
        <Box display="flex" alignItems="center">
          <Avatar
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}`,
              })
            }
            alt="User"
            className={classes.avatar}
            src={session?.user?.image}
          />
        </Box>
      )}
    </Box>
  );
}
