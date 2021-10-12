import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate({ valor, qytFotos }) {
  const [progress, setProgress] = React.useState(0);
  const [val, setVal] = React.useState(valor);

  if (val !== valor) {
    setVal(valor);
    setProgress(0);
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 180) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const Foto1 = () => {
    switch (valor) {
      case 0:
        return <LinearProgress variant="determinate" value={progress} />;
      case 10:
        return <LinearProgress variant="determinate" value={100} />;
      default:
        return <LinearProgress variant="determinate" value={0} />;
    }
  };
  const Foto2 = () => {
    switch (valor) {
      case 1:
        return <LinearProgress variant="determinate" value={progress} />;
      case 11:
        return <LinearProgress variant="determinate" value={100} />;
      default:
        return <LinearProgress variant="determinate" value={0} />;
    }
  };
  const Foto3 = () => {
    switch (valor) {
      case 2:
        return <LinearProgress variant="determinate" value={progress} />;
      case 12:
        return <LinearProgress variant="determinate" value={100} />;
      default:
        return <LinearProgress variant="determinate" value={0} />;
    }
  };
  const Foto4 = () => {
    switch (valor) {
      case 3:
        return <LinearProgress variant="determinate" value={progress} />;
      case 13:
        return <LinearProgress variant="determinate" value={100} />;
      default:
        return <LinearProgress variant="determinate" value={0} />;
    }
  };
  const Foto5 = () => {
    switch (valor) {
      case 4:
        return <LinearProgress variant="determinate" value={progress} />;
      case 14:
        return <LinearProgress variant="determinate" value={100} />;
      default:
        return <LinearProgress variant="determinate" value={0} />;
    }
  };
  return (
    <Box display="flex" sx={{ width: '100%' }}>
      {qytFotos > 1 && (
        <Box mr={1} sx={{ width: '100%' }}>
          <Foto1 />
        </Box>
      )}
      {qytFotos > 1 && (
        <Box mr={1} sx={{ width: '100%' }}>
          <Foto2 />
        </Box>
      )}
      {qytFotos > 2 && (
        <Box mr={1} sx={{ width: '100%' }}>
          <Foto3 />
        </Box>
      )}
      {qytFotos > 3 && (
        <Box mr={1} sx={{ width: '100%' }}>
          <Foto4 />
        </Box>
      )}
      {qytFotos > 4 && (
        <Box mr={1} sx={{ width: '100%' }}>
          <Foto5 />
        </Box>
      )}
    </Box>
  );
}
