import Input from '@material-ui/core/Input';
import { Box, Typography, Avatar, makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import Image from 'next/image';

dayjs.extend(relativeTime);

const useStyles = makeStyles(() => ({
  img: {
    width: '100%',
  },
  caption: {
    fontWeight: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
}));

function listaIgreja({ item }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box>
      <Box mt="1" ml={2}>
        {/*         <Box mr={2}>
          <Avatar alt={item.authorName} src={item.authorAvatar}>
            SS
          </Avatar>
        </Box>
 */}
        <Box mt={2}>
          <Typography
            className={classes.caption}
            gutterBottom
            variant="body1"
            color="textPrimary"
          >
            {item.igreja}
          </Typography>
          <Typography display="block" variant="body2" color="textSecondary">
            {item.logradouro} - Bairro: {item.bairro} - Cep: {item.cep}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {/* {`${item.delegadosPossiveis} • ${dayjs(item.updatedAt).fromNow()}`} */}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default listaIgreja;
