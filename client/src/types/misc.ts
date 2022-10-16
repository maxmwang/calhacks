export type TError = {
  type: string;
  message: string;
};

export type TAppView = {
  view: 'join' | 'create' | 'lobby' | 'split' | 'joinparty';
};
