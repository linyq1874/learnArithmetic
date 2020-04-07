const arr = [3, 32, 321]

/**
 * 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。
 */

const getMinArray = arr => (!arr || !arr.length ? '' : arr.sort(compareFn).join(''))

const compareFn = (a, b) => {
  let front = '' + a + b
  let behind = '' + b + a
  return front - behind
}

console.log('getMinArray', getMinArray(arr))

/**
 * 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分
 *
 * 思路：快排的思路
 */

const reOrderArray = arr => {
  if (Array.isArray(arr)) {
    let left = 0,
      right = arr.length - 1

    while (left < right) {
      while (arr[left] & 1 && left < right) {
        left++
      }
      while (!(arr[right] & 1) && left < right) {
        right--
      }
      ;[arr[left], arr[right]] = [arr[right], arr[left]]
    }
  }

  return arr
}

console.log('reOrderArray', reOrderArray([...arr]))

/**
 * 输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值，要求时间复杂度为O(n)

例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)
 */

const getContinuousMaxNumber = arr => {
  if (Array.isArray(arr) && arr.length) {
    let sum = arr[0],
      max = arr[0]

    for (let i = 1; i < arr.length; i++) {
      // 1.从数组第二个数开始，若 sum<0 则当前的sum不再对后面的累加有贡献，sum = 当前数
      if (sum < 0) {
        sum = arr[i]
      }
      // 2.若 sum>0 则sum = sum + 当前数
      else {
        sum += arr[i]
      }

      max = Math.max(max, sum)
    }

    return max
  }

  return null
}

const arr1 = [6, -3, -2, 7, -15, 1, 2, 2]

console.log('getContinuousMaxNumber:', getContinuousMaxNumber(arr1))

/**
 * ! 两数之和
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

 * !思路：使用一个map将遍历过的数字存起来，值作为key，下标作为值。
 */

const twoSum = (nums, target) => {
  const map = {}

  if (Array.isArray(nums)) {
    for (let i = 0; i < nums.length; i++) {
      if (map[target - nums[i]] != null) {
        return [map[target - nums[i]], i]
      } else {
        map[nums[i]] = i
      }
    }
  }

  return []
}

/**
 * 给定一个包含 n 个整数的数组nums，判断 nums 中是否存在三个元素a，b，c ，
 * 使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
 * ! 注意去重

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
 * @param {*} nums
 */
const threeSum = nums => {
  const result = []

  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i++) {
    if (i && nums[i] === nums[i - 1]) continue

    let left = i + 1,
      right = nums.length - 1

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]

      if (sum < 0) {
        left++
      } else if (sum > 0) {
        right--
      } else {
        result.push([nums[i], nums[left++], nums[right--]])

        while (nums[left] === nums[left - 1]) {
          left++
        }

        while (nums[right] === nums[right + 1]) {
          right--
        }
      }
    }
  }

  return result
}

const arr2 = [-1, 0, 1, 2, -1, -4]

console.log('threeSum:', threeSum(arr2))

// 数组生成10个数
const arr10_1 = Array.from({ length: 10 }, () => 1)

const arr10_2 = Array.apply(null, { length: 10 }).map(() => 1)

console.log(arr10_1, arr10_2)
