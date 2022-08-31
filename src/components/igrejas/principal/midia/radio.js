import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import Select from 'react-select';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { MdLoop } from 'react-icons/md';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    color: 'black',
    backgroundColor: state.data.color,
    fontSize: '16px',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.data.color,
    fontSize: '16px',
    height: 40,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};
function Player({ radioIdpb }) {
  const musics = radioIdpb;
  const musicaInicial = {
    label: 'Buscando uma Musica...',
    value: -1,
  };

  const [numberMusic, setNumberMusic] = React.useState(0);
  const [musica, setMusica] = React.useState(musicaInicial);
  const [repeat, setRepeat] = React.useState(false);

  const handleMudar = () => {
    let newMusic = Math.floor(Math.random() * musics.length);
    if (newMusic === numberMusic) newMusic -= 1;
    if (newMusic < 0) newMusic = musics.length;
    setMusica(musics[newMusic]);
    setNumberMusic(newMusic);
  };
  React.useEffect(() => {
    const newMusic = Math.floor(Math.random() * musics.length);
    setMusica(musics[newMusic]);
  }, []);
  const handleIncMusica = () => {
    let newMusic = numberMusic + 1;
    if (newMusic >= musics.length) newMusic = 0;
    setMusica(musics[newMusic]);
    setNumberMusic(newMusic);
  };
  const handleDecMusica = () => {
    let newMusic = numberMusic - 1;
    if (newMusic < 0) newMusic = 5;
    setMusica(musics[newMusic]);
    setNumberMusic(newMusic);
  };
  const handleRepMusica = () => {
    setRepeat(!repeat);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      <Box
        width="96%"
        // maxWidth={450}

        bgcolor={corIgreja.principal}
        height="97%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={16}
        ml={0}
      >
        <Box width="100%" mb="10vh">
          <Box
            height={180}
            mb="2vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src="/images/filadelfia/filadelfia2.png"
              alt="Filadelfia"
              height="30%"
              width="50%"
            />
          </Box>
          <Box display="flex" justifyContent="center" width="100%">
            <Box width="90%">
              <Select
                id="long-value-select"
                instanceId="long-value-select"
                styles={customStyles}
                isSearchable={false}
                value={musica}
                onChange={(e) => {
                  setMusica(e);
                }}
                options={musics}
              />
            </Box>
          </Box>
          <Box
            width="100%"
            mt={10}
            color="white"
            flexDirection="column"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box borderRadius={16} height={120} width="90%" bgcolor="#f1f3f4">
              {/* autoPlay */}
              <Box display="flex" justifyContent="center">
                <ReactAudioPlayer
                  src={musica.url}
                  loop={repeat}
                  autoPlay
                  controls
                  onEnded={handleMudar}
                />
              </Box>
              <Box mt={2} display="flex" justifyContent="center">
                <FaCaretLeft
                  onClick={handleDecMusica}
                  size={25}
                  color="#C1C2C3"
                />
                <Box ml={5} mr={5}>
                  <MdLoop
                    onClick={handleRepMusica}
                    size={25}
                    color={repeat ? 'blue' : '#C1C2C3'}
                  />
                </Box>

                <FaCaretRight
                  onClick={handleIncMusica}
                  size={25}
                  color="#C1C2C3"
                />
              </Box>
            </Box>
          </Box>
          <Box
            mt={5}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box fontSize="18px" fontFamily="Fugaz One" color="white">
              {musica.label}
            </Box>
          </Box>
          <Box
            mt={2}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontFamily="Rubik"
            color="yellow"
          >
            <Box fontSize="18px" fontFamily="Fugaz One">
              {musica.compositor}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Player;
