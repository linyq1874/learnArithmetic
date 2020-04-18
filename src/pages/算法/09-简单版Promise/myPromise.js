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

  _resolvePromise(bridgePromise, x, resolve, reject) {
    if (x instanceof MyPromise) {
      // 拆解这个 promise ，直到返回值不为 promise 为止
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
      resolve(x)
    }
  }

  then(onFulled, onRejected) {
    // 参数不传的情况做判断: 给默认值
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
