const InputElement = require('./inputElement')

class NullElement extends InputElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0, previous) {
    super(swagger, name, 'null', parent, x, y)
    this._previous = previous
  }

  render() {
    return this._applyIndentation(this._name, 'null'.gray)
  }

  _ensureType() {
    return null
  }

  append(char) {
    if (char !== 'u') {
      this.message = 'Press "u" to revert previous object'
      return
    } 

    this.message = null
  }
}

module.exports = NullElement
