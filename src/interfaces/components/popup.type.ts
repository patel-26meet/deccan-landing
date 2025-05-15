export type TPopupAction = {
  label: string;
  onClick: () => void;
};

export type TPopupContent = {
  title: string;
  content: string;
  actions: TPopupAction[];
  onClose: () => void;
};

export enum EnumCookieAcceptance {
  ACCEPT = "accepted",
  REJECT = "rejected",
}
