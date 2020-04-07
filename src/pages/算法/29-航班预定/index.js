/**
 * 题目描述
这里有 n 个航班，它们分别从 1 到 n 进行编号。
我们这儿有一份航班预订表，表中第 i 条预订记录 bookings[i] = [i, j, k] 意味着我们在从 i 到 j 的每个航班上预订了 k 个座位。
请你返回一个长度为 n 的数组 answer，按航班编号顺序返回每个航班上预订的座位数。
实例：

输入：bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
输出：[10,55,45,25,25]
 */

/**
 * 将问题转换为：
 * 某公交车共有n站，第i条记录 bookings[i] = [i, j, k] 表示在 i站上车 k人，
 * 乘坐到j站，在j+1站下车，需要按照车站顺序返回每一站车上的人数
 * 根据1的思路，定义counter[]数组记录每站的人数变化，counter[i]表示第i+1站。
 * 遍历bookings[]：bookings[i] = [i, j, k]表示在 i站增加 k人即 counters[i-1] += k，
 * 在j+1站减少k人即 counters[j] -= k
 * 遍历（整理）counter[]数组，得到每站总人数： 每站的人数为前一站人数加上当前人数变化counters[i] += counters[i - 1]
 */
const { timeTaken } = require('../../../utils/index')
const bookings = [[1, 2, 10], [2, 3, 20], [2, 5, 25]],
  n = 5

function getAnswer(bookings, n) {
  const result = new Array(n).fill(0)

  for (let i = 0; i < bookings.length; i++) {
    const [first, end, value] = bookings[i]
    result[first - 1] += value

    //请注意这里不能改n的值 所以当e = 5时 并不用继续处理
    if (end < n) {
      result[end] -= value
    }
  }

  for (let i = 1; i < n; i++) {
    result[i] += result[i - 1]
  }

  return result
}

const result = getAnswer(bookings, n)
console.log(result)

timeTaken(() => {
  getAnswer(bookings, n)
})
