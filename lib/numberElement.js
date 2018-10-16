const InputElement = require('./inputElement')

class NumberElement extends InputElement {
  constructor (swagger, name, parent, factory, level = 0, y = 0) {
    super(swagger, name, 'number', parent, level, y)
  }

  _ensureType(value) {
  	return parseFloat(value)
  }
}

module.exports = NumberElement
