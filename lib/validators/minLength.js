class MaxLength {
  constructor (swagger) {
    this._minLength = swagger.minLength
  }

  get conditions() {
    return ['onBlur']
  }

  validate (string) {
    return [
      string.length >= this._minLength, 
      `Minimum of ${this._minLength} characters expected`
    ]
  }
}


module.exports = MaxLength