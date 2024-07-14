/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
  readonly VITE_KINDE_CLIENT_ID: string;
  readonly VITE_KINDE_DOMAIN: string;
  readonly VITE_AUTH_TOKEN_LS_ID: string;
  readonly VITE_AUTH_VERIFIER_LS_ID: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENV_TYPE: string;
  readonly VITE_USER_TWITTER_ID_KEY: string;
  readonly VITE_SUBMIT_PAGE_PASSWORD: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
