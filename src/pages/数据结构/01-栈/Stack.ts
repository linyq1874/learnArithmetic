class Stack {
  public size: number;
  public stack: number[] = [];

  constructor(stack?:number[]) {
    this.stack = stack || [];
    this.size = this.stack.length;
  }

  empty(){
    return !this.size;
  }

  push(item: number){
    this.stack.push(item)
    this.size++;
  }

  pop() {
    if(this.empty()) {
      return null;
    }
    this.size--;
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.size - 1]
  }
}

export default Stack;
