

Function.prototype.myBind = function(context = 'window', ...args){

    const fn = this;

    function F(...args2) {
        if(this instanceof F) {
            return new fn(...args, ...args2)
        }

        return fn.apply(context, args.concat(args2))
    }

    F.prototype = fn.prototype;

    return F;
}

// function Animal (name, color) {
//     this.name = name
//     this.color = color
// }
// Animal.prototype.say = function () {
//     return `I'm a ${this.color} ${this.name}`
// }
// const Cat = Animal.bind(null, 'cat')
// const cat = new Cat('white')
// console.log(cat.say())
// console.log('cat instanceof Cat', cat instanceof Cat);
// console.log('cat instanceof Animal', cat instanceof Animal);


// if (cat.say() === "I'm a white cat" && cat instanceof Cat && cat instanceof Animal) {
//     console.log('success')
// }

let value = 2;
let foo = {
    value: 1
};
function bar (name, age) {
    return {
        value: this.value,
        name: name,
        age: age
    }
};

console.log(bar.call(foo, "Jack", 20)); // 直接执行了函数
// {value: 1, name: "Jack", age: 20}

let bindFoo1 = bar.myBind(foo, "Jack", 20); // 返回一个函数
console.log(bindFoo1());
;
// {value: 1, name: "Jack", age: 20}

let bindFoo2 = bar.myBind(foo, "Jack"); // 返回一个函数
console.log(bindFoo2(20));
;
// {value: 1, name: "Jack", age: 20}


bar.prototype.friend = 'kevin';

let bindFoo = bar.bind(foo, 'Jack');
let obj = new bindFoo(20);
// undefined
// Jack
// 20
console.log('obj', obj);

obj.habit;
// shopping

obj.friend;
