import React, { useEffect, useState } from 'react';
import { retriveFromLocalStorage } from '@/services/localStorage';

export default function useLocalStorage({ key }: { key: string }) {
  const [value, setValue] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const newValue = retriveFromLocalStorage(key) || '';
      setValue(newValue);
      setFetched(true);
    }, 100); // enough time for app to load and be ready to read from LS
  }, []);

  return [value, fetched];
}
