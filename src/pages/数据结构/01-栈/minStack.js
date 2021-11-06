/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = []
  this.minStack = []
  this.top = -1
}

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  if (this.top < 0) {
    this.minStack.push(x)
  } else {
    const min = this.getMin()
    this.minStack.push(Math.min(x, min))
  }

  this.stack.push(x)
  this.top++
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.stack.pop()
  this.minStack.pop()
  this.top--
}

/**
 * @return {number}
 */
MinStack.prototype.peek = function() {
  console.log('top...', this.top)
  return this.stack[this.top]
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.minStack[this.top]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

const stack = new MinStack()

function getRandom(r = 10) {
  return Math.random() * r >> 0
}

for(let i = 0; i < 10; i ++) {
  stack.push(getRandom())
}
console.log('stack', stack);
const r = stack.peek();

console.log(r)
console.log(stack.getMin())
