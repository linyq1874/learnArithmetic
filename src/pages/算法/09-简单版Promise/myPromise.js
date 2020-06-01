/**
 * Promise 利用了三大技术手段来解决回调地狱:

    回调函数延迟绑定。
    返回值穿透。
    错误冒泡。

    1, 回调函数不是直接声明的，而是在通过后面的 then 方法传入的，即延迟传入。这就是回调函数延迟绑定。

    2,根据 then 中回调函数的传入值创建不同类型的Promise, 然后把返回的 Promise 穿透到外层, 以供后续的调用。这便是返回值穿透的效果。

    3,前面产生的错误会一直向后传递，被 catch 接收到，就不用频繁地检查错误了。
 */

const PENDING = 'pending',
  RESOLVE = 'resolve',
  REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.state = PENDING
    this.value = null
    this.reason = null

    this.onResolveCallback = []
    this.onRejectCallback = []

    const resolve = val => {
      if (this.state === PENDING) {
        this.state = RESOLVE
        this.value = val

        this.onResolveCallback.forEach(cb => cb(this.value))
      }
    }

    const reject = err => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = err

        this.onResolveCallback.forEach(cb => cb(this.reason))
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  /*
  resolvePromise 函数即为根据x 的值来决定bridgePromise的状态的函数
  也即标准中的[Promise Resolution Procedure](https://promisesaplus.com/#point-47)
  x为`bridgePromise = promise1.then(onResolved, onRejected)`里`onResolved/onRejected`的返回值
  `resolve`和`reject`实际上是`bridgePromise`的`executor`的两个实参，因为很难挂在其它的地方，所以一并传进来。
  相信各位一定可以对照标准把标准转换成代码，这里就只标出代码在标准中对应的位置，只在必要的地方做一些解释
*/
  _resolvePromise(bridgePromise, x, resolve, reject) {
    if (x instanceof MyPromise) {
      // 拆解这个 promise ，直到返回值不为 promise 为止
      // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的
      // 所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve
      if (x.state === PENDING) {
        x.then(
          res => {
            this._resolvePromise(bridgePromise, res, resolve, reject)
          },
          err => {
            reject(err)
          }
        )
      } else {
        x.then(resolve, reject)
      }
    } else {
      // 非 Promise 的话直接 resolve 即可
      // 但如果这个Promise的状态已经确定了，那么它肯定有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态
      resolve(x)
    }
  }

  then(onFulled, onRejected) {
    /**
     * 参数不传的情况做判断: 给默认值,实现透传
     * 返回值穿透以及错误穿透, 注意错误穿透用的是throw 而不是return，否则的话
     * 这个then 返回的promise 状态将变成resolved 即接下来的then 中的 onFulled
     * 会被调用, 然而我们想要调用的是onRejected
     * 如：Promise.resolve(4).then().catch().then(console.log)
     * 是方法则直接使用，不是则透传
     */
    onFulled = typeof onFulled === 'function' ? onFulled : v => v
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : error => {
            throw error
          }

    let bridgePromise

    if (this.state === PENDING) {
      return (bridgePromise = new MyPromise((resolve, reject) => {
        this.onResolveCallback.push(val => {
          try {
            let x = onFulled(val)
            this._resolvePromise(bridgePromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectCallback.push(val => {
          try {
            let x = onRejected(val)
            this._resolvePromise(bridgePromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }))
    }

    if (this.state === RESOLVE) {
      return (bridgePromise = new MyPromise((resolve, reject) => {
        try {
          /**
           * 当 onFulled = () => {}
           * 则 x === undefined
           */
          let x = onFulled(this.value)
          this._resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }))
    }
    if (this.state === REJECTED) {
      return (bridgePromise = new MyPromise((resolve, reject) => {
        try {
          let x = onRejected(this.reason)
          this._resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }))
    }
    // if (this.state === PENDING) {
    //   this.onResolveCallback.push(onFulled)
    //   this.onRejectCallback.push(onRejected)
    // }

    // if (this.state === RESOLVE) {
    //   onFulled(this.value)
    // }

    // if (this.state === REJECTED) {
    //   onRejected(this.reason)
    // }

    /**
     * return this 是类似jQuery 的链式调用
     * ! 这么写每次返回的都是第一个 Promise。then 函数当中返回的第二个 Promise 直接被无视了！
     */
    // return this
  }

  /**
   * 一旦其中有一个PENDING状态的 Promise 出现错误后状态必然会变为失败, 然后执行
   *  onRejected函数，而这个 onRejected 执行又会抛错，把新的 Promise 状态变为失败，
   * 新的 Promise 状态变为失败后又会执行onRejected......就这样一直抛下去，直到用
   * catch 捕获到这个错误，才停止往下抛。
   * 这就是 Promise 的错误冒泡机制。
   * @param {*} onRejected
   */
  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

// console.log(12)
// Promise.resolve(2).then(res => {
//   console.log(res)
// })

// Promise.resolve(444)
//   .then(() => 555)
//   .then(666)
//   .then(res => {
//     console.log('then then', res)
//   })
new Promise((res, rej) => {
  setTimeout(() => {
    rej(5)
  }, 100)
})
  .then(2)
  .then(res => {
    console.log('my1...', res)
    return new Promise(res => {
      res(21)
    })
  })
  .then(res => {
    console.log('my2...:', res)
    return 9
  })
  .then(res => {
    console.log('my3...', res)
  })
  .catch(err => {
    console.log('err', err)
  })

new MyPromise((res, rej) => {
  setTimeout(() => {
    rej(5)
  }, 100)
})
  .then(2)
  .then(res => {
    console.log('my1...', res)
    return new MyPromise(res => {
      res(21)
    })
  })
  .then(res => {
    console.log('my2...:', res)
    return 9
  })
  .then(res => {
    console.log('my3...', res)
  })
  .catch(err => {
    console.log('err', err)
  })

Promise.resolve(4)
  .then()
  .then(console.log)
Promise.resolve(4)
  .then({})
  .then(console.log)
Promise.resolve(4)
  .then(() => {})
  .then(console.log)
