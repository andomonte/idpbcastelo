import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(() => ({
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
  return (
    <div>
      <Hidden smDown>
        <img src="/images/home/img01.png" alt="img01" className={classes.img} />
      </Hidden>
      <Hidden mdUp>
        <img
          src="/images/home/telaHome.png"
          alt="img01"
          className={classes.imgMobile}
        />
      </Hidden>
    </div>
  );
};

export default home;
