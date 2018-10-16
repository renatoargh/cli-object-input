const InputElement = require('./inputElement')

class StringElement extends InputElement {
  constructor (swagger, name, parent, factory, level = 0, y = 0) {
    super(swagger, name, 'string', parent, level, y)
  }

  offset() {
    const [x, y] = super.offset()
    return [x + (this.isNull ? 0 : 1), y]
  }

  render() {
    const value = this.isNull ? this.displayableText : `"${this.displayableText}"`
    return this._applyIndentation(this._name, value)
  }
}

module.exports = StringElement
