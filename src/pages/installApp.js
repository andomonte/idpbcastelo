import React from 'react';
import { usePWAInstall } from 'react-use-pwa-install';

export default function Header() {
  const install = usePWAInstall();

  return <header>{install}</header>;
}
