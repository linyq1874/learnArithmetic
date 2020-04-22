/**
 * @param {number} capacity
 */
const LRUCache = function(capacity) {
  this.capacity = capacity
  this.map = Object.create(null)
  this.keys = []
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  const data = this.map[key]
  if (data) {
    const index = this.keys.indexOf(key)
    this.keys.splice(index, 1)
    this.keys.unshift(key)
    return data
  }

  return -1
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  const data = this.map[key]

  if (data) {
    this.map[key] = value
    const index = this.keys.indexOf(key)
    this.keys.splice(index, 1)
    this.keys.unshift(key)
  } else {
    this.map[key] = value
    this.keys.unshift(key)

    if (this.keys.length > this.capacity) {
      const popIdx = this.keys.pop()
      this.map[popIdx] = null
    }
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const cache = new LRUCache(2)

let res
cache.put(1, 1)
cache.put(2, 2)
res = cache.get(1) // 返回  1
console.log('get:', res)
cache.put(3, 3) // 该操作会使得密钥 2 作废
res = cache.get(2) // 返回 -1 (未找到)
console.log('get:', res)
cache.put(4, 4) // 该操作会使得密钥 1 作废
res = cache.get(1) // 返回 -1 (未找到)
console.log('get:', res)
res = cache.get(3) // 返回  3
console.log('get:', res)
res = cache.get(4) // 返回
console.log('get:', res)

class Cache {
  constructor(capacity) {
    this.capacity = capacity
    this.map = new Map()
  }

  get(key) {
    if (this.map.has(key)) {
      const data = this.map.get(key)
      this.map.delete(key)
      this.map.set(key, data)

      return data
    }

    return -1
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key)
      this.map.set(key, value)
    } else {
      this.map.set(key, value)

      if (this.map.size > this.capacity) {
        this.map.delete(this.map.keys().next().value)
      }
    }
  }
}

const cache1 = new Cache(2)

let res1
cache1.put(1, 1)
cache1.put(2, 2)
res1 = cache1.get(1) // 返回  1
console.log('get:', res1)
cache1.put(3, 3) // 该操作会使得密钥 2 作废
res1 = cache1.get(2) // 返回 -1 (未找到)
console.log('get:', res1)
cache1.put(4, 4) // 该操作会使得密钥 1 作废
res1 = cache1.get(1) // 返回 -1 (未找到)
console.log('get:', res1)
res1 = cache1.get(3) // 返回  3
console.log('get:', res1)
res1 = cache1.get(4) // 返回
console.log('get:', res1)
