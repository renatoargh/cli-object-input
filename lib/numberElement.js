const InputElement = require('./inputElement')

class NumberElement extends InputElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0) {
    super(swagger, name, 'number', parent, x, y, factory)
  }

  _ensureType(value) {
  	return parseFloat(value)
  }
}

module.exports = NumberElement
