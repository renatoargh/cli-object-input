class Minimum {
  constructor ({minimum, exclusiveMinimum}) {
    this._minimum = minimum
    this._exclusiveMinimum = exclusiveMinimum
  }

  get conditions() {
    return ['onBlur']
  }

  validate (number) {
    let isValid
    let message
    if (this._exclusiveMinimum) {
      isValid = number > this._minimum 
      message = 'greater than'
    } else {
      isValid = number >= this._minimum 
      message = 'greater than or equal'
    }

    return [
      isValid, 
      `Number must be ${message} ${this._minimum}`
    ]
  }
}

module.exports = Minimum