import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock';

const getOrderList = () => {
  let list = []
  const count = 20
  for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
      key: '@increment',
      order_no: '@guid()',
      price: '@float(1000, 15000, 0, 2)',
      'tag|1': ['success', 'pending']
    }))
  }
  return list
}

const getTableList = () => {
  let temp = []
  const count = 20
  for (let i = 0; i < count; i++) {
    temp.push(Mock.mock({
      id: '@increment',
      title: '@ctitle(5, 10)',
      author: '@cname',
      readings: '@integer(300, 5000)',
      date: '@datetime'
    }))
  }
  return temp
}

export default [
  {
    url: '/api/getOrderList',
    timeout: 1000,
    method: 'get',
    response: () => {
      const response = {
        code: 0,
        message: 'success',
        data: getOrderList()
      }
      return response
    }
  },
  {
    url: '/api/getTableList',
    timeout: 1000,
    method: 'get',
    response: () => {
      const response = {
        code: 0,
        message: 'success',
        data: getTableList()
      }
      return response
    }
  }
] as MockMethod[];
