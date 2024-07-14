export interface DefaultModalState {
  content: JSX.Element | null;
  extraInfo?: any;
  // styles
  modalStyle?: React.CSSProperties;
  modalClassname?: string;
  wrapperClassname?: string;
  modalLayoutClassName?: string;
}

export interface ModalState extends DefaultModalState {
  isOpen: boolean;
}

export type ModalActions = {
  openModal: (state: DefaultModalState) => void;
  closeModal: () => void;
};
