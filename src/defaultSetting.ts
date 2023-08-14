import { TypeLang, TypeTheme } from '@/types/store'
import { TypeNav } from '@/types'
interface SettingOpts {
  title?: string
  language?: TypeLang
  theme?: TypeTheme
  hideLogo?: boolean
  hideTagsView?: boolean
  nofixHeader?: boolean
  primaryColor?: string
  navType?: TypeNav
}
const setting: SettingOpts = {
  title: 'Vite Vue Admin',
  language: 'zh',
  hideLogo: false, // true: 隐藏logo
  hideTagsView: false, // true: 隐藏tagsview
  nofixHeader: false, // true: 取消固定头部
  primaryColor: '#1890ff',
  navType: 'lt'
}

export default setting