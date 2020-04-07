function getArr(length = 10) {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push((Math.random() * 100) >> 0)
  }

  return result
}

function timeTaken(fn) {
  console.time('timeTaken')
  fn()
  console.timeEnd('timeTaken')
}

// 非null，Object，Array，Function
function isObject(target) {
  const type = typeof target

  return target !== null && (type === 'object' || type === 'function')
}

function forEach(arr, cb) {
  let index = -1
  const len = arr.length

  while (++index < len) {
    cb(arr[index], index)
  }

  return arr
}

const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'

const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'

function getType(target) {
  return Object.prototype.toString.call(target)
}

module.exports = {
  getArr,
  timeTaken,
  isObject,
  forEach,
  getType
}
