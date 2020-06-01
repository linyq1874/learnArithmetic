Function.prototype.myCall = function(context = window, ...args) {
  if (this === Function.prototype) {
    console.log('err')

    return undefined // 用于防止 Function.prototype.myCall() 直接调用
  }

  const fn = Symbol()

  context[fn] = this

  const result = context[fn](...args)
  delete context[fn]

  return result

  // return this(...args)
}

const frog = {
  name: 'frog',
  say(say) {
    console.log(this.name + say)
  }
}

const rabbit = {
  name: 'rabbit'
}

console.log('call')
frog.say.call(rabbit, ':hello')

console.log('myCall')
frog.say.myCall(rabbit, ':world')

Function.prototype.myCall(rabbit)
