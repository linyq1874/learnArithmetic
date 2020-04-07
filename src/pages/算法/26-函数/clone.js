/**
 * 循环中，while的循环效率最好，其次是for，最后是for in
 * ! 注意：for..in循环会把某个类型的原型(prototype)中方法与属性给遍历出来，所以这可能会导致代码中出现意外的错误
 */

/**
 * 深拷贝
 */

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

const deepTag = [mapTag, setTag, arrayTag, objectTag]

const { forEach, timeTaken, isObject, getType } = require('../../../utils/index')

function getInit(target) {
  const Ctor = target.constructor

  return new Ctor()
}

const cloneDeep = (target, map = new Map()) => {
  // 基本原始类型
  if (!isObject(target)) {
    return target
  }
  const type = getType(target)

  let cloneTarget

  if (deepTag.includes(type)) {
    cloneTarget = getInit(target)
  }

  // 防止循环引用
  if (map.has(target)) {
    return target
  }
  map.set(target, cloneTarget)

  // set克隆
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(cloneDeep(value))
    })

    return cloneTarget
  }

  // map克隆
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, cloneDeep(value))
    })

    return cloneTarget
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }

    cloneTarget[key] = cloneDeep(target[key], map)
  })

  return cloneTarget
}

const map = new Map()
map.set('a', 'a1')
map.set('b', 'b1')

const set = new Set()
set.add('aa')
set.add('bb')
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
  empty: null,
  map,
  set,
  fn: () => {}
}

target.target = target

// timeTaken(() => {
//   cloneDeep1(target)
// })
// timeTaken(() => {
//   cloneDeep(target)
// })

// console.log(cloneDeep1(target))
console.log(cloneDeep(target))
// console.log(clone(target))
