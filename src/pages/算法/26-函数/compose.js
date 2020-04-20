/**
 * 组合函数
 */

const compose = (a, b) => (...args) => a(b(...args))

const toUpper = x => x.toUpperCase()
const addSymbol = x => x + '!'

const g = compose(
  addSymbol,
  toUpper,
  addSymbol
)

console.log(g('hello world'))

const superCompose = (...funcs) => {
  const len = funcs.length

  if (len === 0) {
    return args => args
  } else if (len === 1) {
    return funcs[0]
  } else {
    return funcs.reduce((prev, cur) => (...args) => prev(cur(...args)))
  }
}

const g2 = superCompose(addSymbol, toUpper, addSymbol)
console.log(g2('hello world'))
