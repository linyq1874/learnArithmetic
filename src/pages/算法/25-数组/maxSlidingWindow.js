/**
 * 滑动窗口最大值
给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。
 */

//  方法一：
const maxSlidingWindow = (nums, k) => {
  if (nums.length === 0 || !k) return []

  if (k > nums.length) return [Math.max(...nums)]

  let window = [],
    res = []

  nums.forEach((num, index) => {
    if (window.length && num > window[0]) window.pop()

    if (!window.length) window.push(num)
    if (index + 1 >= k) {
      res.push(window[0])
    }
  })

  return res
}
// 方法二：
const maxSlidingWindow2 = (nums, k) => {
  if (nums.length === 0 || !k) return []

  if (k > nums.length) return [Math.max(...nums)]

  let max = nums[0],
    res = []

  nums.forEach((num, index) => {
    max = Math.max(max, num)

    if (index + 1 >= k) {
      res.push(max)
    }
  })

  return res
}

const nums = [1, 3, -1, -3, 5, 3, 6, 7]
const k = 20

console.log(maxSlidingWindow(nums, k))
console.log(maxSlidingWindow2(nums, 3))
