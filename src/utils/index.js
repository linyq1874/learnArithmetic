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

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

module.exports = {
  getArr,
  timeTaken,
  isObject
}
