import { useState, useEffect } from 'react';

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return { width: '0', height: '0' };
}
export default function TamanhoJanela() {
  const windowDimensions = getWindowDimensions();

  return windowDimensions;
}
