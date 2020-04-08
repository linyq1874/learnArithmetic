function currying(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return (...args2) => currying(fn, ...args, ...args2)
  }
}

function add(a, b) {
  return a + b
}

const curryingFun = currying(add)
const addTen = curryingFun(10)

console.log(addTen(20))
console.log(addTen(10))

function getUrl(protocol, domain, path) {
  return protocol + '://' + domain + '/' + path
}

let conardliSite = currying(getUrl)('http', 'www.conardli.top')
let page1 = conardliSite('page1.html')
console.log(page1)
