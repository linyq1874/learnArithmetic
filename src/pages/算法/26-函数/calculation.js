/**
 * 高精度 四则运算
 */

const calc = (a, b) => {
  let l1, l2

  let sA = a.toString()
  let sB = b.toString()
  try {
    l1 = sA.split('.')[1].length
  } catch (error) {
    l1 = 0
  }

  try {
    l2 = sB.split('.')[1].length
  } catch (error) {
    l2 = 0
  }

  let newA = Number(sA.replace('.', ''))
  let newB = Number(sB.replace('.', ''))

  const sum = 10 ** (l1 + l2)
  const powA = 10 ** l1
  const powB = 10 ** l2

  return {
    mul: (newA * newB) / sum,
    div: (newA * powB) / (newB * powA),
    add: (newA * powB + newB * powA) / sum,
    sub: (newA * powB - newB * powA) / sum
  }
}

console.log(calc('1.2', 1.5).mul)
console.log(calc(0.1, 0.2).div)
console.log(calc(0.1, 0.2).add)
console.log(calc(1.2, 1.5).sub)

/**
 * 大整数相加
 * @param {String} num1
 * @param {String} num2
 * @returns {String}
 */
const add = (num1, num2) => {
  let res = ''
  let len1 = num1.length - 1
  let len2 = num2.length - 1
  let c = 0
  while (len1 >= 0 || len2 >= 0) {
    let sum = c
    if (len1 >= 0) {
      sum += +num1[len1--]
    }
    if (len2 >= 0) {
      sum += +num2[len2--]
    }

    res = (sum % 10) + res
    c = (sum / 10) >> 0
  }

  return c ? c + res : res
}

console.log('add', add('83', '670'))

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

console.log('multiply', multiply('3', '83'))
