export class Updater {
  constructor(options) {
    this.oldScript = ''
    this.newScript = ''
    this.dispatch = {}
    this.init() //初始化
    this.timing(options?.timer) //轮询
  }

  async init() {
    const html = await this.getHtml()
    this.oldScript = this.parserScript(html)
  }
  // 读取index html
  async getHtml() {
    const html = await fetch('/').then((res) => res.text())
    return html
  }
  // 匹配script标签
  parserScript(html) {
    const reg = new RegExp(/<html([^>]*)>/g) //script正则
    return html.match(reg)
  }

  //发布订阅通知
  // 'no-update' | 'update'
  on(key, fn) {
    ;(this.dispatch[key] || (this.dispatch[key] = [])).push(fn)
    return this
  }

  /**
   * 判断是否更新
   */
  compare(oldHtml, newHtml) {
    // 一样无更新
    if (oldHtml.toString().split('date=')[1] === newHtml.toString().split('date=')[1]) {
      this.dispatch['no-update'].forEach((fn) => {
        fn()
      })
    } else {
      //否则通知更新
      this.dispatch['update'].forEach((fn) => {
        fn()
      })
    }
  }
  // 轮询
  timing(time = 10000) {
    setInterval(async () => {
      const newHtml = await this.getHtml()
      this.newScript = this.parserScript(newHtml)
      this.compare(this.oldScript, this.newScript)
    }, time)
  }
}
