import { TokenMarketResponse } from '@/types/token';

export type TokensState = {
  info: TokenMarketResponse | null;
  gettingInfo: boolean;
};

export type TokensAction = {
  fetchTokensInfo: () => void;
};
