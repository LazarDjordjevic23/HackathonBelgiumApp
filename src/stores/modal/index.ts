import { create } from 'zustand';
import { DefaultModalState, ModalActions, ModalState } from './types';

const initialState: ModalState = {
  isOpen: false,
  content: null,
  extraInfo: {},
  // styles
  modalStyle: undefined,
  modalClassname: '',
  wrapperClassname: '',
  modalLayoutClassName: '',
};

interface ModalStore {
  modal: ModalState;
  actions: ModalActions;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: { ...initialState },
  actions: {
    openModal: (state) => set({ modal: { ...state, isOpen: true } }),
    closeModal: () => set({ modal: { ...initialState } }),
  },
}));
