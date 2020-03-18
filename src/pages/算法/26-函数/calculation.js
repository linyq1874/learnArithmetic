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
