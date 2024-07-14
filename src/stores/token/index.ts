import { create } from 'zustand';
import { TokensAction, TokensState } from './types';
import { retriveFromLocalStorage, setLocalStorage } from '@/services/localStorage';
import { devtools } from 'zustand/middleware';
import { getTokenMarketsInfo } from '@/services/tokens';

export const useTokenStore = create<TokensState & TokensAction>()(
  devtools((set) => ({
    info: null,
    gettingInfo: false,
    fetchTokensInfo: async () => {
      try {
        set({ gettingInfo: true });
        const res = await getTokenMarketsInfo();
        set({ gettingInfo: false, info: res });
      } catch (error) {
        set({ gettingInfo: false });
      }
    },
  })),
);
