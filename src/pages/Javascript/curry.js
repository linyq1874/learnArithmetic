// function currying(fn, ...args) {
//   if (args.length >= fn.length) {
//     return fn(...args)
//   } else {
//     return (...args2) => currying(fn, ...args, ...args2)
//   }
// }

// function add(a, b) {
//   return a + b
// }

// const curryingFun = currying(add)
// const addTen = curryingFun(10)

// console.log(addTen(20))
// console.log(addTen(10))

// function getUrl(protocol, domain, path) {
//   return protocol + '://' + domain + '/' + path
// }

// let conardliSite = currying(getUrl)('http', 'www.conardli.top')
// let page1 = conardliSite('page1.html')
// console.log(page1)

// function currying(fn) {
//   var allArgs = []

//   function next() {
//     var args = [].slice.call(arguments)
//     allArgs = allArgs.concat(args)
//     return next
//   }
//   // 字符类型
//   next.toString = function() {
//     return fn.apply(null, allArgs)
//   }
//   // 数值类型
//   next.valueOf = function() {
//     return fn.apply(null, allArgs)
//   }

//   return next
// }
// var add = currying(function() {
//   var sum = 0
//   for (var i = 0; i < arguments.length; i++) {
//     sum += arguments[i]
//   }
//   return sum
// })

// console.log('add(1)(2, 3)(4)(5):', add(1)(2, 3)(4))

// function currying(fn, ...args) {
//   if (args.length >= fn.length) {
//     return fn(...args)
//   } else {
//     return (...args2) => currying(fn, ...args, ...args2)
//   }
// }
// function myCurrying(fn) {
//   let allArgs = []

//   return function next(...args) {
//     allArgs = allArgs.concat(args)
//     console.log('allArgs', allArgs)

//     if (allArgs.length >= fn.length) {
//       return fn.apply(null, allArgs)
//     }

//     return next
//   }
// }

function myCurrying (fn, ...args) {
  if (args.length >= fn.length) return fn(...args)
  return (...args2) => myCurrying(fn, ...args, ...args2)
}

const add = myCurrying(function (a, b, c) {
  return a + b + c
})

const log = myCurrying(function (a, b, c) {
  console.log([a, b, c]);
})

console.log('1:', add(1)(2)(3))
console.log('2:', add(1, 2)(3))
console.log('3:', add(1)(2, 3))
console.log('4:', add(1, 2, 3))


log("a", "b", "c") // ["a", "b", "c"]
log("a", "b")("c") // ["a", "b", "c"]
log("a")("b")("c") // ["a", "b", "c"]
log("a")("b", "c") // ["a", "b", "c"]
