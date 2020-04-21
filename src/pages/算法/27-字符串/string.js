const leftRotation = (str, k) => {
  if (str && k != null) {
    return str.repeat(2).substr(k, str.length)
  }

  return ''
}

const str = 'abcdefg'

console.log(leftRotation(str, 2))

const isIsomorphic = function(s, t) {
  return isEqual(getHash(s), getHash(t))
}

function getHash(target) {
  let hash = new Map()

  for (let i = 0; i < target.length; i++) {
    if (!hash.has(target[i])) {
      hash.set(target[i], [1, [i]])
    } else {
      const t = hash.get(target[i])
      t[0] += 1
      t[1].push(i)

      hash.set(target[i], t)
    }
  }

  return hash
}

function isEqual(a, b) {
  const valuesA = [...a.values()]
  const valuesB = [...b.values()]

  console.log(valuesA)

  return valuesA.every(([countA, posA], index) => {
    const [countB, posB] = valuesB[index]

    if (countA !== countB) return false

    return posA.every((item, innerIndex) => item === posB[innerIndex])
  })
}

console.log(isIsomorphic('aa', 'ab'))

var isAnagram = function(s, t) {
  const hash = Object.create(null)
  if (s.length !== t.length) return false
  for (let i = 0; i < s.length; i++) {
    if (!hash[s[i]]) {
      hash[s[i]] = 1
    } else {
      hash[s[i]]++
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (!hash[t[i]]) {
      return false
    } else {
      hash[t[i]]--
    }
  }

  return true
}

console.log('isAnagram', isAnagram('anagram', 'nagaram'))

/**
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function(num) {
  if (num < 1) return false
  while (num > 1) {
    if (isEqual(num, 2)) {
      num /= 2
    } else if (isEqual(num, 3)) {
      num /= 3
    } else if (isEqual(num, 5)) {
      num /= 5
    } else {
      return false
    }
  }

  return true
}

function isEqual(num, k) {
  const div = num / k
  return div === div >> 0
}

console.log('isUgly', isUgly(14))

/**
 * 输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,
 * 则打印出由字符a,b,c 所能排列出来的所有字符串abc,acb,bac,bca,cab和 cba。
 */

function Permutation(str) {
  const result = []
  let queue
  if (str) {
    queue = str.split('')
    PermutationCore(queue, result)
  }
  result.sort()
  return [...new Set(result)]
}

function PermutationCore(queue, result, temp = '', current = '') {
  current += temp
  if (queue.length === 0) {
    result.push(current)
    return
  }
  for (let i = 0; i < queue.length; i++) {
    temp = queue.shift()
    PermutationCore(queue, result, temp, current)
    queue.push(temp)
  }
}

console.log('Permutation', Permutation('abc'))

/**
 * 给定无序、不重复的数组data，取出 n 个数，使其相加和为sum
 */

function getAllCombine(data, n, sum, temp) {
  if (temp.length === n) {
    if (temp.reduce((a, b) => a + b) === sum) {
      return temp
    }
    return null
  }

  for (let i = 0; i < data.length; i++) {
    const current = data.shift()
    temp.push(current)

    const result = getAllCombine(data, n, sum, temp)
    if (result) {
      return result
    }

    temp.pop()
    data.push(current)
  }

  return []
}

console.log('getAllCombine', getAllCombine([2, 3, 4, 1, 5], 3, 6, []))

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left > right) return []

  const t = arr[left]
  let i = left,
    j = right
  while (i < j) {
    while (i < j && arr[j] >= t) {
      j--
    }
    while (i < j && arr[i] <= t) {
      i++
    }

    if (i < j) {
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  arr[left] = arr[i]
  arr[i] = t

  quickSort(arr, left, i - 1)
  quickSort(arr, i + 1, right)

  return arr
}

const a = [1, 2, 9, 7, 7]
console.time('quickSort')
console.log('quickSort', quickSort([...a]))
console.timeEnd('quickSort')
function quickSort2(arr) {
  if (!arr.length) return []
  const minList = [],
    maxList = [],
    p = arr[0]

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > p) {
      maxList.push(arr[i])
    } else {
      minList.push(arr[i])
    }
  }

  return quickSort2(minList).concat(p, quickSort2(maxList))
}
console.time('quickSort2')
console.log('quickSort2', quickSort2([...a]))
console.timeEnd('quickSort2')

