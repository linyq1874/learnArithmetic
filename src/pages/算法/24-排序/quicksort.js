function quickSort(arr, left, right) {
  if (left === undefined || right === undefined) {
    console.error('arguments errors')
    return
  }
  if (left > right) {
    return []
  }
  let i = left,
    j = right,
    p = arr[left]

  while (i < j) {
    // 正序>
    while (arr[j] >= p && i < j) {
      j--
    }
    while (arr[i] <= p && i < j) {
      i++
    }
    if (i < j) {
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  arr[left] = arr[i]
  arr[i] = p

  quickSort(arr, left, i - 1)
  quickSort(arr, i + 1, right)

  return arr
}

function quicksort2(arr) {
  if (!arr.length) return []
  const left = [],
    right = [],
    p = arr[0]

  for (let i = 1; i < arr.length; i++) {
    const t = arr[i]
    if (t <= p) {
      left.push(t)
    } else {
      right.push(t)
    }
  }

  return quicksort2(left).concat(p, quicksort2(right))
}

function getArr(length = 10) {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push((Math.random() * 100) >>> 0)
  }

  return result
}

const arr = getArr()
console.log('before:', arr)
const r = quickSort([...arr], 0, arr.length - 1)
console.log('after:', r)
console.log('after2', quicksort2([...arr]))

/**
 * 三路快排 arr = [2, 0, 2, 1, 1, 0] --> [0, 0, 1, 1, 2, 2]
 * 思路仍然是快排，确定基数，大的在右边，小的在左边。
 * 可用辅助变量-1， length
 * @param {*} arr
 */
function threeQuickSort(arr) {
  let left = -1,
    right = arr.length,
    i = 0

  while (i < right) {
    if (arr[i] === 0) {
      left++
      ;[arr[i], arr[left]] = [arr[left], arr[i]]
      i++
    } else if (arr[i] === 1) {
      i++
    } else {
      right--
      ;[arr[i], arr[right]] = [arr[right], arr[i]]
    }
  }

  return arr
}

const before = [2, 0, 2, 1, 1, 0]
const after = threeQuickSort(before)
console.log(after)

/**
 * 数组中查找第k大的元素
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 * @param {*} k
 */
function findKthNum(arr, left, right, k) {
  let i = left,
    j = right,
    p = arr[left]

  while (i < j) {
    // 倒序 <
    while (arr[j] <= p && i < j) {
      j--
    }
    while (arr[i] >= p && i < j) {
      i++
    }
    if (i < j) {
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  arr[left] = arr[i]
  arr[i] = p

  if (i < k) {
    findKthNum(arr, i + 1, right, k)
  } else if (i > k) {
    findKthNum(arr, left, i - 1, k)
  }

  return arr[k]
}

function findKthNum2(arr, k) {
  if (!arr.length || k > arr.length) return []
  const left = [],
    right = [],
    p = arr[0]

  for (let i = 1; i < arr.length; i++) {
    const t = arr[i]
    if (t > p) {
      left.push(t)
    } else {
      right.push(t)
    }
  }

  if (left.length >= k) {
    findKthNum2(left).concat(p, right)
  } else {
    left.concat(p, findKthNum2(right))
  }

  return arr[k]
}

const tArr = [2, 6, 1, 3]

console.log(findKthNum(tArr, 0, tArr.length - 1, 1))
console.log(findKthNum2(tArr, 1))
