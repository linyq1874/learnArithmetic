const proxy = new Proxy(
  {},
  {
    get: function(target, proKey, receiver) {
      if (Reflect.has(target, proKey)) {
        console.log(`proxy get ${proKey}`)
        return Reflect.get(target, proKey, receiver)
      } else {
        console.error(`${proKey} is not found`)
      }
    },
    set(target, proKey, value, receiver) {
      console.log(`proxy set ${proKey}`)

      return Reflect.set(target, proKey, value, receiver)
    }
  }
)

proxy.name = 'lvyingying'

console.log(proxy.name)
