const InputElement = require('./inputElement')

class NumberElement extends InputElement {
  constructor (swagger, name, parent, factory, level = 0, y = 0) {
    super(swagger, name, 'number', parent, level, y)
  }

  render(key) {
    return this._applyIndentation(key, this.displayableText)    
  }
}

module.exports = NumberElement
