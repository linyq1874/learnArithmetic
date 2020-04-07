class Dep {
  constructor() {
    this.subs = []
  }

  /**
   * 添加订阅者
   * @param {Watch} sub
   */
  addSub(sub) {
    this.subs.push(sub)
  }

  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

Dep.target = null
