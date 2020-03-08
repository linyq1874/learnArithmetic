// 两数组的交集

const intersection = (a, b) => {
  const s = new Set(b)

  return a.filter(v => s.has(v))
}

const a = [1, 3, 4, 6]
const b = [1, 2, 5, 6]

console.log(intersection(a, b))

// 符合条件的两数组的交集

const intersectionWith = (a, b, fn) => {
  const s = new Set(b.map(fn))

  return a.filter(v => s.has(fn(v)))
}

const c = [2.1, 5.4]
const d = [2.5, 4.6]

console.log(intersectionWith(c, d, Math.floor))
