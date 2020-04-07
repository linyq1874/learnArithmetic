/**
 * param1, ..., paramN 可选
附加参数，一旦定时器到期，它们会作为参数传递给function
 * @param {*} fn
 * @param  {...any} args
 */
const defer = (fn, ...args) => setTimeout(fn, 1, ...args)

defer(console.log, 'a')

console.log('b')
