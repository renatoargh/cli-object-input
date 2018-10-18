class MultipleOf {
  constructor ({multipleOf}) {
    this._multipleOf = multipleOf
  }

  get conditions() {
    return ['onBlur']
  }

  validate (number) {
    return [
      number % this._multipleOf === 0, 
      `Number must be a multiple of ${this._multipleOf}`
    ]
  }
}

module.exports = MultipleOf



