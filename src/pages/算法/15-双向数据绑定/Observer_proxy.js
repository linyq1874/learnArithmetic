function observer(target) {
  if (!target || typeof target !== 'object') {
    return target // 这里要注意返回target 否则获取不到
  }

  const dep = new Dep()

  const handler = {
    get(target, key) {
      if (Dep.target) {
        dep.depend()
      }
      console.log(`${JSON.stringify(target)}的属性${key}被监听了`)

      const reflect = Reflect.get(target, key)
      // 当我们获取对象属性时，Proxy只会递归到获取的层级，不会继续递归子层级
      return observer(reflect)
    },
    set(target, key, val) {
      // 重复的数据，不处理
      if (val === target[key]) {
        return true
      }
      // 这里可以更具是否是已有的key,做不同的操作
      // if (Reflect.has(key)) {
      // } else {
      // }

      console.log(`${JSON.stringify(target)}的属性${key}被监听了,新值为${val.toString()}`)

      const success = Reflect.set(target, key, val)
      dep.notify()
      // 设置成功与否
      return success
    },
    deleteProperty(target, key) {
      const success = Reflect.deleteProperty(target, key)
      // 删除成功与否
      return success
    }
  }
  // 生成proxy对象
  const proxy = new Proxy(target, handler)
  return proxy
}
