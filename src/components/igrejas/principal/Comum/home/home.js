import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

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

  return (
    <div>
      <Hidden smDown>
        <img
          src="/images/castelo/infoDesk01.jpg"
          alt="img01"
          className={classes.img}
        />
        <img
          src="/images/castelo/infoDes02.jpg"
          alt="img02"
          className={classes.img}
        />
        <img
          src="/images/castelo/infoDesk03.jpg"
          alt="img03"
          className={classes.img}
        />
      </Hidden>
      <Hidden mdUp>
        <img
          src="/images/castelo/info1.jpg"
          alt="img01"
          className={classes.imgMobile}
        />
        <img
          src="/images/castelo/info2.jpg"
          alt="img01"
          className={classes.imgMobile}
        />
        <img
          src="/images/castelo/info3.jpg"
          alt="img01"
          className={classes.imgMobile}
        />
      </Hidden>
    </div>
  );
};

export default home;
