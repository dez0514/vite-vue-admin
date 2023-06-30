export interface State {
  comments: number;
  typeId: string;
  showName: boolean;
  count: number;
  user: {
    name: string;
    pwd: string;
  }
}

export type TypeLang = 'zh' | 'en'

export interface ConfigState {
  language?: TypeLang
  collapse?: boolean;
  isShowRightDraw?: boolean
  [key: string]: any
}
