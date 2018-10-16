const assert = require('assert')
const INDENT_SPACES = 2

class Element {
  constructor (swagger, type, level) {
    assert.equal(typeof swagger, 'object', 'swagger spec is required')
    assert.equal(typeof type, 'string', 'type must be a string')
    assert.equal(typeof level, 'number', 'level must be a number')
    assert.equal(swagger.type, type, `swagger spec refer to type ${type}`)

    this.swagger = swagger
    this.type = type
    this._level = level
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

  renderMessage () {
    return this.message ? ` // ${this.message}`.gray : ''
  }

  _applyIndentation(key, value) {
  	key = key ? `"${key}": ` : ''

    const indent = ' '.repeat(this._level ? INDENT_SPACES : 0)
    return (key + value).split('\n').map(line => indent + line).join('\n')
  }
}

module.exports = Element
