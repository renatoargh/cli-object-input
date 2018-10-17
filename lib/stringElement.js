const InputElement = require('./inputElement')

class StringElement extends InputElement {
  constructor (swagger, name, parent, factory, level = 0, y = 0) {
    super(swagger, name, 'string', parent, level, y)
    this._isPassword = swagger.format === 'password'
  }

  offset() {
    const [x, y] = super.offset()
    return [x + (this.isNull ? 0 : 1), y]
  }

  render() {
    let value = this.displayableText

    if (!this.isNull && this._value && this._isPassword) {
      value = this._value.replace(/./g, '*')
    }

    value = this.isNull ? value : `"${value}"`
    return this._applyIndentation(this._name, value)
  }

  _ensureType(value) {
    return value.toString()
  }
}

module.exports = StringElement
