class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get()
  }

  /**
   * Dep.target 为全局属性，将Dep.target指向自己，通过this.value = this.vm.data[this.exp]
   * 取值，从而触发 observe的 getter，并将this（Watch）添加进订阅器，继而将target置空。
   */
  get() {
    Dep.target = this
    const value = this.vm.data[this.exp]
    Dep.target = null

    return value
  }

  update() {
    const oldVal = this.value
    const newVal = this.vm.data[this.exp]

    if (oldVal !== newVal) {
      // 获取新值，触发setter
      this.value = newVal
      this.cb.call(this.vm, newVal, oldVal)
    }
  }
}
