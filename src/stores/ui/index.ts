import { create } from 'zustand';
import { UiState, UiAction, INotification } from './types';
import { _fetch } from '@/utils/fetch';
import { devtools } from 'zustand/middleware';

export const useUiStore = create<UiState & UiAction>()(
  devtools((set) => ({
    notification: null,
    customAlert: (notification: INotification) => {
      set({ notification });
      setTimeout(() => {
        set({ notification: null });
      }, notification.timeout || 3000);
    },
  })),
);