function mergeSort(arr) {
  let len = arr.length
  if (len < 2) return arr
  const mid = len >> 1
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const result = []

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  // 还剩下数组时，直接连接起来
  return result.concat(left.length ? left : right)
}

console.time('mergeSort')
console.log('mergeSort', mergeSort([...a]))
console.timeEnd('mergeSort')

// node event loop
// setTimeout(() => {
//   console.log('timer1')

//   Promise.resolve().then(function() {
//     console.log('promise1')
//   })
// }, 0)

// setTimeout(() => {
//   console.log('timer2')

//   Promise.resolve().then(function() {
//     console.log('promise2')
//   })
// }, 0)

// Promise.resolve().then(function() {
//   console.log('promise3')
// })

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
  const len = nums.length
  if (len < 2) return

  for (let i = len - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      for (let j = len - 1; j > i; j--) {
        if (nums[i] < nums[j]) {
          ;[nums[i], nums[j]] = [nums[j], nums[i]]
          break
        }
      }

      let x = i + 1,
        y = len - 1
      while (x < y) {
        ;[nums[x++], nums[y--]] = [nums[y], nums[x]]
      }
      break
    }
    if (i === 0) {
      let x = 0,
        y = len - 1
      while (x < y) {
        ;[nums[x++], nums[y--]] = [nums[y], nums[x]]
      }
    }
  }

  console.log(nums)
}

nextPermutation([4, 6, 5, 3])

/**
 * 大整数相加
 * @param {String} num1
 * @param {String} num2
 * @returns {String}
 */
const add = (num1, num2) => {
  let res = [],
    len1 = num1.length - 1,
    len2 = num2.length - 1,
    c = 0

  while (len1 >= 0 || len2 >= 0) {
    let sum = +c

    if (len1 >= 0) {
      sum += +num1[len1--]
    }

    if (len2 >= 0) {
      sum += +num2[len2--]
    }

    res.unshift(sum % 10)
    c = (res / 10) >> 0
  }

  return res.join('')
}

console.log('add', add('23784678091370408971329048718239749083', '3782647863278468012934670'))

const multiply = (num1, num2) => {
  num1 = num1.split('').reverse()
  num2 = num2.split('').reverse()

  const res = []

  for (let i = 0; i < num1.length; i++) {
    for (let j = 0; j < num2.length; j++) {
      res[i + j] = res[i + j] || 0

      res[i + j] += num1[i] * num2[j]
    }
  }

  let temp
  for (let i = 0; i < res.length; i++) {
    if (res[i] > 9) {
      temp = (res[i] / 10) >> 0
      res[i] %= 10
      res[i + 1] = res[i + 1] || 0
      res[i + 1] += temp
    }
  }

  return res.reverse().join('')
}

console.log(
  'multiply',
  multiply(
    '23784678091370408971329048718239749083237846780913704089713290487182397490832378467809137040897132904871823974908323784678091370408971329048718239749083',
    '3782647863278468012934670237846780913704089713290487182397490832378467809137040897132904871823974908323784678091370408971329048718239749083'
  )
)

/**
 * 0 -> A
 * ...
 * 25 -> Z
 * 26 -> AA
 * ...
 */

const convert = n => {
  let res = ''

  n++
  while (n) {
    let rest = n % 26
    n = (n / 26) >> 0
    if (rest === 0) {
      rest = 26
      n--
    }

    res = String.fromCharCode(rest + 64) + res
  }

  return res
}

console.log(convert(18277))
