const obj = {}

function react(obj, key, val) {
  Object.defineProperty(obj, key, {
    // configurable: true,
    // enumerable: true,
    get() {
      console.log('property get')
      return val || 'not found'
    },

    set(value) {
      console.log('property set')

      val = value
    }
  })
}

react(obj, 'name')

console.log(obj.name)

obj.name = 'lin'

console.log(obj.name)
