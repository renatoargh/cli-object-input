class MinLength {
  constructor (swagger) {
    this._minLength = swagger.minLength
  }

  get when() {
    return 'onBlur'
  },

  validate (string) {
    if (string.length < this._minLength) {
      throw new Error(`At least ${this._minLength} characters required`)
    }
  }
}


module.exports = MinLength