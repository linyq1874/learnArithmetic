function unique1(arr) {
  const map = new Map()
  return arr.filter(item => {
    if (map.has(item)) {
      return false
    }

    map.set(item, true)
    return true
  })
}

function unique2(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index)
}

const arr = [1, '1', 2, 2, '2', '2']

console.log(unique1([...arr]))
console.log(unique2([...arr]))
