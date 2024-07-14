import { retriveFromLocalStorage } from '@/services/localStorage';

export const getStoredAuthToken = () =>
  retriveFromLocalStorage(import.meta.env.VITE_AUTH_TOKEN_LS_ID);

export const getStoredAuthVerifier = () =>
  retriveFromLocalStorage(import.meta.env.VITE_AUTH_VERIFIER_LS_ID);
