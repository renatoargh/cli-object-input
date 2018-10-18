class Maximum {
  constructor ({maximum, exclusiveMaximum}) {
    this._maximum = maximum
    this._exclusiveMaximum = exclusiveMaximum
  }

  get conditions() {
    return ['onBlur']
  }

  validate (number) {
    let isValid
    let message
    if (this._exclusiveMaximum) {
      isValid = number < this._maximum 
      message = 'lesser than'
    } else {
      isValid = number <= this._maximum 
      message = 'lesser than or equal'
    }

    return [
      isValid, 
      `Number must be ${message} ${this._maximum}`
    ]
  }
}


module.exports = Maximum