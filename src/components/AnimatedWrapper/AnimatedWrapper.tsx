import React, { PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedWrapperProps extends PropsWithChildren {
  delay?: number;
}

export default function AnimatedWrapper({ children, delay }: AnimatedWrapperProps) {
  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 10, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay,
      }}
      className="w-full flex flex-col gap-3"
    >
      {children}
    </motion.div>
  );
}
