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

/**
 * a(b(...args)) => compose(a, b)
 * @param {*} params
 */
const myCompose = (a, b) => (...args) => a(b(...args))

const mySuperCompose = (...funcs) => {
  const len = funcs.length

  if (!len) return args => args
  if (len === 1) return funcs[0]

  return funcs.reduce((prev, cur) => (...args) => prev(cur(...args)))
}

const g3 = myCompose(addSymbol, toUpper)

console.log('g3', g3('hello world'))

const g4 = mySuperCompose(console.log, addSymbol, toUpper)
g4('hello world')

const otherCompose = (...func) => (...args) => {
  let i = func.length - 1
  if (i < 0) return args
  let result = func[i].apply(null, args)

  while (--i >= 0) {
    result = func[i](result)
  }

  return result
}

const g5 = otherCompose(console.log, addSymbol, addSymbol, toUpper)

g5('hello world')
