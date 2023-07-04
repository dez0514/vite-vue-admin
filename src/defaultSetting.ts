import { TypeLang, TypeTheme } from '@/types/store'
interface SettingOpts {
  title?: string
  language?: TypeLang
  theme?: TypeTheme
}
const setting: SettingOpts = {
  title: 'Vite Vue Admin',
  language: 'zh'
}

export default setting