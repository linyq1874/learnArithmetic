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

// const arr = getArr(5)
arr = [95, 52, 33, 50, 11]
console.log('before:', arr)
console.log('after:', shuffle([...arr]))
