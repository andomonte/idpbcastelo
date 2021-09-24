import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate({ valor }) {
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

  return (
    <Box display="flex" sx={{ width: '100%' }}>
      <Box mr={1} sx={{ width: '100%' }}>
        {valor === 0 ? (
          <LinearProgress variant="determinate" value={progress} />
        ) : (
          <LinearProgress variant="determinate" value={0} />
        )}
      </Box>
      <Box mr={1} sx={{ width: '100%' }}>
        {valor === 1 ? (
          <LinearProgress variant="determinate" value={progress} />
        ) : (
          <LinearProgress variant="determinate" value={0} />
        )}
      </Box>
      <Box mr={1} sx={{ width: '100%' }}>
        {valor === 2 ? (
          <LinearProgress variant="determinate" value={progress} />
        ) : (
          <LinearProgress variant="determinate" value={0} />
        )}
      </Box>
      <Box mr={1} sx={{ width: '100%' }}>
        {valor === 3 ? (
          <LinearProgress variant="determinate" value={progress} />
        ) : (
          <LinearProgress variant="determinate" value={0} />
        )}
      </Box>
      <Box mr={1} sx={{ width: '100%' }}>
        {valor === 4 ? (
          <LinearProgress variant="determinate" value={progress} />
        ) : (
          <LinearProgress variant="determinate" value={0} />
        )}
      </Box>
    </Box>
  );
}
