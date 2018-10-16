const InputElement = require('./inputElement')

class BooleanElement extends InputElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0) {
    super(swagger, name, 'boolean', parent, x, y)
    this._enum = ['true', 'false']
  }

  render() {
    return this._applyIndentation(this._name, this.displayableText.cyan) + this.renderMessage()
  }

  _ensureType(value) {
    return value === 'true'
  }
}

module.exports = BooleanElement
