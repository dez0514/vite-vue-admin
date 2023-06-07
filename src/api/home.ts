import { get } from '../utils/fetch'

export const getOrderList = (params: any = {}, config: any = {}) => {
  return get('/api/getOrderList', params, config)
}