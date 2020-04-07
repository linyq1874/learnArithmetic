/**
 * Initialize your data structure here.
 */
var MyLinkedList = function() {
  this.head = null
  this.size = 0
}

function Node(val) {
  this.val = val
  this.next = null
}

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
  if (index >= 0 && index < this.size) {
    let current = this.head,
      count = 0
    while (current) {
      if (count++ === index) {
        return current
      }
      current = current.next
    }
  }

  return -1
}

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
  const node = new Node(val)
  node.next = this.head
  this.head = node
  this.size++
}

/**
 * Append a node of value val to the last element of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
  let current = this.head
  const node = new Node(val)
  while (current.next) {
    current = current.next
  }
  current.next = node
  this.size++
}

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index === this.size) this.addAtTail(val)
  else if (index <= 0) this.addAtHead(val)
  else if (index < this.size) {
    const result = this.get(index - 1)
    const node = new Node(val)

    node.next = result.next
    result.next = node
  }
  if (index <= this.size) this.size++
}

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index > 0 && index < this.size) {
    const node = this.get(index - 1)
    node.next = node.next.next
  } else if (index === 0) {
    this.head = this.head.next
  }
  this.size--
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

const list = new MyLinkedList()
list.addAtHead(1)
list.addAtTail(3)
list.addAtIndex(1, 2)
// console.log(list.get(1))
// list.deleteAtIndex(1)
// console.log(list.get(1))
console.log(JSON.stringify(list))
