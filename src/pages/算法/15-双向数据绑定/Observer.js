function observer(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }

  Object.keys(obj).forEach(key => {
    react(obj, key, obj[key])
  })
}

function react(obj, key, val) {
  observer(val)

  /*在闭包内存储一个Dep对象*/
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend()
      }

      console.log(`${obj}的属性${key}被监听了`)
      return val
    },
    set(newVal) {
      if (val === newVal) {
        return
      }
      console.log(`${obj}的属性${key}被监听了,新值为${newVal.toString()}`)
      val = newVal
      dep.notify()
    }
  })
}
