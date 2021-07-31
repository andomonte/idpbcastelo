import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import useSWR from 'swr';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { ContactSupportOutlined } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  selectEmpty: {
    width: '100%',
  },
  table: {
    padding: 'none',
    marginLeft: -10,
    marginRight: -10,
    size: 'small',
    alignItems: 'center',
    marginTop: 1,
    width: '60%',
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
function createData(descricao, sem1, sem2, sem3, sem4, sem5, total) {
  return { descricao, sem1, sem2, sem3, sem4, sem5, total };
}

export default function TabelaMobile({ dadosRel, item, qtSemana }) {
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState(false);
  // const dados = dadosRel;
  //
  //----------------------------------------------------------------------
  // <Number locale="de-DE">{ofertas}</Number>;
  const url = `${window.location.origin}/api/consultaRIgreja/${item[0].RegiaoIDPB}`;
  const { data } = useSWR(url, fetcher);
  let dataIgreja;
  const newDadosRel = [];
  const ListaIgrejas = [];
  const PainelIgrejas = [];
  const CabeçalhoTabela = [
    { item: 'adultos', total: '', media: '' },
    { item: 'adolecentes', total: '', media: '' },
    { item: 'criancas', total: '', media: '' },
    { item: 'visitantes', total: '', media: '' },
    { item: 'conversoes', total: '', media: '' },
  ];
  const Panel2 = [];
  const [age, setAge] = React.useState('');
  const [igrejaSelecionada, setIgrejaSelecionada] = React.useState([]);
  const total = 0;

  //------------------------------------------------------------------------
  const handleSelect = (event) => {
    const codigoIgreja = event.target.value;
    setAge(event.target.value);
    setIgrejaSelecionada(
      dadosRel.filter((val) => val.codigoIgreja === codigoIgreja),
    );
  };
  //-----------------------------------------------------------------------------
  let rows = [];
  if (igrejaSelecionada.length > 0) {
    for (let i = 0; i < CabeçalhoTabela.length; i += 1) {
      const reducer = igrejaSelecionada.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue[CabeçalhoTabela[i].item]),
        0,
      );
      CabeçalhoTabela[i].total = reducer;
      CabeçalhoTabela[i].media = Number(
        reducer / igrejaSelecionada.length,
      ).toFixed(0);
    }
    rows = [
      createData(
        'Adu',
        igrejaSelecionada[0] ? igrejaSelecionada[0].adultos : '--',
        igrejaSelecionada[1] ? igrejaSelecionada[1].adultos : '--',
        igrejaSelecionada[2] ? igrejaSelecionada[2].adultos : '--',
        igrejaSelecionada[3] ? igrejaSelecionada[3].adultos : '--',
        igrejaSelecionada[4] ? igrejaSelecionada[4].adultos : '--',
        CabeçalhoTabela[0].media && CabeçalhoTabela[0].media,
      ),
      createData(
        'Ado',
        igrejaSelecionada[0] ? igrejaSelecionada[0].adolecentes : '--',
        igrejaSelecionada[1] ? igrejaSelecionada[1].adolecentes : '--',
        igrejaSelecionada[2] ? igrejaSelecionada[2].adolecentes : '--',
        igrejaSelecionada[3] ? igrejaSelecionada[3].adolecentes : '--',
        igrejaSelecionada[4] ? igrejaSelecionada[4].adolecentes : '--',
        CabeçalhoTabela[1].media && CabeçalhoTabela[1].media,
      ),
      createData(
        'Cri',
        igrejaSelecionada[0] ? igrejaSelecionada[0].criancas : '--',
        igrejaSelecionada[1] ? igrejaSelecionada[1].criancas : '--',
        igrejaSelecionada[2] ? igrejaSelecionada[2].criancas : '--',
        igrejaSelecionada[3] ? igrejaSelecionada[3].criancas : '--',
        igrejaSelecionada[4] ? igrejaSelecionada[4].criancas : '--',
        CabeçalhoTabela[2].media && CabeçalhoTabela[2].media,
      ),
      createData(
        'Vis',
        igrejaSelecionada[0] ? igrejaSelecionada[0].visitantes : '--',
        igrejaSelecionada[1] ? igrejaSelecionada[1].visitantes : '--',
        igrejaSelecionada[2] ? igrejaSelecionada[2].visitantes : '--',
        igrejaSelecionada[3] ? igrejaSelecionada[3].visitantes : '--',
        igrejaSelecionada[4] ? igrejaSelecionada[4].visitantes : '--',
        CabeçalhoTabela[3].media && CabeçalhoTabela[3].media,
      ),
      createData(
        'Con',
        igrejaSelecionada[0] ? igrejaSelecionada[0].conversoes : '--',
        igrejaSelecionada[1] ? igrejaSelecionada[1].conversoes : '--',
        igrejaSelecionada[2] ? igrejaSelecionada[2].conversoes : '--',
        igrejaSelecionada[3] ? igrejaSelecionada[3].conversoes : '--',
        igrejaSelecionada[4] ? igrejaSelecionada[4].conversoes : '--',
        CabeçalhoTabela[4].media && CabeçalhoTabela[4].media,
      ),
    ];
  }

  if (data) {
    dataIgreja = data;
    for (let i = 0; i < dataIgreja.length; i += 1) {
      newDadosRel[i] = dadosRel.filter(
        (val) => val.codigoIgreja === data[i].codigoIgreja,
      );
    }
    Panel2.push(
      <FormControl
        variant="outlined"
        className={classes.selectEmpty}
        key="select"
        size="small"
      >
        <FormHelperText>Escolha a Igreja</FormHelperText>

        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={age}
          onChange={handleSelect}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value={age}>
            <em>Todas</em>
          </MenuItem>

          {dataIgreja?.map((items) => (
            <MenuItem key={items.igreja} value={items.codigoIgreja}>
              {items.igreja ?? items.igreja}
            </MenuItem>
          ))}
        </Select>
      </FormControl>,
    );

    if (igrejaSelecionada.length > 0) {
      ListaIgrejas.push(
        <div key={igrejaSelecionada[1].id}>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead size="small">
                <TableRow key={newDadosRel[1].id} size="small">
                  <TableCell align="center" size="small">
                    Sem
                  </TableCell>
                  <TableCell size="small" align="center">
                    1
                  </TableCell>
                  <TableCell size="small" align="center">
                    2
                  </TableCell>
                  <TableCell size="small" align="center">
                    3
                  </TableCell>
                  <TableCell size="small" align="center">
                    4
                  </TableCell>
                  {qtSemana === 5 && (
                    <TableCell size="small" align="center">
                      5
                    </TableCell>
                  )}
                  <TableCell size="small" align="center">
                    M
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.descricao}>
                    <TableCell component="th" scope="row">
                      {row.descricao}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.sem1}
                    </TableCell>
                    <TableCell align="right">{row.sem2}</TableCell>
                    <TableCell align="right">{row.sem3}</TableCell>
                    <TableCell align="right">{row.sem4}</TableCell>
                    {qtSemana === 5 && (
                      <TableCell align="right">{row.sem5}</TableCell>
                    )}
                    <TableCell align="right">{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>,
      );
    }
  }
  //---------------------------------------------------------------------------
  // const dadosRel = data.filter((val) => val.semana === data);

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

  return (
    <div className={classes.root}>
      {Panel2}
      {ListaIgrejas}
    </div>
  );
}
