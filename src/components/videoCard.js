import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const useStyles = makeStyles(() => ({
  img: {
    // maxWidth: '1080px',
    maxHeight: '540px',
    width: '100%',
    height: 'auto',
  },
  caption: {
    fontWeight: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
}));

function videoCard() {
  const classes = useStyles();
  return (
    <div>
      <img src="/images/home/img01.png" alt="img01" className={classes.img} />
    </div>
  );
}

export default videoCard;
