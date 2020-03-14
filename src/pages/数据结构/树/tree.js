class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor() {
    this.root = null
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
    console.log('prevTravel:', result)
    console.log('非递归')
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
    console.log('midTravel:', result)
    console.log('非递归')
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
    console.log('nextTravel:')
    const result = this._nextTravel(this.root)
    console.log(result)
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

  levelTravel() {
    let root = this.root,
      level = 0,
      queen = [],
      result = []
    if (!root) return []
    queen.push(root)

    while (queen.length) {
      let size = queen.length
      result.push([])

      while (size--) {
        const node = queen.shift()
        result[level].push(node.val)

        node.left && queen.push(node.left)
        node.right && queen.push(node.right)
      }

      level++
    }

    return result
  }
  levelTravelReverse() {
    let root = this.root,
      level = 0,
      queen = [],
      result = []
    if (!root) return []
    queen.push(root)

    while (queen.length) {
      let size = queen.length
      result.push([])

      while (size--) {
        const node = queen.shift()
        result[level].push(node.val)

        node.left && queen.push(node.left)
        node.right && queen.push(node.right)
      }
      if (level & 1) result[level].reverse()
      level++
    }

    return result
  }

  leftView() {
    let root = this.root,
      result = [],
      queen = []

    if (!root) return []
    queen.push(root)

    while (queen.length) {
      let size = queen.length
      result.push(queen[0].val)

      while (size--) {
        const node = queen.shift()

        node.left && queen.push(node.left)
        node.right && queen.push(node.right)
      }
    }

    return result
  }
  rightView() {
    let root = this.root,
      result = [],
      queen = []

    if (!root) return []
    queen.push(root)

    while (queen.length) {
      let size = queen.length
      result.push(queen[0].val)

      while (size--) {
        const node = queen.shift()

        // 右视图先放右节点
        node.right && queen.push(node.right)
        node.left && queen.push(node.left)
      }
    }

    return result
  }

  // 最大深度也可以用层序遍历的level获取
  maxDepth() {
    return this._maxDepth(this.root)
  }

  _maxDepth(node) {
    if (!node) return 0
    return Math.max(this._maxDepth(node.left), this._maxDepth(node.right)) + 1
  }

  minDepth() {
    return this._minDepth(this.root)
  }
  _minDepth(node) {
    if (!node) return 0
    if (node.left && node.right) {
      return Math.min(this._minDepth(node.left), this._minDepth(node.right)) + 1
    }
    if (node.left) {
      return this._minDepth(node.left) + 1
    }
    if (node.right) {
      return this._minDepth(node.right) + 1
    }

    return 1
  }

  // 镜像
  reflection() {
    const root = this.root

    if (!root) return true
    const validate = (node1, node2) => {
      if (!node1 && !node2) return true
      if (!node1 || !node2 || node1.val !== node2.val) return false

      return validate(node1.left, node2.right) && validate(node1.right, node2.left)
    }

    return validate(root.left, root.right)
  }
}

const tree = new Tree()

const len = 20

for (let i = 0; i < len; i++) {
  tree.addNode(Math.ceil(Math.random() * 100))
}

tree.prevTravel()
tree.midTravel()
tree.nextTravel()
console.log('levelTravel:', tree.levelTravel())
console.log('levelTravelReverse:', tree.levelTravelReverse())
console.log('leftView:', tree.leftView())
console.log('rightView:', tree.rightView())
console.log('maxDepth:', tree.maxDepth())
console.log('minDepth:', tree.minDepth())
