/**
 * 滑动窗口最大值
给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。
 */

//  方法一：
const maxSlidingWindow = (nums, k) => {
  // 异常处理
  if (nums.length === 0 || !k) return []
  let window = [],
    res = []
  for (let i = 0; i < nums.length; i++) {
    // 先把滑动窗口之外的踢出
    if (window[0] !== undefined && window[0] <= i - k) window.shift()
    // 保证队首是最大的
    while (nums[window[window.length - 1]] <= nums[i]) window.pop()
    window.push(i)
    if (i >= k - 1) res.push(nums[window[0]])
  }
  return res
}

const nums = [1, 3, -1, -3, 5, 3, 6, 7]
const k = 20

console.log(maxSlidingWindow(nums, k))
