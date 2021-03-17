import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Carousel from 'react-material-ui-carousel';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';

dayjs.extend(relativeTime);

const useStyles = makeStyles(() => ({
  img: {
    maxWidth: '1080px',
    maxHeight: '540px',
    width: '100%',
    height: 'auto',
    margin: 0,
    padding: 0,
  },
  caption: {
    fontWeight: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  card: {
    maxWidth: '1080px',
    maxHeight: '550px',
    width: '100%',
    height: 'auto',
  },
}));
const slideShow = [
  {
    imagel: 'images/home/img01.png',
    imager: './images/home/telaHome.png',
    title: 'Ano da Decisão',
  },
  {
    imagel: 'images/home/contato.png',
    imager: './images/home/telaHome.png',
    title: 'segundo Slide',
  },
  {
    imagel: 'images/IDPBNAC.png',
    imager: './images/teleHome.png',
    title: 'Terceiro Slide',
  },
];
function carrossel() {
  const classes = useStyles();
  return (
    <Box>
      <Carousel className={classes.card}>
        {slideShow.map(({ imagel, title, imager }) => (
          <Carousel key={imagel}>
            <Card className={classes.img}>
              <Hidden smDown>
                <img src={imagel} alt="{title}" className={classes.img} />
              </Hidden>
              <Hidden mdUp>
                <img src={imager} alt="{title}" className={classes.img} />
              </Hidden>
              <CardContent>
                <Typography>{title}</Typography>
              </CardContent>
            </Card>
          </Carousel>
        ))}
      </Carousel>
    </Box>
  );
}

export default carrossel;
