import { validatenull } from '@/util/validate'

const keyName = '-'

/**
 * 存储localStorage
 */
export const setStore = ({ name, content, type } = {}) => {
  name = keyName + name
  const obj = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  if (type) sessionStorage.setItem(name, JSON.stringify(obj))
  else localStorage.setItem(name, JSON.stringify(obj))
}

/**
 * 获取localStorage
 */
export const getStore = ({ name, debug } = {}) => {
  name = keyName + name
  let obj = {}
  let content
  obj = sessionStorage.getItem(name)
  if (validatenull(obj)) obj = localStorage.getItem(name)
  if (validatenull(obj)) return
  try {
    obj = JSON.parse(obj)
  } catch (e) {
    return obj
  }
  if (debug) {
    return obj
  }
  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    content = eval(obj.content)
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return content
}

/**
 * 删除localStorage
 */
export const removeStore = ({ name, type } = {}) => {
  name = keyName + name
  if (type) {
    sessionStorage.removeItem(name)
  } else {
    localStorage.removeItem(name)
  }
}

/**
 * 获取全部localStorage
 */
export const getAllStore = ({ type } = {}) => {
  const list = []
  if (type) {
    for (let i = 0; i <= sessionStorage.length; i++) {
      list.push({
        name: sessionStorage.key(i),
        content: getStore({
          name: sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= localStorage.length; i++) {
      list.push({
        name: localStorage.key(i),
        content: getStore({
          name: localStorage.key(i)
        })
      })
    }
  }
  return list
}

/**
 * 清空全部localStorage
 */
export const clearStore = ({ type } = {}) => {
  if (type) {
    sessionStorage.clear()
  } else {
    localStorage.clear()
  }
}
