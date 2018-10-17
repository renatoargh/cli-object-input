class MaxLength {
  constructor (swagger) {
    this._maxLength = swagger.maxLength
  }

  get conditions() {
    return ['onKeyPress', 'onBlur']
  }

  validate (string) {
    return [
      string.length <= this._maxLength, 
      `Maximum of ${this._maxLength} characters allowed`
    ]
  }
}


module.exports = MaxLength