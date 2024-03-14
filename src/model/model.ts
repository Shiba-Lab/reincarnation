//イベントの送信およびブロードキャスト時に使用される型定義
export type ServerToClientEvents = {
  photo: (url: string) => void;
  videoSettled: (message: string) => void;
  light: (message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
};

//イベント受信時に使用する型定義
export type ClientToServerEvents = {
  upload: (message: string) => void;
  start: (message: string) => void;
};
