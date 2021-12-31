import React from 'react';
import { jsPDF, HTMLOptionImage } from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import PrintIcon from '@material-ui/icons/Print';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Box, Grid, Button, Typography } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import PesquisaCPF from 'src/components/Global/meuTicket/pesquisaCPF';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TamanhoJanela from 'src/utils/getSize';

const janela = TamanhoJanela();
// import Drawer from '@material-ui/core/Drawer';
/* import {
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share'; */

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,

  border: '2px solid #b91a30',
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
  width: '95%',
};
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#b91a30'),
    backgroundColor: '#b91a30',
    '&:hover': {
      backgroundColor: '#b91a30',
    },
  },
}))(Button);

const GeneratePdf = ({ html, cpf }) => {
  const [openTicket, setOpenTicket] = React.useState(false);
  // const [openDrawer, setOpenDrawer] = React.useState(false);

  /* const convertDivToPng = async (div) => {
    const data = await toJpeg(div, {
      cacheBust: true,
      canvasWidth: janela.width + 100,
      canvasHeight: janela.height + 300,
    });
    return data;
  }; */
  const gerarTicket = () => {
    console.log('vai para o ticket');
    setOpenTicket(true);
  };
  const generateImage = async () => {
    //  setOpenDrawer(true);
    try {
      const data = await toJpeg(html.current, { quality: 0.95 }); // await convertDivToPng(html.current);
      if (data) {
        const link = document.createElement('a');
        link.href = data;
        link.download = 'comprovante-Global.jpeg';
        link.click();
      }
    } catch (error) {
      console.log(error, 'ini error sertifikat');
    }
  };

  const generatePdf = async () => {
    const image = await toPng(html.current, { quality: 0.95 });
    // const image = document.getElementById('image').getAttribute('src');
    // const JsPDF = jsPDF();
    const doc = new jsPDF();

    doc.addImage(image, 'JPEG', 5, 22, 80, 120);
    doc.save();
  };

  //= ==============================================================
  // imprimir
  const handlePrint = useReactToPrint({
    content: () => html.current,
  });
  //= ==================================================================

  //= ==============================================================
  // Baixar PDF

  //= ==================================================================

  return (
    <div className="button-container">
      <Box display="flex" justifyContent="center">
        <Box
          mt={janela.height > 600 ? 0 : 6}
          display="flex"
          width="100%"
          justifyContent="center"
        >
          <Box>
            <IconButton
              onClick={generatePdf}
              style={{ color: '#780208' }}
              aria-label="add to shopping cart"
            >
              <PictureAsPdfIcon />
            </IconButton>
          </Box>

          <Box ml={6}>
            <IconButton
              onClick={handlePrint}
              color="secondary"
              aria-label="add to shopping cart"
            >
              <PrintIcon />
            </IconButton>
          </Box>

          <Box ml={6}>
            <IconButton
              onClick={generateImage}
              color="primary"
              aria-label="add to shopping cart"
            >
              <ImageIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        mt={janela.height > 600 ? 1 : -21}
        ml={janela.height > 600 ? 0 : 12}
        width="100%"
      >
        <Box display="flex" justifyContent="center">
          <ColorButton
            style={{ borderRadius: 16 }}
            variant="contained"
            value="value"
            onClick={gerarTicket}
          >
            Gerar Ticket
          </ColorButton>
        </Box>
      </Box>
      {openTicket && <PesquisaCPF cpf={cpf} />}
    </div>
  );
};

export default GeneratePdf;
