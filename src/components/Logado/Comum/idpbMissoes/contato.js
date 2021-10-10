import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  img: {
    maxWidth: '1110px',
    maxHeight: '544px',
    width: '100%',
    height: 'auto',
  },
}));

const contato = () => {
  const classes = useStyles();
  return (
    <div>
      <Hidden smDown>
        <img
          src="/images/home/contato.png"
          alt="img01"
          className={classes.img}
        />
      </Hidden>
      <Hidden smUp>
        <Box mt={2}>
          <img src="/images/home/contato.png" alt="img01" width="98%" />
        </Box>
      </Hidden>
    </div>
  );
};

export default contato;
