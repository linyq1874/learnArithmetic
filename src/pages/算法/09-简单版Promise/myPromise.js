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

  then(onFulled, onRejected) {
    onFulled = typeof onFulled === 'function' ? onFulled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : v => v

    if (this.state === PENDING) {
      this.onResolveCallback.push(onFulled)
      this.onRejectCallback.push(onRejected)
    }

    if (this.state === RESOLVE) {
      onFulled(this.value)
    }

    if (this.state === REJECTED) {
      onRejected(this.reason)
    }
  }
}

// console.log(12)
Promise.resolve(2).then(res => {
  console.log(res)
})

Promise.resolve(444)
  .then(() => 555)
  .then(666)
  .then(res => {
    console.log('then then', res)
  })
new MyPromise(res => {
  res(5)
})
  // .then(2)
  .then(res => {
    console.log('my...', res)
  })
