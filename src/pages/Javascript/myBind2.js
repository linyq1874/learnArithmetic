Function.prototype.myBind = function(context, ...arg1) {
    if(typeof this !== 'function') {
        throw new Error('err')
    }
    const fn = this;
    function F(...arg2) {
        if(this instanceof F) {
          return  new fn(...arg1, ...arg2)
        }

        return fn.apply(context, arg1.concat(arg2))
    }

    F.prototype = fn.prototype;

    return F;
}

function Animal (name, color) {
    this.name = name
    this.color = color
}
Animal.prototype.say = function () {
    return `I'm a ${this.color} ${this.name}`
}
const Cat = Animal.myBind(null, 'cat')
const cat = new Cat('white')

console.log('cat', cat, cat instanceof Cat, cat instanceof Animal);
