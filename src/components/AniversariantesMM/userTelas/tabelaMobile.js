import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box, Button, Divider } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import SentimentSatisfiedTwoToneIcon from '@material-ui/icons/SentimentSatisfiedTwoTone';
import SentimentDissatisfiedTwoToneIcon from '@material-ui/icons/SentimentDissatisfiedTwoTone';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },

  selectEmpty: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '83.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  table: {
    marginLeft: -10,
    marginRight: -10,
    size: 'small',
    alignItems: 'center',
    marginTop: 1,
    width: '60%',
  },
  caption: {
    fontWeight: 500,
    fontSize: '14px',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    color: '#000',
    marginRight: 20,
  },

  tableCell: {
    padding: '0px 0px',
    fontSize: '12px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
  },
}));

const StyledTableContainer = withStyles(() => ({
  root: {
    width: 'max-content',
  },
}))(TableContainer);
const StyledTableCell = withStyles(() => ({
  root: {
    padding: '0px 0px',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
}))(TableCell);
function createData(descricao, sem1, sem2, sem3, sem4, sem5, total) {
  return { descricao, sem1, sem2, sem3, sem4, sem5, total };
}

export default function TabelaMobile({ dadosRel, item, mes }) {
  const classes = useStyles();

  const url = `${window.location.origin}/api/consultaRIgreja/${item[0].RegiaoIDPB}`;
  const { data } = useSWR(url, fetcher);
  let dataIgreja;
  const newDadosRel = [];
  const dadosMes = [
    { adultos: '', indAdul: '', mediaAdul: '' },
    { adolecentes: '', indAdol: '', mediaAdol: '' },
    { criancas: '', indCri: '', mediaCri: '' },
    { visitantes: '', indVis: '', mediaVis: '' },
    { conversoes: '', indConv: '', mediaConv: '' },
    { ofertas: '', indOfer: '', mediaOfer: '' },
    { dizimos: '', indDiz: '', mediaDiz: '' },
    { somatorio: 0, indSoma: 0, mediaSoma: 0 },
  ];

  // dados dos mes anterior
  const dadosMAnt = [
    { adultos: '', indAdul: '', mediaAdul: '' },
    { adolecentes: '', indAdol: '', mediaAdol: '' },
    { criancas: '', indCri: '', mediaCri: '' },
    { visitantes: '', indVis: '', mediaVis: '' },
    { conversoes: '', indConv: '', mediaConv: '' },
    { ofertas: '', indOfer: '', mediaOfer: '' },
    { dizimos: '', indDiz: '', mediaDiz: '' },
    { somatorio: 0, indSoma: 0, mediaSoma: 0 },
  ];

  const CabeçalhoTabela = [
    { item: 'adultos', total: '', media: '' },
    { item: 'adolecentes', total: '', media: '' },
    { item: 'criancas', total: '', media: '' },
    { item: 'visitantes', total: '', media: '' },
    { item: 'conversoes', total: '', media: '' },
  ];
  const dadosMesAnterior = [
    { item: 'adultos', total: '', media: '' },
    { item: 'adolecentes', total: '', media: '' },
    { item: 'criancas', total: '', media: '' },
    { item: 'visitantes', total: '', media: '' },
    { item: 'conversoes', total: '', media: '' },
  ];
  const Panel2 = [];
  const Tabelas = [];
  const showIgrejas = [];
  const [age, setAge] = React.useState('');
  const [igrejaSelecionada, setIgrejaSelecionada] = React.useState([]);
  const [mesAnterior, setMesAnterior] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  //------------------------------------------------------------------------
  const handleSelect = (event) => {
    // const codigoIgreja = event.target.value;
    const { codigoIgreja } = event.codigoIgreja;

    setAge(event.target.value);
    setIgrejaSelecionada(
      dadosRel.filter((val) => val.codigoIgreja === codigoIgreja),
    );
  };
  const handleIgreja = (eventos) => {
    // const codigoIgreja = event.target.value;
    //  const { codigoIgreja } = data[event];
    const dadosIgreja = dadosRel.filter((val) => {
      if (val.codigoIgreja === eventos && val.mes === mes) {
        return val;
      }
      return null;
    });

    if (dadosIgreja.length > 0) setOpen(true);
    setIgrejaSelecionada(dadosIgreja);
    const mesPassado = String(mes - 1);

    setMesAnterior(
      dadosRel.filter((val) => {
        if (val.codigoIgreja === eventos && val.mes === mesPassado) {
          return val;
        }
        return null;
      }),
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  //-----------------------------------------------------------------------------
  let rows = [];

  let dizimoMes = 0;
  let ofertaMes = 0;
  let dizimoMesAnterior = 0;
  let ofertaMesAnterior = 0;

  if (igrejaSelecionada.length > 0) {
    for (let i = 0; i < CabeçalhoTabela.length; i += 1) {
      const reducer = igrejaSelecionada.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue[CabeçalhoTabela[i].item]),
        0,
      );
      dizimoMes = igrejaSelecionada.reduce(
        (accumulator, currentValue) =>
          parseFloat(accumulator) +
          parseFloat(currentValue.dizimos.replace(',', '.')),
        0,
      );
      ofertaMes = igrejaSelecionada.reduce(
        (accumulator, currentValue) =>
          parseFloat(accumulator) +
          parseFloat(currentValue.ofertas.replace(',', '.')),
        0,
      );
      CabeçalhoTabela[i].total = reducer;
      CabeçalhoTabela[i].media = Number(
        reducer / igrejaSelecionada.length,
      ).toFixed(1);
    }
  }
  if (mesAnterior.length > 0) {
    for (let i = 0; i < dadosMesAnterior.length; i += 1) {
      const reducer = mesAnterior.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue[dadosMesAnterior[i].item]),
        0,
      );

      dizimoMesAnterior = mesAnterior.reduce(
        (accumulator, currentValue) =>
          parseFloat(accumulator) +
          parseFloat(currentValue.dizimos.replace(',', '.')),
        0,
      );
      ofertaMesAnterior = mesAnterior.reduce(
        (accumulator, currentValue) =>
          parseFloat(accumulator) +
          parseFloat(currentValue.ofertas.replace(',', '.')),
        0,
      );
      dadosMesAnterior[i].total = reducer;
      dadosMesAnterior[i].media = Number(reducer / mesAnterior.length).toFixed(
        0,
      );
    }
  }

  /* const taxaCrescimento = (igrejaAnalizada, index) => {
    const mesAnalizado = dadosRel.filter((val) => {
      if (val.codigoIgreja === igrejaAnalizada && val.mes === mes) {
        return val;
      }
      return null;
    });
    if (mesAnalizado.length > 0) {
      totalMesAtual = 0;
      divisorMesAtual = 5 * mesAnalizado.length;
      for (let i = 0; i < CabeçalhoTabela.length; i += 1) {
        const reducer = mesAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue[CabeçalhoTabela[i].item]),
          0,
        );

        CabeçalhoTabela[i].total = reducer;
        CabeçalhoTabela[i].media = Number(
          reducer / mesAnalizado.length,
        ).toFixed(0);
        totalMesAtual += CabeçalhoTabela[i].total;
      }
    }
    const mesPassado = String(mes - 1);

    const mesAnteriorAnalizado = dadosRel.filter((val) => {
      if (val.codigoIgreja === igrejaAnalizada && val.mes === mesPassado) {
        return val;
      }
      return null;
    });

    if (mesAnteriorAnalizado.length > 0) {
      totalMesAnterior = 0;
      divisorMesAnteiror = 5 * mesAnteriorAnalizado.length;

      for (let i = 0; i < dadosMesAnterior.length; i += 1) {
        const reducer = mesAnteriorAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) +
            Number(currentValue[dadosMesAnterior[i].item]),
          0,
        );
        dadosMesAnterior[i].total = reducer;
        dadosMesAnterior[i].media = Number(
          reducer / mesAnteriorAnalizado.length,
        ).toFixed(0);
        totalMesAnterior += dadosMesAnterior[i].total;
      }
    }

    mtMesAtual[index] = (totalMesAtual / divisorMesAtual).toFixed(0);
    mtMesAnterior[index] = (totalMesAnterior / divisorMesAnteiror).toFixed(0);

    if (mesAnalizado.length > 0 && mesAnteriorAnalizado.length > 0) {
      pc[index] = (
        (mtMesAtual[index] * 100) / mtMesAnterior[index] -
        100
      ).toFixed(2);
    } else {
      pc[index] = 'Sem Relatório';
    }
  }; */
  const taxaCrescimento = (igrejaAnalizada, index) => {
    let div = 1;
    const mesAnalizado = dadosRel.filter((val) => {
      if (val.codigoIgreja === igrejaAnalizada && val.mes === mes) {
        return val;
      }
      return null;
    });

    if (mesAnalizado.length > 0) {
      for (let i = 0; i < CabeçalhoTabela.length; i += 1) {
        const reducer = mesAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue[CabeçalhoTabela[i].item]),
          0,
        );

        dadosMes[index].adultos = mesAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue.adultos),
          0,
        );

        dadosMes[index].adolecentes = mesAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue.adolecentes),
          0,
        );

        dadosMes[index].criancas = mesAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue.criancas),
          0,
        );
        dadosMes[index].visitantes = mesAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue.visitantes),
          0,
        );
        dadosMes[index].conversoes = mesAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue.conversoes),
          0,
        );

        dadosMes[index].dizimos = mesAnalizado.reduce(
          (accumulator, currentValue) =>
            parseFloat(accumulator) +
            parseFloat(currentValue.dizimos.replace(',', '.')),
          0,
        );

        dadosMes[index].ofertas = mesAnalizado.reduce(
          (accumulator, currentValue) =>
            parseFloat(accumulator) +
            parseFloat(currentValue.ofertas.replace(',', '.')),
          0,
        );
        dizimoMes = igrejaSelecionada.reduce(
          (accumulator, currentValue) =>
            parseFloat(accumulator) +
            parseFloat(currentValue.dizimos.replace(',', '.')),
          0,
        );
        ofertaMes = igrejaSelecionada.reduce(
          (accumulator, currentValue) =>
            parseFloat(accumulator) +
            parseFloat(currentValue.ofertas.replace(',', '.')),
          0,
        );

        CabeçalhoTabela[i].total = reducer;
        CabeçalhoTabela[i].media = Number(
          reducer / mesAnalizado.length,
        ).toFixed(1);
      }
    }
    const mesPassado = String(mes - 1);

    const mesAnteriorAnalizado = dadosRel.filter((val) => {
      if (val.codigoIgreja === igrejaAnalizada && val.mes === mesPassado) {
        return val;
      }
      return null;
    });

    if (mesAnteriorAnalizado.length > 0) {
      for (let i = 0; i < dadosMesAnterior.length; i += 1) {
        dadosMAnt[index].adultos = mesAnteriorAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue.adultos),
          0,
        );
        // if (!mesAnteriorAnalizado[i]) adulMAnt[i] = 0;
        dadosMAnt[index].adolecentes = mesAnteriorAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue.adolecentes),
          0,
        );
        dadosMAnt[index].criancas = mesAnteriorAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue.criancas),
          0,
        );
        dadosMAnt[index].visitantes = mesAnteriorAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue.visitantes),
          0,
        );
        dadosMAnt[index].conversoes = mesAnteriorAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue.conversoes),
          0,
        );

        dadosMAnt[index].ofertas = mesAnteriorAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) +
            Number(currentValue.ofertas.replace(',', '.')),
          0,
        );

        dadosMAnt[index].dizimos = mesAnteriorAnalizado.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) +
            Number(currentValue.dizimos.replace(',', '.')),
          0,
        );
        //= =========================================================================

        //= ===========================================================================
      }
    }

    //---------------------------------------------------------------------------
    // Calculo dos percentuais de cada intem referente ao mês anterior
    //---------------------------------------------------------------------------

    dadosMes[index].mediaAdul = Number(
      dadosMes[index].adultos / mesAnalizado.length,
    ).toFixed(2);

    dadosMAnt[index].mediaAdul = Number(
      dadosMAnt[index].adultos / mesAnteriorAnalizado.length,
    ).toFixed(2);
    div = 1;
    if (dadosMAnt[index].mediaAdul === 'NaN')
      dadosMAnt[index].mediaAdul = dadosMes[index].mediaAdul;

    if (dadosMAnt[index].mediaAdul > 0) div = dadosMAnt[index].mediaAdul;

    dadosMes[index].indAdul = (
      ((dadosMes[index].mediaAdul - dadosMAnt[index].mediaAdul) * 100) /
      div
    ).toFixed(2);

    //---------------------------------------------------------------------------
    // adolentes
    //---------------------------------------------------------------------------

    dadosMes[index].mediaAdol = Number(
      dadosMes[index].adolecentes / mesAnalizado.length,
    ).toFixed(2);

    dadosMAnt[index].mediaAdol = Number(
      dadosMAnt[index].adolecentes / mesAnteriorAnalizado.length,
    ).toFixed(2);
    div = 1;
    if (dadosMAnt[index].mediaAdol === 'NaN')
      dadosMAnt[index].mediaAdol = dadosMes[index].mediaAdol;

    if (dadosMAnt[index].mediaAdol > 0) div = dadosMAnt[index].mediaAdol;

    dadosMes[index].indAdol = (
      ((dadosMes[index].mediaAdol - dadosMAnt[index].mediaAdol) * 100) /
      div
    ).toFixed(2);

    //---------------------------------------------------------------------------
    // Crianças
    //---------------------------------------------------------------------------

    dadosMes[index].mediaCri = Number(
      dadosMes[index].criancas / mesAnalizado.length,
    ).toFixed(2);

    dadosMAnt[index].mediaCri = Number(
      dadosMAnt[index].criancas / mesAnteriorAnalizado.length,
    ).toFixed(2);
    div = 1;
    if (dadosMAnt[index].mediaCri === 'NaN')
      dadosMAnt[index].mediaCri = dadosMes[index].mediaCri;

    if (dadosMAnt[index].mediaCri > 0) div = dadosMAnt[index].mediaCri;

    dadosMes[index].indCri = (
      ((dadosMes[index].mediaCri - dadosMAnt[index].mediaCri) * 100) /
      div
    ).toFixed(2);
    //---------------------------------------------------------------------------
    // Visitantes
    //---------------------------------------------------------------------------

    dadosMes[index].mediaVis = Number(
      dadosMes[index].visitantes / mesAnalizado.length,
    ).toFixed(2);

    dadosMAnt[index].mediaVis = Number(
      dadosMAnt[index].visitantes / mesAnteriorAnalizado.length,
    ).toFixed(2);
    div = 1;
    if (dadosMAnt[index].mediaVis === 'NaN')
      dadosMAnt[index].mediaVis = dadosMes[index].mediaVis;

    if (dadosMAnt[index].mediaVis > 0) div = dadosMAnt[index].mediaVis;

    dadosMes[index].indVis = (
      ((dadosMes[index].mediaVis - dadosMAnt[index].mediaVis) * 100) /
      div
    ).toFixed(2);

    //---------------------------------------------------------------------------
    // conversão
    //---------------------------------------------------------------------------

    dadosMes[index].mediaConv = Number(
      dadosMes[index].conversoes / mesAnalizado.length,
    ).toFixed(2);

    dadosMAnt[index].mediaConv = Number(
      dadosMAnt[index].conversoes / mesAnteriorAnalizado.length,
    ).toFixed(2);
    div = 1;
    if (dadosMAnt[index].mediaConv === 'NaN')
      dadosMAnt[index].mediaConv = dadosMes[index].mediaConv;

    if (dadosMAnt[index].mediaConv > 0) div = dadosMAnt[index].mediaConv;

    dadosMes[index].indConv = (
      ((dadosMes[index].mediaConv - dadosMAnt[index].mediaConv) * 100) /
      div
    ).toFixed(2);
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    // ofertas
    //---------------------------------------------------------------------------

    dadosMes[index].mediaOfer = Number(
      dadosMes[index].ofertas / mesAnalizado.length,
    ).toFixed(2);

    dadosMAnt[index].mediaOfer = Number(
      dadosMAnt[index].ofertas / mesAnteriorAnalizado.length,
    ).toFixed(2);
    div = 1;
    if (dadosMAnt[index].mediaOfer === 'NaN')
      dadosMAnt[index].mediaOfer = dadosMes[index].mediaOfer;

    if (dadosMAnt[index].mediaOfer > 0) div = dadosMAnt[index].mediaOfer;

    dadosMes[index].indOfer = (
      ((dadosMes[index].mediaOfer - dadosMAnt[index].mediaOfer) * 100) /
      div
    ).toFixed(2);

    //---------------------------------------------------------------------------
    // dízimos
    //---------------------------------------------------------------------------

    dadosMes[index].mediaDiz = Number(
      dadosMes[index].dizimos / mesAnalizado.length,
    ).toFixed(2);

    dadosMAnt[index].mediaDiz = Number(
      dadosMAnt[index].dizimos / mesAnteriorAnalizado.length,
    ).toFixed(2);
    div = 1;
    if (dadosMAnt[index].mediaDiz === 'NaN')
      dadosMAnt[index].mediaDiz = dadosMes[index].mediaDiz;

    if (dadosMAnt[index].mediaDiz > 0) div = dadosMAnt[index].mediaDiz;

    dadosMes[index].indDiz = (
      ((dadosMes[index].mediaDiz - dadosMAnt[index].mediaDiz) * 100) /
      div
    ).toFixed(2);

    //---------------------------------------------------------------------------
    // somatório
    //---------------------------------------------------------------------------
    dadosMes[index].somatorio = parseFloat(
      dadosMes[index].adultos +
        dadosMes[index].adolecentes +
        dadosMes[index].criancas +
        dadosMes[index].visitantes +
        dadosMes[index].conversoes,
    );
    dadosMAnt[index].somatorio = parseFloat(
      dadosMAnt[index].adultos +
        dadosMAnt[index].adolecentes +
        dadosMAnt[index].criancas +
        dadosMAnt[index].visitantes +
        dadosMAnt[index].conversoes,
    );
    const divisor = parseFloat(5 * mesAnalizado.length);
    dadosMes[index].mediaSoma = parseFloat(
      dadosMes[index].somatorio / divisor,
    ).toFixed(2);

    dadosMes[index].mediaSoma = parseFloat(
      dadosMes[index].somatorio / mesAnalizado.length,
    ).toFixed(2);

    dadosMAnt[index].mediaSoma = parseFloat(
      dadosMAnt[index].somatorio / mesAnteriorAnalizado.length,
    ).toFixed(2);

    div = 1;
    if (dadosMAnt[index].mediaSoma === 'NaN')
      dadosMAnt[index].mediaSoma = dadosMes[index].mediaSoma;

    if (dadosMAnt[index].mediaSoma > 0) div = dadosMAnt[index].mediaSoma;

    dadosMes[index].indSoma = (
      ((dadosMes[index].mediaSoma - dadosMAnt[index].mediaSoma) * 100) /
      div
    ).toFixed(2);
  };
  rows = [
    createData(
      'Adultos',
      igrejaSelecionada[0] ? igrejaSelecionada[0].adultos : '--',
      igrejaSelecionada[1] ? igrejaSelecionada[1].adultos : '--',
      igrejaSelecionada[2] ? igrejaSelecionada[2].adultos : '--',
      igrejaSelecionada[3] ? igrejaSelecionada[3].adultos : '--',
      igrejaSelecionada[4] ? igrejaSelecionada[4].adultos : '--',
      CabeçalhoTabela[0].media && CabeçalhoTabela[0].media,
    ),
    createData(
      'Adolecentes',
      igrejaSelecionada[0] ? igrejaSelecionada[0].adolecentes : '--',
      igrejaSelecionada[1] ? igrejaSelecionada[1].adolecentes : '--',
      igrejaSelecionada[2] ? igrejaSelecionada[2].adolecentes : '--',
      igrejaSelecionada[3] ? igrejaSelecionada[3].adolecentes : '--',
      igrejaSelecionada[4] ? igrejaSelecionada[4].adolecentes : '--',
      CabeçalhoTabela[1].media && CabeçalhoTabela[1].media,
    ),
    createData(
      'Crianças',
      igrejaSelecionada[0] ? igrejaSelecionada[0].criancas : '--',
      igrejaSelecionada[1] ? igrejaSelecionada[1].criancas : '--',
      igrejaSelecionada[2] ? igrejaSelecionada[2].criancas : '--',
      igrejaSelecionada[3] ? igrejaSelecionada[3].criancas : '--',
      igrejaSelecionada[4] ? igrejaSelecionada[4].criancas : '--',
      CabeçalhoTabela[2].media && CabeçalhoTabela[2].media,
    ),
    createData(
      'Visitantes',
      igrejaSelecionada[0] ? igrejaSelecionada[0].visitantes : '--',
      igrejaSelecionada[1] ? igrejaSelecionada[1].visitantes : '--',
      igrejaSelecionada[2] ? igrejaSelecionada[2].visitantes : '--',
      igrejaSelecionada[3] ? igrejaSelecionada[3].visitantes : '--',
      igrejaSelecionada[4] ? igrejaSelecionada[4].visitantes : '--',
      CabeçalhoTabela[3].media && CabeçalhoTabela[3].media,
    ),
    createData(
      'Conversões',
      igrejaSelecionada[0] ? igrejaSelecionada[0].conversoes : '--',
      igrejaSelecionada[1] ? igrejaSelecionada[1].conversoes : '--',
      igrejaSelecionada[2] ? igrejaSelecionada[2].conversoes : '--',
      igrejaSelecionada[3] ? igrejaSelecionada[3].conversoes : '--',
      igrejaSelecionada[4] ? igrejaSelecionada[4].conversoes : '--',
      CabeçalhoTabela[4].media && CabeçalhoTabela[4].media,
    ),
    createData(
      'Total Geral',
      igrejaSelecionada[0]
        ? Number(igrejaSelecionada[0].adultos) +
            Number(igrejaSelecionada[0].adolecentes) +
            Number(igrejaSelecionada[0].criancas) +
            Number(igrejaSelecionada[0].visitantes) +
            Number(igrejaSelecionada[0].conversoes)
        : '--',
      igrejaSelecionada[1]
        ? Number(igrejaSelecionada[1].adultos) +
            Number(igrejaSelecionada[1].adolecentes) +
            Number(igrejaSelecionada[1].criancas) +
            Number(igrejaSelecionada[1].visitantes) +
            Number(igrejaSelecionada[1].conversoes)
        : '--',
      igrejaSelecionada[2]
        ? Number(igrejaSelecionada[2].adultos) +
            Number(igrejaSelecionada[2].adolecentes) +
            Number(igrejaSelecionada[2].criancas) +
            Number(igrejaSelecionada[2].visitantes) +
            Number(igrejaSelecionada[2].conversoes)
        : '--',
      igrejaSelecionada[3]
        ? Number(igrejaSelecionada[3].adultos) +
            Number(igrejaSelecionada[3].adolecentes) +
            Number(igrejaSelecionada[3].criancas) +
            Number(igrejaSelecionada[3].visitantes) +
            Number(igrejaSelecionada[3].conversoes)
        : '--',
      igrejaSelecionada[4]
        ? Number(igrejaSelecionada[4].adultos) +
            Number(igrejaSelecionada[4].adolecentes) +
            Number(igrejaSelecionada[4].criancas) +
            Number(igrejaSelecionada[4].visitantes) +
            Number(igrejaSelecionada[4].conversoes)
        : '--',

      CabeçalhoTabela[0].media &&
        CabeçalhoTabela[1].media &&
        CabeçalhoTabela[2].media &&
        CabeçalhoTabela[3].media &&
        CabeçalhoTabela[4].media
        ? parseFloat(CabeçalhoTabela[0].media) +
            parseFloat(CabeçalhoTabela[1].media) +
            parseFloat(CabeçalhoTabela[2].media) +
            parseFloat(CabeçalhoTabela[3].media) +
            parseFloat(CabeçalhoTabela[4].media)
        : '--',
    ),
  ];

  const windowWidth = window.innerWidth;
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
        <FormHelperText style={{ color: '#000' }}>
          Escolha a Igreja
        </FormHelperText>

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
      const largRotulo = windowWidth / 7 + 20;
      const larg = (windowWidth - largRotulo) / 7;

      Tabelas.push(
        <div key={igrejaSelecionada}>
          <StyledTableContainer
            component={Paper}
            style={{ border: '1px solid rgba(0,0,0,0.2)', padding: 4 }}
          >
            <Table style={{ tableLayout: 'auto' }}>
              <TableHead>
                <TableRow key={newDadosRel[1].id}>
                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ width: largRotulo, backgroundColor: '#ffff8d' }}
                  >
                    Semana
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    style={{ width: larg, backgroundColor: '#448aff' }}
                    align="center"
                  >
                    1
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    style={{ width: larg, backgroundColor: '#ffff8d' }}
                    align="center"
                  >
                    2
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    style={{ width: larg, backgroundColor: '#448aff' }}
                    align="center"
                  >
                    3
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    style={{ width: larg, backgroundColor: '#ffff8d' }}
                    align="center"
                  >
                    4
                  </TableCell>

                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ width: larg, backgroundColor: '#448aff' }}
                  >
                    5
                  </TableCell>

                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ width: larg, backgroundColor: '#ffff8d' }}
                  >
                    MD
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.descricao}
                    style={{ width: larg, backgroundColor: '#ffff8d' }}
                    height={30}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      <Box
                        style={{
                          width: largRotulo,
                          fontSize: '10px',
                        }}
                      >
                        {row.descricao}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ width: larg, backgroundColor: '#448aff' }}
                      align="center"
                    >
                      <Box
                        style={{
                          width: larg,
                          fontSize: '12px',
                          height: '100%',
                        }}
                      >
                        {row.sem1}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: '#ffff8d' }}
                    >
                      <Box
                        variant="outlined"
                        style={{
                          width: larg,
                          fontSize: '12px',
                        }}
                      >
                        {row.sem2}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: '#448aff' }}
                    >
                      <Box
                        variant="outlined"
                        style={{
                          width: larg,
                          fontSize: '12px',
                        }}
                      >
                        {row.sem3}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: '#ffff8d' }}
                    >
                      <Box
                        variant="outlined"
                        style={{
                          width: larg,
                          fontSize: '12px',
                        }}
                      >
                        {row.sem4}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: '#448aff' }}
                    >
                      <Box
                        variant="outlined"
                        style={{
                          width: larg,
                          fontSize: '12px',
                        }}
                      >
                        {row.sem5}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ backgroundColor: '#ffff8d' }}
                    >
                      <Box
                        variant="outlined"
                        style={{
                          width: larg,
                          fontSize: '12px',
                        }}
                      >
                        {row.total}
                      </Box>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </div>,
      );
    }

    /* if (igrejaSelecionada.length > 0) {
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
    } */
  }

  // const tc = CabeçalhoTabela[4].media && CabeçalhoTabela[4].media,
  const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
  };

  if (data) {
    showIgrejas.push(
      <Box key={data}>
        {data?.map((items, index) => (
          <Box
            key={items.igreja}
            onClick={() => {
              handleIgreja(items.codigoIgreja);
            }}
            type="button"
            justifyContent="flex-start"
          >
            {taxaCrescimento(items.codigoIgreja, index)}
            <Box display="flex">
              <Box mr={-2} ml={2} mt={1}>
                {dadosMes[index].indSoma === 'NaN' && (
                  <CancelRoundedIcon
                    style={{ fontSize: 40, color: '#3f51b5' }}
                  />
                )}
                {parseFloat(dadosMes[index].indSoma) > 0 && (
                  <SentimentSatisfiedTwoToneIcon
                    style={{ fontSize: 40, color: '#8bc34a' }}
                  />
                )}
                {parseFloat(dadosMes[index].indSoma) < 0 && (
                  <SentimentDissatisfiedTwoToneIcon
                    style={{ fontSize: 40, color: 'red' }}
                  />
                )}
                {parseFloat(dadosMes[index].indSoma) === 0 && (
                  <SentimentSatisfiedIcon
                    style={{ fontSize: 40, color: '#e65100' }}
                  />
                )}
              </Box>

              <Box m={1} ml={3}>
                <Typography
                  variant="body1"
                  display="block"
                  gutterBottom
                  align="left"
                  className={classes.caption}
                >
                  {items.igreja ?? items.igreja}
                </Typography>

                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                  style={{ marginRight: 30 }}
                >
                  {(Number(dadosMes[index].indSoma) >= 0 ||
                    Number(dadosMes[index].indSoma) <= 0) &&
                    'Crescimento de '}
                  {(Number(dadosMes[index].indSoma) >= 0 ||
                    Number(dadosMes[index].indSoma) <= 0) && (
                    <strong style={{ color: '#000' }}>
                      {dadosMes[index].indSoma} %
                    </strong>
                  )}
                  {!(
                    Number(dadosMes[index].indSoma) >= 0 ||
                    Number(dadosMes[index].indSoma) <= 0
                  ) && 'Não tem Relatório'}
                </Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>,
    );
  }

  const largRotulo = windowWidth / 7 + 20;
  const larg = (windowWidth - largRotulo) / 7;
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const body = (
    <Box className={classes.paper}>
      <StyledTableContainer component={Paper}>
        <Box align="center">
          <strong>
            {' '}
            {igrejaSelecionada[0] && igrejaSelecionada[0].igreja}
          </strong>
        </Box>
        <Box align="center" mb={2}>
          <strong>Relatório Mes de {meses[mes - 1]}</strong>
        </Box>
        <Table style={{ tableLayout: 'auto' }}>
          <TableHead>
            <TableRow key="id">
              <TableCell
                align="center"
                className={classes.tableCell}
                style={{ width: largRotulo, backgroundColor: '#ffff8d' }}
              >
                Semana
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ width: larg, backgroundColor: '#448aff' }}
                align="center"
              >
                1
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ width: larg, backgroundColor: '#ffff8d' }}
                align="center"
              >
                2
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ width: larg, backgroundColor: '#448aff' }}
                align="center"
              >
                3
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ width: larg, backgroundColor: '#ffff8d' }}
                align="center"
              >
                4
              </TableCell>

              <TableCell
                align="center"
                className={classes.tableCell}
                style={{ width: larg, backgroundColor: '#448aff' }}
              >
                5
              </TableCell>

              <TableCell
                align="center"
                className={classes.tableCell}
                style={{ width: larg, backgroundColor: '#ffff8d' }}
              >
                MD
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.descricao}
                style={{ width: larg, backgroundColor: '#ffff8d' }}
                height={30}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  <Box
                    style={{
                      width: largRotulo,
                      fontSize: '10px',
                    }}
                  >
                    {row.descricao}
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: larg, backgroundColor: '#448aff' }}
                  align="center"
                >
                  <Box
                    style={{
                      width: larg,
                      fontSize: '12px',
                      height: '100%',
                    }}
                  >
                    {row.sem1}
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: '#ffff8d' }}
                >
                  <Box
                    variant="outlined"
                    style={{
                      width: larg,
                      fontSize: '12px',
                    }}
                  >
                    {row.sem2}
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: '#448aff' }}
                >
                  <Box
                    variant="outlined"
                    style={{
                      width: larg,
                      fontSize: '12px',
                    }}
                  >
                    {row.sem3}
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: '#ffff8d' }}
                >
                  <Box
                    variant="outlined"
                    style={{
                      width: larg,
                      fontSize: '12px',
                    }}
                  >
                    {row.sem4}
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: '#448aff' }}
                >
                  <Box
                    variant="outlined"
                    style={{
                      width: larg,
                      fontSize: '12px',
                    }}
                  >
                    {row.sem5}
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: '#ffff8d' }}
                >
                  <Box
                    variant="outlined"
                    style={{
                      width: larg,
                      fontSize: '12px',
                    }}
                  >
                    {row.total}
                  </Box>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box m={2} mt={2}>
          Oferta do Mês Atual: <strong> R$ {ofertaMes} </strong>
        </Box>
        <Box m={2} mt={2}>
          Oferta do Mês Anterior: <strong>R$ {ofertaMesAnterior} </strong>
        </Box>
        <Divider />
        <Box m={2} mt={2}>
          Dízimo do Mês Atual: <strong> R$ {dizimoMes} </strong>
        </Box>
        <Box m={2} mt={2}>
          Dízimo do Mês Anterior: <strong> R$ {dizimoMesAnterior} </strong>
        </Box>
      </StyledTableContainer>
      <Box textAlign="center" mt={2}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#448aff' }}
          onClick={handleClose}
        >
          Fechar
        </Button>
      </Box>
    </Box>
  );
  return (
    <Box borderRadius={16} {...defaultProps} ml={-3} mr={-3}>
      {showIgrejas}
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Box>
  );
}
