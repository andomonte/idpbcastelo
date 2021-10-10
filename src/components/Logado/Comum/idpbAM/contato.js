import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

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
        <img
          src="/images/home/contatoMobile.png"
          alt="img01"
          className={classes.img}
        />
      </Hidden>
    </div>
  );
};

export default contato;
