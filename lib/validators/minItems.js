class MinItems {
  constructor ({minItems}) {
    this._minItems = minItems
  }

  get conditions() {
    return ['onBlur']
  }

  validate (array) {
    return [
      array.length >= this._minItems, 
      `Minimum number of items is ${this._minItems}`
    ]
  }
}

module.exports = MinItems