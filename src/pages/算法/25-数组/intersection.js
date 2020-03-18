// 两数组的交集

const intersection = (a, b) => {
  const s = new Set(b)

  return a.filter(v => s.has(v))
}

const nums1 = [3, 1, 2],
  nums2 = [1, 1]

const a = [1, 3, 4, 6]
const b = [1, 2, 5, 6]

console.log(intersection(nums2, nums1))

// 符合条件的两数组的交集

const intersectionWith = (a, b, fn) => {
  const s = new Set(b.map(fn))

  return a.filter(v => s.has(fn(v)))
}

const c = [2.1, 5.4]
const d = [2.5, 4.6]

console.log(intersectionWith(c, d, Math.floor))

const intersect = (a, b) => {
  const hash = new Map()
  const result = []
  for (let i = 0, len = a.length; i < len; i++) {
    const t = a[i]
    if (hash.has(t)) {
      hash.set(t, hash.get(t) + 1)
    } else {
      hash.set(t, 1)
    }
  }

  for (let i = 0, len = b.length; i < len; i++) {
    const t = b[i]
    let l = hash.get(t)

    if (l > 1) {
      result.push(t)

      hash.set(t, l - 1)
    } else if (l === 1) {
      result.push(t)

      hash.delete(t)
    }
  }

  return result
}

console.log(intersect(nums2, nums1))
