const InputElement = require('./inputElement')

class BooleanElement extends InputElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0) {
    super(swagger, name, 'boolean', parent, x, y, factory)
    this._enum = ['true', 'false']
  }

  get requiresCursor() {
    return false
  }

  render() {
    let text = this.displayableText.cyan

    if (this.isSelected) {
      text = text.bold
    }

    return this._applyIndentation(this._name, text)
  }

  _ensureType(value) {
    if (value.length === 0) {
      return null
    }

    return value === 'true'
  }
}

module.exports = BooleanElement
