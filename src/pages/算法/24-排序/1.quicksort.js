function quickSort(arr, left, right) {
  if (left === undefined || right === undefined) {
    console.error('arguments errors')
    return
  }
  if (left >= right) {
    return null
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

// 三路快排 arr = [2, 0, 2, 1, 1, 0] --> [0, 0, 1, 1, 2, 2]
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

const tArr = [2, 6, 1, 3]

console.log(findKthNum(tArr, 0, tArr.length - 1, 0))
