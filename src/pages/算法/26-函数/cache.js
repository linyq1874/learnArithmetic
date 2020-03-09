const { timeTaken } = require('../../../utils/index')

/**
 * 缓存函数
 * @param {*} fn
 */

const memorize = function(fn) {
  const cache = Object.create(null) // 存储缓存数据的对象
  return function(...args) {
    // 这里用到数组的扩展运算符
    const _args = JSON.stringify(args) // 将参数作为 cache 的key
    return cache[_args] || (cache[_args] = fn(...args)) // 如果已经缓存过，直接取值。否则重新计算并且缓存
  }
}

const add = function(a, b) {
  console.log('开始缓存')
  return a + b
}

const adder = memorize(add)

console.log(adder(2, 6)) // 输出结果: 开始缓存 8        // cache: { '[2, 6]': 8 }
console.log(adder(2, 6)) // 输出结果: 8                //cache: { '[2, 6]': 8 }
console.log(adder(10, 10)) // 输出结果: 开始缓存 20    // cache: { '[2, 6]': 8, '[10, 10]': 20 }
