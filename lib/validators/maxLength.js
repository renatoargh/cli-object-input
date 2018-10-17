class MaxLength {
  constructor (swagger) {
    this._maxLength = swagger.maxLength
  }

  get when() {
    return 'onKeyPress'
  },

  validate (string) {
    if (string.length > this._maxLength) {
      throw new Error(`Maximum of ${this._maxLength} characters allowed`)
    }
  }
}


module.exports = MaxLength