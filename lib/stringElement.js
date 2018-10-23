const InputElement = require('./inputElement')

class StringElement extends InputElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0) {
    super(swagger, name, 'string', parent, x, y, factory)
    this._isPassword = swagger.format === 'password'
  }

  offset() {
    const [x, y] = super.offset()
    return [x + 1, y]
  }

  render() {
    let value = this.displayableText

    if (this._value && this._isPassword) {
      value = this._value.replace(/./g, '*')
    }

    return this._applyIndentation(this._name, `"${value}"`)
  }

  _ensureType(value) {
    return value.toString()
  }
}

module.exports = StringElement
