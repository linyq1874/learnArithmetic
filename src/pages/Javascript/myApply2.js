

Function.prototype.myApply = function(context = 'window', args){
    const fn = Symbol()

    context[fn] = this;
    const res = context[fn](args);

    delete context[fn]
    return res;

}


const frog = {
    name: 'frog',
    sayName () {
        console.log('name:', this.name)
    }
}

const rabbit = {
    name: 'rabbit'
}

frog.sayName.myApply(rabbit)
