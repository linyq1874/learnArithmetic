/**
 * 数组扁平化
 */
const arr = [1, [2], [3, [4, [5]]]]

const flatten = arr => arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flatten(cur) : cur), [])

console.log('flatten', flatten(arr))

const flatten2 = arr => [].concat(...arr.map(v => (Array.isArray(v) ? flatten2(v) : v)))

console.log('flatten2', flatten2(arr))

/**
 * 指定深度的数组扁平化
 */

const depthFlatten = (arr, depth = 1) => arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) && depth > 1 ? depthFlatten(cur, depth - 1) : cur), [])

console.log('depthFlatten', depthFlatten(arr))

const depthFlatten2 = (arr, depth = 1) => [].concat(...arr.map(v => (Array.isArray(v) && depth > 1 ? depthFlatten2(v, depth - 1) : v)))

console.log('depthFlatten2', depthFlatten2(arr))
