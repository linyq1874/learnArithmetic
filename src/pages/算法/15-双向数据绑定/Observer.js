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

// function observer(obj) {
//   if (!obj || typeof obj !== 'object') {
//     return
//   }

//   Object.keys(obj).forEach(key => {
//     // Proxy不允许绑定在非对象上
//     if (obj[key] && typeof obj[key] === 'object') {
//       obj[key] = defineReactive(obj[key])
//     }
//   })
// }

// function defineReactive(data) {
//   const dep = new Dep()
//   return new Proxy(data, {
//     get(target, key, receiver) {
//       if (Dep.target) {
//         dep.depend()
//       }
//       if (Reflect.has(target, key)) {
//         return Reflect.get(target, key, receiver)
//       }
//     },
//     set(target, key, value, receiver) {
//       // 进行数组操作时，会进行两次set 一次数据改变，一次length改变，两次改变data的值是不变，因此不应该多分发一次消息
//       dep.notify()
//       if (!Array.isArray(data) || key !== 'length') {
//         observer(data)
//       }
//       return Reflect.set(target, key, value, receiver)
//       // console.log('-------通知订阅者--------')
//     }
//   })
// }
