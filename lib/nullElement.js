const InputElement = require('./inputElement')

class NullElement extends InputElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0, previous) {
    super(swagger, name, 'null', parent, x, y)
    this._previous = previous
  }

  get requiresCursor() {
    return false
  }

  render() {
    let text = 'null'.cyan
    if (this.isSelected) {
      text = text.bold
    }

    return this._applyIndentation(this._name, text)
  }

  _ensureType() {
    return null
  }

  append(char) {
    if (char !== 'r') {
      this.message = 'Press "r" to revert previous object'
      return
    } 

    this.message = null
  }
}

module.exports = NullElement
