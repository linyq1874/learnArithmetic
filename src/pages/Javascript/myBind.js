Function.prototype.myBind = function(context, ...args1) {
  if (typeof this !== 'function') {
    throw Error('error')
  }
  const fn = this
  function F(...args2) {
    // 判断是否用于构造函数
    if (this instanceof F) {
      return new fn(...args1, ...args2)
    }

    return fn.apply(context, args1.concat(args2))
  }
  /**
   * 绑定原型
   * 让new this绑定不丢失
   */
  F.prototype = this.prototype
  return F
}

function Animal(name, color) {
  this.name = name
  this.color = color
}
Animal.prototype.say = function() {
  return `I'm a ${this.color} ${this.name}`
}
console.log(cat.say())
console.log('cat instanceof Cat', cat instanceof Cat);
console.log('cat instanceof Animal', cat instanceof Animal);


if (cat.say() === "I'm a white cat" && cat instanceof Cat && cat instanceof Animal) {
  console.log('success')
}
