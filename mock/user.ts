import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs'
const roles: any = [
  {
    name: 'admin',
    description: '拥有系统内所有菜单和路由权限'
  },
  {
    name: 'editor',
    description: '可以看到除户管理页面之外的所有页面'
  }
]
const tokens: any = {
  admin: "admin-token",
  editor: "editor-token"
}
const users: any = {
  "admin-token": {
    id: "admin",
    roles: ["admin"],
    name: "寒山骚年",
    avatar: Mock.Random.image('250x250', '#1890ff', '#fff', 'png', 'admin'),
    description: "拥有系统内所有菜单和路由权限",
  },
  "editor-token": {
    id: "editor",
    roles: ["editor"],
    name: "编辑员",
    avatar: Mock.Random.image('250x250', '#1890ff', '#fff', 'png', 'editor'),
    description:"可以看到除户管理页面之外的所有页面",
  }
};

const login = (config: any) => {
  const { body } = config; // 获取前端传递的数据
  const { username } = body
  if(!username || !Object.keys(tokens).includes(username as string)){
    const err = {
      code: 1,
      message: 'error.username.password.wrong'
    }
    return err
  }
  const response = {
    code: 0,
    message: 'success',
    data: tokens[username as string]
  }
  return response
}

const userInfo = (config: any) => {
  // console.log('get==config===', config)
  const { headers } = config; // 获取请求头信息
  // console.log('headers===',headers); // 打印请求头信息
  const token: string = headers.authorization || '';
  if(!token || !Object.keys(users).includes(token)) {
    const err = {
      code: 1,
      message: "error.getuserinfo",
    };
    return err
  }
  const response = {
    code: 0,
    message: 'success',
    data: users[token as string]
  }
  return response
}

const getUserList = () => {
  const arr = Object.values(users)
  const response = {
    code: 0,
    message: 'success',
    data: arr
  }
  return response
}

const getRoleList = () => {
  const response = {
    code: 0,
    message: 'success',
    data: roles
  }
  return response
}

const addUser = (config: any) => {
  const { body } = config;
  const { id, name, role, description } = body
  const userArr = Object.values(users)
  const fitem = userArr.find((item: any) => item.id === id)
  if(!fitem) { // 新增
    const lastUser = {
      id: id,
      role: role,
      name: name,
      avatar: Mock.Random.image('250x250', '#1890ff', '#fff', 'png', role as string),
      description: description
    }
    const token = `${id}-token`
    tokens[id as string] = token
    users[token] = lastUser
    const response = {
      code: 0,
      message: 'success'
    }
    return response
  } else {
    const response = {
      code: 1,
      message: 'error'
    }
    return response
  }
}

const editUser = (config: any) => {
  const { body } = config;
  const { id, name, role, description } = body
  const userArr = Object.values(users)
  const fitem = userArr.find((item: any) => item.id === id)
  if(fitem) {
    const token = `${id}-token`
    users[token] = {
      ...users[token],
      id: id,
      role: role,
      name: name,
      avatar: Mock.Random.image('250x250', '#1890ff', '#fff', 'png', role as string),
      description: description
    }
    const response = {
      code: 0,
      message: 'success'
    }
    return response
  } else {
    const response = {
      code: 1,
      message: 'error'
    }
    return response
  }
}

const deleteUser = (config: any) => {
  const { body } = config;
  const { id } = body
  delete users[`${id}-token`]
  delete tokens[id as string]
  const response = {
    code: 0,
    message: 'success'
  }
  return response
}

const addRole = (config: any) => {
  const { body } = config;
  const { name, description } = body
  const roleArr = roles.map((item: any) => item.name)
  if(roleArr.includes(name as string)) {
    const response = {
      code: 1,
      message: '角色已存在'
    }
    return response
  }
  roles.push({ name, description })
  // 修改权限
  const response = {
    code: 0,
    message: 'success'
  }
  return response
}

const editRole = (config: any) => {
  const { body } = config;
  const { name, description } = body
  const i = roles.findIndex((item: any) => item.name === name)
  if(i === -1) {
    const response = {
      code: 1,
      message: '角色不存在'
    }
    return response
  }
  roles[i].description = description as string
  // 修改权限
  const response = {
    code: 0,
    message: 'success'
  }
  return response
}

const deleteRole = (config: any) => {
  const { body } = config;
  const { name } = body
  const i = roles.findIndex((item: any) => item.name === name)
  if(i === -1) {
    const response = {
      code: 1,
      message: '角色不存在'
    }
    return response
  }
  roles.splice(i, 1)
  // 删除该角色的权限数据
  // 将用户该角色的所有用户重置为基础角色
  const response = {
    code: 0,
    message: 'success'
  }
  return response
}

export default [
  {
    url: '/api/login',
    timeout: 1000,
    method: 'post',
    response: (request) => {
      const response = login(request)
      return response
    }
  },
  {
    url: '/api/userinfo',
    timeout: 1000,
    method: 'get',
    response: (request) => {
      const response = userInfo(request)
      return response
    }
  },
  {
    url: '/api/getuserList',
    timeout: 1000,
    method: 'get',
    response: () => {
      const response = getUserList()
      return response
    }
  },
  {
    url: '/api/getRoleList',
    timeout: 1000,
    method: 'get',
    response: () => {
      const response = getRoleList()
      return response
    }
  },
  {
    url: '/api/addUser',
    timeout: 1000,
    method: 'post',
    response: (request) => {
      const response = addUser(request)
      return response
    }
  },
  {
    url: '/api/editUser',
    timeout: 1000,
    method: 'post',
    response: (request) => {
      const response = editUser(request)
      return response
    }
  },
  {
    url: '/api/deleteUser',
    timeout: 1000,
    method: 'post',
    response: (request) => {
      const response = deleteUser(request)
      return response
    }
  },
  {
    url: '/api/addRole',
    timeout: 1000,
    method: 'post',
    response: (request) => {
      const response = addRole(request)
      return response
    }
  },
  {
    url: '/api/editRole',
    timeout: 1000,
    method: 'post',
    response: (request) => {
      const response = editRole(request)
      return response
    }
  },
  {
    url: '/api/deleteRole',
    timeout: 1000,
    method: 'post',
    response: (request) => {
      const response = deleteRole(request)
      return response
    }
  }
] as MockMethod[];