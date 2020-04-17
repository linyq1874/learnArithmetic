/**
 * node 的setTimeout，默认延迟时间是0，但是node能够实现的最低时间是1ms
 * 所以 setTimeout(fn) === setTimeout(fn, 0) === setTimeout(fn, 1)
 *
 * timer 阶段中，当进入事件循环时的准备时间大于1ms，则会执行setTimeout，然后在check 阶段执行setImmediate
 * 如果准备的时间小于1ms，setTimeout来不及执行回调，则会进入下一个阶段，即先执行check 阶段的阶段执行setImmediate，再下一个循环中，执行timer阶段的回调
 */

setTimeout(function timeout() {
  console.log('timeout')
}, 0)
setImmediate(function immediate() {
  console.log('immediate')
})

/**
 * io阶段
 * 在poll（轮询）阶段执行
 * 此时没有timer，回调队列不为空，看到有immediate，直接进入check阶段执行
 * 所以 setImmediate 会先执行
 */
console.log(__filename, __dirname)
const fs = require('fs')
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  setImmediate(() => {
    console.log('immediate')
  })
})
