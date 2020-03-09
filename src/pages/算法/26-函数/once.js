/**
 * 只调用一次的函数
 * @param {*} fn
 */
const once = fn => {
  let lock = false
  return function() {
    if (!lock) {
      lock = true
      fn.apply(this, arguments)
    }
  }
}
