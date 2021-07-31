import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useSWR from 'swr';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ContactSupportOutlined } from '@material-ui/icons';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  table: {
    padding: 'none',
    marginLeft: -10,
    marginRight: -10,
    size: 'small',
    alignItems: 'center',
    marginTop: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '90%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function TabelaMobile({ dadosRel, item, qtSemana }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  // const dados = dadosRel;
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //----------------------------------------------------------------------
  // <Number locale="de-DE">{ofertas}</Number>;
  const url = `${window.location.origin}/api/consultaRIgreja/${item[0].RegiaoIDPB}`;
  const { data } = useSWR(url, fetcher);
  let dataIgreja;
  const newDadosRel = [];
  const mdAdultos = 0;
  const contaIgrejas = 0;
  const PainelIgrejas = [];
  if (data) {
    dataIgreja = data;
    for (let i = 0; i < dataIgreja.length; i += 1) {
      newDadosRel[i] = dadosRel.filter(
        (val) => val.codigoIgreja === data[i].codigoIgreja,
      );
    }
    console.log(newDadosRel[1][0].adultos);
    for (let i = 0; i < dataIgreja.length; i += 1) {
      const panel = `Panel${i + 1}`;
      if (newDadosRel)
        PainelIgrejas.push(
          <Accordion
            expanded={expanded === panel}
            onChange={handleChange(panel)}
            key={i}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={panel}
            >
              <Typography className={classes.heading}>
                {dataIgreja[i].igreja}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {newDadosRel[i].length}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {newDadosRel[i][0] && (
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead size="small">
                      <TableRow size="small">
                        <TableCell size="small">Sem</TableCell>
                        <TableCell size="small" align="left">
                          1
                        </TableCell>
                        <TableCell size="small" align="left">
                          2
                        </TableCell>
                        <TableCell size="small" align="left">
                          3
                        </TableCell>
                        <TableCell size="small" align="left">
                          4
                        </TableCell>
                        {qtSemana === 5 && (
                          <TableCell size="small" align="left">
                            5
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow size="small">
                        <TableCell size="small">Adulto</TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][0] && newDadosRel[i][0].adultos}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][1] && newDadosRel[i][1].adultos}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][2] && newDadosRel[i][2].adultos}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][3] && newDadosRel[i][3].adultos}
                        </TableCell>
                        {qtSemana === 5 && (
                          <TableCell size="small" align="left">
                            {newDadosRel[i][4] && newDadosRel[i][4].adultos}
                          </TableCell>
                        )}
                      </TableRow>
                      <TableRow size="small">
                        <TableCell size="small">Adolec.</TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][1] && newDadosRel[i][0].adolecentes}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][1] && newDadosRel[i][1].adolecentes}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][2] && newDadosRel[i][2].adolecentes}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][3] && newDadosRel[i][3].adolecentes}
                        </TableCell>
                        {qtSemana === 5 && (
                          <TableCell size="small" align="left">
                            {newDadosRel[i][4] && newDadosRel[i][4].adolecentes}
                          </TableCell>
                        )}
                      </TableRow>
                      <TableRow size="small">
                        <TableCell size="small">Crianças</TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][0] && newDadosRel[i][0].criancas}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][1] && newDadosRel[i][1].criancas}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][2] && newDadosRel[i][2].criancas}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][3] && newDadosRel[i][3].criancas}
                        </TableCell>
                        {qtSemana === 5 && (
                          <TableCell size="small" align="left">
                            {newDadosRel[i][4] && newDadosRel[i][4].criancas}
                          </TableCell>
                        )}
                      </TableRow>
                      <TableRow size="small">
                        <TableCell size="small">Visitantes</TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][0] && newDadosRel[i][0].visitantes}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][1] && newDadosRel[i][1].visitantes}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][2] && newDadosRel[i][2].visitantes}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][3] && newDadosRel[i][3].visitantes}
                        </TableCell>
                        {qtSemana === 5 && (
                          <TableCell size="small" align="left">
                            {newDadosRel[i][4] && newDadosRel[i][4].visitantes}
                          </TableCell>
                        )}
                      </TableRow>
                      <TableRow size="small">
                        <TableCell size="small">Conver..</TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][0] && newDadosRel[i][0].conversoes}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][1] && newDadosRel[i][1].conversoes}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][2] && newDadosRel[i][2].conversoes}
                        </TableCell>
                        <TableCell size="small" align="left">
                          {newDadosRel[i][3] && newDadosRel[i][3].conversoes}
                        </TableCell>
                        {qtSemana === 5 && (
                          <TableCell size="small" align="left">
                            {newDadosRel[i][4] && newDadosRel[i][4].conversoes}
                          </TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>,
        );
    }
  }
  //---------------------------------------------------------------------------
  // const dadosRel = data.filter((val) => val.semana === data);

  const mdAdolecentes = [];
  const mdCriancas = [];
  const mdVisitantes = [];
  const mdConversoes = [];
  const mdOfertas = [];
  const mdDizimos = [];
  const newRel = [];
  //  console.log(newDadosRel);
  // for (let i = 0; i < .length; i += 1) {
  //   dataValue = [
  //     {
  //       igreja: [data[i].igreja],
  //       adultos: [data[i].adultos],
  //       adolecentes: [data[i].adolecentes],
  //     },
  //   ];
  // }
  // for (let i = 0; i < dadosRel.length; i = +1) {
  //   mdAdultos;
  // }

  return <div className={classes.root}>{PainelIgrejas}</div>;
}
