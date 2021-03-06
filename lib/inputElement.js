const colors = require('colors')
const Element = require('./element')

class InputElement extends Element {
  constructor (swagger, name, type, parent, x = 0, y = 0, factory) {
    super(swagger, type, parent, x, y, factory)
    
    this._name = name
    this._value = ''
    this._cursorPosition = 0
    this._example = swagger.example || swagger.default || name || ''
    this._enumPosition = -1
    this._enum = swagger.enum || []
    this._isNullable = swagger.nullable
  }

  get hasInlineMessage() {
    return true
  }

  get requiresCursor() {
    return true
  }

  get displayableText() {
    if (!this._value && this._example) {
      return this._example.toString().dim
    }

    return this._value
  }

  get height () {
    return 1
  }

  recalculateOffsets() {

  }

  nextEnum() {
    if (!this._enum.length) {
      return
    }

    this._enumPosition++
    if (this._enumPosition === this._enum.length) {
      this._enumPosition = 0
    }

    this._value = this._enum[this._enumPosition]
    this._cursorPosition = this._value.length
    this.message = null
  }

  previousEnum() {
    if (!this._enum.length) {
      return
    }

    this._enumPosition--
    if (this._enumPosition < 0) {
      this._enumPosition = this._enum.length - 1
    }

    this._value = this._enum[this._enumPosition]
    this._cursorPosition = this._value.length
    this.message = null
  }

  offset() {
    const nameOffset = this._name ? this._name.length + 4 : 0
    const indentOffset = Element.INDENT_SPACES * this._x
    const x = indentOffset + nameOffset + this._cursorPosition

    return [x, this._y]
  }

  next() {
    if (this._isSelected) {
      if (!super.validate('onBlur')) {
        return this
      }

      this._cursorPosition = this._value.length
      this._isSelected = false
      this.message = null
      return this._parent.next()
    }

    this._isSelected = true
    return this
  }

  previous() {
    if (this._isSelected) {
      this._cursorPosition = this._value.length
      this._isSelected = false
      return this._parent.previous()
    }

    this._isSelected = true
    return this
  }

  cursorLeft() {
    if (this._cursorPosition === 0) {
      return
    } 

    this._cursorPosition--
  }

  cursorRight() {
    if (this._cursorPosition === this._value.length) {
      return
    } 

    this._cursorPosition++
  }

  backspace() {
    if(this._enum.length) {
      this._value = ''
      this._cursorPosition = 0
    }

    this.message = null

    if (this._cursorPosition === 0) {
      return
    } 

    const firstChunk = this._value.slice(0, this._cursorPosition - 1)
    const secondChunk = this._value.slice(this._cursorPosition)
    this._value = firstChunk + secondChunk

    this._cursorPosition--
  }

  append(char = '') {
    if(this._enum.length) {
      this.message = 'Use up and down keys to select a value'
      return this
    }
    
    this.message = null
    char = char.replace(/[\x00-\x1F\x7F-\x9F]/g, '')

    const value = this._value.toString()
    const firstChunk = value.slice(0, this._cursorPosition)
    const secondChunk = value.slice(this._cursorPosition)

    const candidateValue = `${firstChunk}${char}${secondChunk}`
    if (!super.validate('onKeyPress', candidateValue)) {
      return this
    }

    this._value = `${firstChunk}${char}${secondChunk}`
    this._cursorPosition += char.length
    this._enumPosition = -1

    return this
  }

  render() {
    return this._applyIndentation(this._name, this.displayableText)
  }

  toJSON() {
    const value = JSON.stringify(this._ensureType(this._value))
    return this._applyIndentation(this._name, value)
  }
}

module.exports = InputElement
