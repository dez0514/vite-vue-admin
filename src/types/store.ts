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
export type TypeTheme = 'dark' | 'light' | '' | undefined | null

export interface ConfigState {
  language?: TypeLang
  collapse?: boolean;
  isShowRightDraw?: boolean
  [key: string]: any
}

export interface TagviewState {
  tagsViewArr?: any[]
}