const { isObject } = require('../../../utils/index')

const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((prev, cur) => {
    let p = prefix.length ? prefix + '.' : ''
    if (isObject(obj[cur])) {
      // Object.assign(prev, flattenObject(obj[cur], p + cur))
      prev = {
        ...prev,
        ...flattenObject(obj[cur], p + cur)
      }
    } else {
      prev[p + cur] = obj[cur]
    }

    return prev
  }, {})

const obj = {
  a: 1,
  b: {
    c: {
      d: 2
    }
  }
}

console.log(flattenObject(obj))
