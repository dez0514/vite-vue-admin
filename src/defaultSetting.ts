import { TypeLang, TypeTheme } from '@/types/store'
interface SettingOpts {
  title?: string
  language?: TypeLang
  theme?: TypeTheme
  hideLogo?: boolean
  hideTagsView?: boolean
}
const setting: SettingOpts = {
  title: 'Vite Vue Admin',
  language: 'zh',
  hideLogo: false,
  hideTagsView: false
}

export default setting