import React from 'react';
import Info from '@/assets/svgs/info.svg?react';
import { NavLink } from 'react-router-dom';

export default function FeesTable({ profit }: { profit: number }) {
  return (
    <div className="p-4 bg-hovered-nuetral w-full min-h-[200px] rounded-lg ">
      <span className="text-2xl font-semibold block text-content-tirtiary mb-3">Fees</span>

      <div className="flex flex-col gap-3 text-gray-400 text-sm">
        <div className="flex justify-between items-center">
          <span>Estimated Eearnings:</span>
          <div className="flex gap-2 items-center">
            <span>{Number.isFinite(profit) ? profit.toFixed(2) : 0}$</span>
            <Info />
          </div>
        </div>
        {/* <div className="flex justify-between items-center">
          <span>AAVE: 0.1%</span>
          <div className="flex gap-2 items-center">
            <span>$0.1</span>
            <Info />
          </div>
        </div> */}
        <div className="flex justify-between items-center">
          <span>FLASH Fee: 5%</span>
          <div className="flex gap-2 items-center">
            <span>${profit ? (profit / 20).toFixed(2) : 0}</span>
            <Info />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Vesting Fee: 5%</span>
          <div className="flex gap-2 items-center">
            <span>${profit ? (profit / 20).toFixed(2) : 0}</span>
            <Info />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Total:</span>
          <div className="flex gap-2 items-center">
            <span>${profit ? (profit - profit / 10 ).toFixed(2): 0}</span>
            <Info />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <NavLink to="/vesting-contract" className="text-center underline cursor-pointer">
            Check Vesting Contract
          </NavLink>
        </div>
      </div>
    </div>
  );
}
