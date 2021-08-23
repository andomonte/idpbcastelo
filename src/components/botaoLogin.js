import { signIn, signOut, useSession } from 'next-auth/client';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  avatar: {
    cursor: 'pointer',
    width: 35,
    height: 35,
  },
}));
export default function BotaoLogin() {
  const [session] = useSession();
  const classes = useStyles();
  const Login = 'Login';
  return (
    <Box>
      {!session ? (
        <Button
          color="secondary"
          component="a"
          variant="outlined"
          startIcon={<AccountCircle />}
          onClick={() =>
            signIn('google', {
              callbackUrl: `${window.location.origin}/selectPerfil`,
            })
          }
        >
          {Login}
        </Button>
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
