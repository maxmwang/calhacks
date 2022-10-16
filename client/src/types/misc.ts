export type TError = {
  type: string;
  message: string;
};

export type TAppView = {
  view: 'login' | 'home' | 'split' | 'lobby';
};
