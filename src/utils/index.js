function getArr(length = 10) {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push((Math.random() * 100) >> 0)
  }

  return result
}

module.exports = {
  getArr
}
