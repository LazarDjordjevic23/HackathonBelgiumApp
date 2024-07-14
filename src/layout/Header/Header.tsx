import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink } from 'react-router-dom';
import Lightning from '@/assets/svgs/lightning.svg?react';

export default function Header() {
  return (
    <header className=" flex justify-between items-center  bg-hovered-nuetral px-9 py-4 absolute top-0 left-0 w-full">
      <NavLink to="/" className="text-content-tirtiary text-5xl font-bold cool-font flex gap-1 items-center">
        FLASH
        <Lightning className="w-12 h-12 rotate-" />
      </NavLink>
      <ConnectButton />
    </header>
  );
}
