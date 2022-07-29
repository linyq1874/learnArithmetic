
Function.prototype.myCall = function(context = 'window', ...args) {
    if(typeof this !== 'function') {
        throw new Error('error')
    }

    const fn = Symbol('fn');

    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result
}

const frog = {
    name: 'frog',
    sayName(){
        console.log('name:', this.name)
    }
}

const rabbit = {
    name: 'rabbit'
}

frog.sayName.call(rabbit)
frog.sayName.myCall(rabbit)
