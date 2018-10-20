const assert = require('assert')
const INDENT_SPACES = 2

class Element {
  constructor (swagger, type, parent, x) {
    assert.equal(typeof swagger, 'object', 'swagger spec is required')
    assert.equal(typeof type, 'string', 'type must be a string')
    assert.equal(typeof x, 'number', 'x must be a number')
    assert.equal(swagger.type, type, `swagger spec refer to type ${type}`)

    this.swagger = swagger
    this.type = type
    this._parent = parent
    this._isSelected = false
    this._x = x
    this._validators = []
  }

  static get INDENT_SPACES() {
  	return INDENT_SPACES
  }

  set message (message) {
    this._message = message
  }

  get message () {
    return this._message || ''
  }

  get hasMessage () {
    return !!this.message
  }

  get isSelected() {
    return this._isSelected
  }

  getRoot () {
    let element = this

    while (element._parent) {
      element = element._parent
    }

    return element
  }

  setNull() {
    this._isNull = true
    return this
  }

  get isNull() {
    return !!this._isNull
  }

  parent() {
    if(this._parent) {
      this._selectedIndex = -1
      this._isSelected = false
      this._parent._isSelected = true
      return this._parent
    }

    return this
  }

  validate(event, value) {
    value = this._ensureType(value || this._value)

    let validators = this._validators.filter(validator => {
      if (!event) {
        return true
      }

      return validator.conditions.includes(event)
    })

    return validators.every(validator => {
      const [isValid, message] = validator.validate(value)

      if (!isValid) {
        this.message = message
      }

      return isValid
    })
  }

  renderMessage () {
    return this.message ? ` // ${this.message}`.gray : ''
  }

  _ensureType(value) {
    return value
  }

  _applyIndentation(key, value) {
  	key = key ? `"${key}": ` : ''

    const indent = ' '.repeat(this._x ? INDENT_SPACES : 0)
    return (key + value).split('\n').map(line => indent + line).join('\n')
  }
}

module.exports = Element
