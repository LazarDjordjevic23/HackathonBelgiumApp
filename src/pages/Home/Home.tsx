import { useEffect } from 'react';
import { APP_THEME } from '@/stores/theme';
import TokensList from './TokensList/TokensList';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  useEffect(() => {
    localStorage.removeItem(APP_THEME);
  }, []);

  return (
    <motion.div
      initial={{ y: -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <TokensList />
    </motion.div>
  );
}
