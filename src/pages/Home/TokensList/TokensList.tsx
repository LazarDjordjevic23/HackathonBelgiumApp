import React from 'react';
import { tokensList } from './list';
import Arrow from '@/assets/svgs/arrow.svg?react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function TokensList() {
  return (
    <div className=" mt-[150px] max-w-[700px] mx-auto bg-nuetral p-4 rounded-lg card  shadow-xl">
      <span className="block text-2xl text-content-tirtiary mb-3 whitespace-pre">
        Choose the token you want to use for the flash loan.
      </span>
      <motion.div className="  rounded-lg overflow-hidden  ">
        {tokensList.map((token, index) => (
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: index / 10 + 0.3,
            }}
          >
            <NavLink
              to={`/Ethereum`}
              className="px-3 py-4 flex items-center justify-between bg-nuetral hover:bg-hovered-nuetral cursor-pointer rounded-lg"
            >
              <div className="flex gap-3 items-center">
                <img className="w-10 h-10" src={token.icon} />
                <span className="text-content-tirtiary">{token.name}</span>
              </div>
              <Arrow className="rotate-90 w-5 h-5 !stroke-black" />
            </NavLink>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
