class MaxItems {
  constructor ({maxItems}) {
    this._maxItems = maxItems
  }

  get conditions() {
    return ['onNewChild']
  }

  validate (array) {
    return [
      array.length <= this._maxItems, 
      `Maximum number of items is ${this._maxItems}`
    ]
  }
}

module.exports = MaxItems