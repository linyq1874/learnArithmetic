class SqQueue {
  constructor(length) {
    this.queue = new Array(length + 1)
    this.first = 0
    this.last = 0
    this.size = 0
  }
  getLength() {
    return this.queue.length - 1
  }
  getHeader() {
    return this.queue[this.first]
  }
  isEmpty() {
    return this.first === this.last
  }
  enQueue(item) {
    // 扩容
    if (this.first === (this.last + 1) / this.queue.length) {
      this.resize(this.getLength() * 2 + 1)
    }
    this.queue[this.last] = item
    this.last = (this.last + 1) % this.queue.length
    this.size++
  }
  deQueue() {
    if (this.isEmpty()) {
      throw new Error('the queue is empty')
    }
    const d = this.queue[this.first]
    this.first = (this.first + 1) % this.queue.length
    this.size--

    return d
  }
  resize(length) {
    const q = new Array(length)
    for (let i = 0, len = this.getLength(); i < len; i++) {
      q[i] = this.queue[(this.first + i) % (len + 1)]
    }
    this.queue = q
    this.first = 0
    this.last = this.size
  }
}
