class Pattern {
  constructor ({pattern}) {
    this._pattern = new RegExp(pattern)
  }

  get conditions() {
    return ['onBlur']
  }

  validate (string) {
    return [
      this._pattern.test(string), 
      `Does not match pattern "${this._pattern}"`
    ]
  }
}

module.exports = Pattern