/**
 * 归并排序的处理过程是由下而上的，先处理子问题，然后再合并。
 * 而快排正好相反，它的处理过程是由上而下的，先分区，然后再处理子问题。
 * 归并排序虽然是稳定的、时间复杂度为 O(nlogn) 的排序算法，但是它是非原地排序算法。
 * 归并之所以是非原地排序算法，主要原因是合并函数无法在原地执行。
 * 快速排序通过设计巧妙的原地分区函数，可以实现原地排序，解决了归并排序占用太多内存的问题。
 */

/**
 * 归并排序
 * 排序一个数组，我们先把数组从中间分成前后两部分，然后对前后两部分分别排序，
 * 再将排好序的两部分合并在一起，这样整个数组就都有序了
 * @param {*} arr
 */

function mergeSort(arr) {
  let len = arr.length
  if (len < 2) {
    return arr
  }

  let mid = len >> 1,
    left = arr.slice(0, mid),
    right = arr.slice(mid, len)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let result = []

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

function getArr(length = 10) {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push((Math.random() * 100) >>> 0)
  }

  return result
}

const arr = getArr()
console.log('before:', arr)
const r = mergeSort([...arr])
console.log('after:', r)
