/**
 * 使用两个队列来实现栈
 */

class MyStack {

    constructor(){
        this.q1 = [];
        this.q2 = [];
    }

    push(x) {
        this.q1.push(x)
    }

    pop() {
        if (!this.q1.length) {
            [this.q1, this.q2] = [this.q2, this.q1];
        }

        while (this.q1.length > 1) {
            this.q2.push(this.q1.shift())
        }

        return this.q1.shift()
    }

    top() {
        const x = this.pop();
        this.q1.push(x);

        return x;
    }

    empty() {
        return !this.q1.length && !this.q2.length
    }
}

class MyStack2 {
    constructor(){
        this.q = []
    }

    push(x) {
        this.q.push(x)
    }

    pop() {
        let size = this.q.length;
        while (size-- > 1) {
            this.q.push(this.q.shift())
        }
        return this.q.shift()
    }

    top(){
        const x = this.pop();
        this.q.push(x);
        return x
    }

    empty(){
        return !this.q.length
    }
}

// const myStack = new MyStack();
const myStack = new MyStack2();
// myStack.push(1);
console.log('myStack', myStack.push(1));

// myStack.push(2);
console.log('myStack', myStack.push(2));

const t = myStack.top(); // 返回 2
console.log('t', t);

const p = myStack.pop(); // 返回 2
console.log('p', p);

myStack.empty(); // 返回 False


class MyQueue {
    constructor(){
        this.s1 = [];
        this.s2 = [];
    }

    push(x) {
        this.s1.push(x)
    }

    pop() {
        if(!this.s2.length) {
            while (this.s1.length) {
                this.s2.push(this.s1.pop())
            }
        }

        return this.s2.pop()
    }

    top(){
        const x = this.pop();
        this.s2.push(x);
        return x
    }

    empty() {
        return !this.s1.length && !this.s2.length
    }
}


const q = new MyQueue();

q.push(1)
console.log('q', q);

q.push(2)
console.log('q', q);

console.log('q.pop()', q.pop());

q.push(3)
console.log('q', q);

q.top()
console.log('q.top()', q.top());

console.log('q.empty()', q.empty());
