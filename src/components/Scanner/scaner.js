import React, { useMemo, useState } from 'react';
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from '@zxing/library';
import { Box } from '@material-ui/core';
// import ringer from './somOK.mp3';
// import ringerNG from './somNG.mp3';

export default function BarcodeScanner({ setNumeroCPF, setStart }) {
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [selectedVideoDevice, selectVideoDevice] = useState('');

  useMemo(() => {
    const hints = new Map();
    const formats = [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.DATA_MATRIX,
      BarcodeFormat.AZTEC,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.CODE_93,
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.ITF,
      BarcodeFormat.PDF_417,
      BarcodeFormat.UPC_E,
    ];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    const reader = new BrowserMultiFormatReader(hints);
    (async () => {
      const videoInputDeviceList = await reader.listVideoInputDevices();
      setVideoInputDevices(videoInputDeviceList);
      if (videoInputDeviceList.length > 0 && selectedVideoDevice == null) {
        selectVideoDevice(videoInputDeviceList[0].deviceId);
      }
    })();

    reader
      .decodeFromVideoDevice(selectedVideoDevice, 'videoElement', (res) => {
        if (res) {
          const rawText = res.getText();

          setNumeroCPF(rawText);
          setStart(true);
        }
      })
      .then(() => console.log('result'))
      .catch((err) => {
        console.log('error', err);
      });
  }, [selectedVideoDevice]);

  return (
    <Box
      onChange={(event) => {
        const deviceId = event.target.value;
        selectVideoDevice(deviceId);
      }}
      style={{ height: '100%' }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="end"
        height="25%"
        mb={3}
      >
        <select>
          {videoInputDevices.map((inputDevice, index) => (
            <option value={inputDevice.deviceId} key={index}>
              {inputDevice.label || inputDevice.deviceId}
            </option>
          ))}
        </select>
      </Box>

      <Box height="70%">
        <video muted id="videoElement" width="100%" height="100%" />
      </Box>
    </Box>
  );
}
