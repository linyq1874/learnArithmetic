// 检测数值出现的次数

const countOccurrences = (arr, val) => arr.reduce((prev, cur) => (cur === val ? prev + 1 : prev), 0)

const arr = [1, 1, 1, 3, 5]

console.log(countOccurrences(arr, 1))
