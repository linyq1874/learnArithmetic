class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get()
  }

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
      this.value = newVal
      this.cb.call(this.vm, newVal, oldVal)
    }
  }
}
