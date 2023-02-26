<Box
  sx={{
    fontFamily: 'arial black',
    borderBottom: '1px solid #000',
  }}
  bgcolor="#f9fbe7"
  height="14.66%"
  width="100%"
  display="flex"
  justifyContent="center"
  alignItems="center"
>
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100%"
    textAlign="center"
    width="25%"
  >
    {sem5Mes || '-'}
  </Box>
  {sem0 ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
      width="15%"
      sx={{
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
      }}
    >
      <Box
        onClick={() => {
          setOpenPontuacao(true);
          setCelula(dataSem5);
          setPontos(dataRSem5[0]);
        }}
      >
        {dataSem5 !== '-' && dataRSem5.length && dataRSem5[0].Posicao ? (
          <Box>
            <Box fontSize="16px" color="blue" mt={1}>
              {dataRSem5.length && dataRSem5[0]
                ? `${dataRSem5[0].Posicao}°`
                : '-'}
            </Box>
            <Box fontSize="12px" color="#781080" mt={1}>
              <Box
                height="100%"
                mt={0.2}
                display="flex"
                justifyContent="center"
                fontFamily="Fugaz One"
                alignItems="center"
              >
                <FcSearch size={25} />
              </Box>
            </Box>
          </Box>
        ) : (
          '-'
        )}
      </Box>
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
      width="15%"
      sx={{
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
      }}
    >
      <Oval stroke="blue" width={20} height={20} />
    </Box>
  )}

  {sem0 ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
      width="20%"
    >
      <Box>
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {sem0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <Box width="100%">
                  {dataSem5.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem5);
                        setAnoEnviado(AnoPesquisado);
                        setOpenPlan(true);
                        setSemanaEnviada(semana5);
                        setDataEnviada(
                          dataSem5.Data ? ConverteData2(dataSem5.Data) : '-',
                        );
                      }}
                    >
                      {' '}
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdScreenSearchDesktop size={25} color="green" />
                      </SvgIcon>
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem5);
                        setAnoEnviado(AnoPesquisado);
                        setOpenPlan(true);
                        setSemanaEnviada(semana5);
                        setDataEnviada(
                          dataSem5.Data ? ConverteData2(dataSem5.Data) : '-',
                        );
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdCreateNewFolder size={25} color="blue" />
                      </SvgIcon>
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
              sx={{
                borderLeft: '1px solid #000',
                borderRight: '1px solid #000',
              }}
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
        <Box>
          {dataSem5 && dataSem5.Data
            ? ConverteData2(dataSem5.Data).slice(0, 5)
            : ''}
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
      width="20%"
    >
      <Oval stroke="blue" width={20} height={20} />
    </Box>
  )}

  {sem0Celebracao ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
      width="20%"
      sx={{
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
      }}
    >
      <Box>
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {sem0Celebracao ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box width="100%">
                <Box>
                  {dataSem5Celebracao.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem5Celebracao);
                        setAnoEnviado(AnoPesquisado);
                        setOpenPlanCelebracao(true);
                        setSemanaEnviada(semana5);
                        setDataEnviada(
                          dataSem5Celebracao.Data
                            ? ConverteData2(dataSem5Celebracao.Data)
                            : '-',
                        );
                      }}
                    >
                      {' '}
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdScreenSearchDesktop size={25} color="green" />
                      </SvgIcon>
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem5Celebracao);
                        setAnoEnviado(AnoPesquisado);
                        setOpenPlanCelebracao(true);
                        setSemanaEnviada(semana5);
                        setDataEnviada(
                          dataSem5Celebracao.Data
                            ? ConverteData2(dataSem5Celebracao.Data)
                            : '-',
                        );
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdCreateNewFolder size={25} color="blue" />
                      </SvgIcon>
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
        <Box>
          {dataSem5Celebracao && dataSem5Celebracao.Data
            ? ConverteData2(dataSem5Celebracao.Data).slice(0, 5)
            : ''}
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
      width="20%"
      sx={{
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
      }}
    >
      <Oval stroke="blue" width={20} height={20} />
    </Box>
  )}

  {sem0Discipulado ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
      width="20%"
    >
      <Box>
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {sem0Discipulado ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Box width="100%">
                <Box>
                  {dataSem5Discipulado.id ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem5Discipulado);
                        setAnoEnviado(AnoPesquisado);
                        setOpenPlanDiscipulado(true);
                        setSemanaEnviada(semana5);
                        setDataEnviada(
                          dataSem5Discipulado.Data
                            ? ConverteData2(dataSem5Discipulado.Data)
                            : '-',
                        );
                      }}
                    >
                      {' '}
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdScreenSearchDesktop size={25} color="green" />
                      </SvgIcon>
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setDadosSem(dataSem5Discipulado);
                        setAnoEnviado(AnoPesquisado);
                        setOpenPlanDiscipulado(true);
                        setSemanaEnviada(semana5);
                        setDataEnviada(
                          dataSem5Discipulado.Data
                            ? ConverteData2(dataSem5Discipulado.Data)
                            : '-',
                        );
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdCreateNewFolder size={25} color="blue" />
                      </SvgIcon>
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
              width="100%"
            >
              <Oval stroke="blue" width={20} height={20} />
            </Box>
          )}
        </Box>
        <Box>
          {dataSem5 && dataSem5.Data
            ? ConverteData2(dataSem5Discipulado.Data).slice(0, 5)
            : ''}
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
      width="20%"
    >
      <Oval stroke="blue" width={20} height={20} />
    </Box>
  )}
</Box>;
