class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  addNode(val) {
    this.root = this._addNode(this.root, val)
  }

  _addNode(node, val) {
    if (!node) {
      return new Node(val)
    }
    if (val <= node.val) {
      node.left = this._addNode(node.left, val)
    }
    if (val > node.val) {
      node.right = this._addNode(node.right, val)
    }

    return node
  }

  prevTravel() {
    const result = this._prevTravel(this.root)
    console.log('prevTravel:', result);
    console.log('非递归');
    this.$prevTravel(this.root)
  }

  _prevTravel(node, result = []) {
    if (node) {
      // console.log(`${node.val} ->`)
      result.push(node.val)
      this._prevTravel(node.left, result)
      this._prevTravel(node.right, result)
    }
    return result
  }

  /**
   * 非递归
   * 取跟节点为目标节点， 开始遍历
   1. 访问目标节点
   2. 左孩子入栈 - > 直至左孩子为空的节点
   3. 节点出栈， 以右孩子为目标节点， 再依次执行1、 2、 3
   * @param {*} node
   */
  $prevTravel(node) {
    const result = []
    const stack = []
    let current = node
    while (current || stack.length) {
      while (current) {
        result.push(current.val)
        stack.push(current)
        current = current.left
      }
      current = stack.pop()
      current = current.right
    }

    // return result
    console.log(result)
  }

  midTravel() {
    const result = this._midTravel(this.root)
    console.log('midTravel:', result);
    console.log('非递归');
    this.$midTravel(this.root)
  }

  _midTravel(node, result = []) {
    if (node) {
      this._midTravel(node.left, result)
      // console.log(`${node.val} ->`)
      result.push(node.val)
      this._midTravel(node.right, result)
    }
    return result
  }

  /**
   * 非递归
   * 取跟节点为目标节点， 开始遍历
   1. 左孩子入栈 - > 直至左孩子为空的节点
   2. 节点出栈 - > 访问该节点
   3. 以右孩子为目标节点， 再依次执行1、 2、 3
   * @param {*} node
   */
  $midTravel(node) {
    const result = []
    const stack = []
    let current = node
    while (current || stack.length) {
      while (current) {
        stack.push(current)
        current = current.left
      }
      current = stack.pop()
      result.push(current.val)
      current = current.right
    }

    console.log(result)

    // return result
  }

  nextTravel() {
    console.log('nextTravel:');
    const result = this._nextTravel(this.root)
    console.log(result);

  }

  _nextTravel(node, result = []) {
    if (node) {
      this._nextTravel(node.left, result)
      this._nextTravel(node.right, result)
      // console.log(node.val);
      result.push(node.val)
    }

    // console.log(result);
    return result
  }
}

const tree = new Tree();

const len = 5;

for (let i = 0; i < len; i++) {
  tree.addNode(Math.ceil(Math.random() * 100))
}

tree.prevTravel()
tree.midTravel()
tree.nextTravel()