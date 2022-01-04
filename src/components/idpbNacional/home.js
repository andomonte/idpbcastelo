import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { Box, Button } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  button2: {
    display: 'flex',
    background: 'blue',
    fontSize: '14px', // fonte
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
}));

const home = () => {
  const classes = useStyles();
  const router = useRouter();

  const atualizar = () => {
    router.push({
      pathname: '/global',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };
  return (
    <div>
      <Hidden smDown>
        <img src="/images/home/img01.png" alt="img01" className={classes.img} />
        <img src="/images/home/img02.png" alt="img01" className={classes.img} />
        <Box
          mt={-90}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            className={classes.button2}
            variant="contained"
            id="reload"
            onClick={atualizar}
          >
            INSCRIÇÃO
          </Button>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <img
          src="/images/home/global.png"
          alt="img01"
          className={classes.imgMobile}
        />
        <img
          src="/images/home/unidade.png"
          alt="img01"
          className={classes.imgMobile}
        />
        <Box
          mt={-75}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            className={classes.button2}
            variant="contained"
            id="reload"
            onClick={atualizar}
          >
            INSCRIÇÃO
          </Button>
        </Box>
      </Hidden>
    </div>
  );
};

export default home;
