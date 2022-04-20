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

const home = ({ userIgrejas }) => {
  const classes = useStyles();
  console.log('o que é isso');
  return (
    <div>
      <Hidden smDown>
        <img src={userIgrejas[0].img01} alt="img01" className={classes.img} />

        <img src={userIgrejas[0].img02} alt="img02" className={classes.img} />
        <img src={userIgrejas[0].img03} alt="img03" className={classes.img} />
      </Hidden>
      <Hidden mdUp>
        <img
          src={userIgrejas[0].img01}
          alt="img01"
          className={classes.imgMobile}
        />
        <img
          src={userIgrejas[0].img02}
          alt="img01"
          className={classes.imgMobile}
        />
        <img
          src={userIgrejas[0].img03}
          alt="img01"
          className={classes.imgMobile}
        />
      </Hidden>
    </div>
  );
};

export default home;
