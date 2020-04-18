Function.prototype.myApply = function(context = window, ...args) {
  if (this === Function.prototype) {
    console.error('err')

    return undefined // 用于防止 Function.prototype.myApply() 直接调用
  }

  const fn = Symbol()
  context[fn] = this
  let result
  if (Array.isArray(args)) {
    result = context[fn](...args)
  } else {
    result = context[fn]()
  }

  delete context[fn]

  return result
}

const frog = {
  name: 'frog',
  say() {
    console.log(`my name is ${this.name}`)
  }
}

const rabbit = {
  name: 'rabbit'
}

frog.say.myApply(rabbit)

Function.prototype.myApply(rabbit)
