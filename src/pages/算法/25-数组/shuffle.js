// 洗牌算法
const { getArr } = require('../../../utils/index')

const shuffle = arr => {
  let len = arr.length

  while (len) {
    const m = (Math.random() * len--) >> 0
    ;[arr[len], arr[m]] = [arr[m], arr[len]]
  }

  return arr
}

const arr = getArr(5)
console.log('before:', arr)
console.log('after:', shuffle([...arr]))
