const InputElement = require('./inputElement')

class NullElement extends InputElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0, previous) {
    super(swagger, name, 'null', parent, x, y, factory)
    this._previous = previous
  }

  get requiresCursor() {
    return false
  }

  setNull() {
    return this
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
      return this
    } 

    if (!this._previous) {
      this.message = 'No previous object to revert'
      return this
    }

    this.message = null

    if (this._parent) {
      this._parent.replaceChild(this, this._previous)
    }

    return this._previous
  }
}

module.exports = NullElement
