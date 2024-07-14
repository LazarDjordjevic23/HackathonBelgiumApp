export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface INotification {
  text: string;
  type: NotificationType;
  timeout?: number;
}

export type UiState = {
  notification: INotification | null;
};

export type UiAction = {
  customAlert: (notification: INotification) => void;
};
