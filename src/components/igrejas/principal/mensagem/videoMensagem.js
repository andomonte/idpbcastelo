import React from 'react';
import ReactPlayer from 'react-player';
import { Box } from '@material-ui/core';
import { IoCloseSharp } from 'react-icons/io5';

export default function VideosMensagem({ setOpenTutorial }) {
  const video = 'https://www.youtube.com/watch?v=z0i4da7U1KA';
  const handleFim = () => {
    setOpenTutorial(false);
  };
  return (
    <Box bgcolor="black" height="100%" width="100%">
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={1}
        mr={2}
        color="white"
        height="8%"
        width="98%"
      >
        <IoCloseSharp size={25} color="white" onClick={handleFim} />
      </Box>
      <Box mt={0} height="90%" width="100%">
        <ReactPlayer
          onEnded={handleFim}
          playing
          width="100%"
          height="100%"
          url={video}
        />
      </Box>
    </Box>
  );

  // <YouTube videoId="NX_zohDRAqs" opts={opts} />;
}
