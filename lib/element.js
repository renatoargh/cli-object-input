const assert = require('assert')
const INDENT_SPACES = 2

class Element {
  constructor (swagger, type, parent, x, y, factory) {
    assert.equal(typeof swagger, 'object', 'swagger spec is required')
    assert.equal(typeof type, 'string', 'type must be a string')
    assert.equal(typeof x, 'number', 'x must be a number')
    assert.equal(swagger.type, type, `swagger spec refer to type ${type}`)
    assert(factory, 'elements factory is required')

    this.swagger = swagger
    this.type = type
    this._parent = parent
    this._isSelected = false
    this._x = x
    this._y = y
    this._validators = []
    this._factory = factory
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

  previousEnum() {}
  nextEnum() {}
  cursorLeft() {}
  cursorRight() {}
  backspace() {}

  setNull() {
    const nullObject = this._factory.build(
      {type: 'null'}, 
      this._name, 
      this._parent, 
      this._x, 
      this._y
    )

    nullObject._previous = this
    nullObject._isSelected = true

    if (this._parent) {
      this._parent.replaceChild(this, nullObject)
    }

    this._selectedIndex = -1

    return nullObject
  }

  remove() {
    const parent = this._parent
    
    if (!parent) {
      return this
    }

    const index = parent._children.indexOf(this)
    parent._children = [
      ...parent._children.slice(0, index),
      ...parent._children.slice(index + 1)
    ]

    const rootElement = this.getRoot()
    rootElement.recalculateOffsets()    

    parent._selectedIndex--
    
    const next = parent.next()
    next._isSelected = true
    this._isSelected = false

    return next
  }

  getRoot () {
    let element = this

    while (element._parent) {
      element = element._parent
    }

    return element
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
