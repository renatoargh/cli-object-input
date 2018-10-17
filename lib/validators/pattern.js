class Pattern {
  constructor (swagger) {
    this._pattern = new RegExp(swagger.pattern)
  }

  get when() {
    return 'onKeyPress'
  },

  validate (string) {
    if (!this._pattern.test(string)) {
      throw new Error(`Does not match pattern "${this._pattern}"`)
    }
  }
}


module.exports = Pattern