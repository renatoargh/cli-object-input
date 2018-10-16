const colors = require('colors')
const Element = require('./element')

class InputElement extends Element {
  constructor (swagger, name, type, parent, level = 0, y = 0) {
    super(swagger, type, level)
    
    this._name = name
    this._y = y
    this._isSelected = false
    this._parent = parent
    this._isNull = false
    this._value = ''
    this._cursorPosition = 0
    this._example = swagger.example || swagger.default || name || ''
    this._enumPosition = -1
    this._enum = swagger.enum || []
  }

  get isNull() {
    return !!this._isNull
  }

  get displayableText() {
    if (this.isNull) {
      return 'null'.cyan
    }

    if (!this._value && this._example) {
      return this._example.toString().dim
    }

    return this._value
  }

  get yLength () {
    return 1
  }

  setNull() {
    this._cursorPosition = 0
    this._value = ''
    this._isNull = true
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
    this._isNull = false
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
    this._isNull = false
  }

  offset() {
    const nameOffset = this._name ? this._name.length + 4 : 0
    const indentOffset = Element.INDENT_SPACES * this._level
    const x = indentOffset + nameOffset + this._cursorPosition

    return [x, this._y]
  }

  next() {
    if (this._isSelected) {
      this._cursorPosition = this._value.length
      this._isSelected = false
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
    if (this._cursorPosition === 0) {
      return
    } 

    this._cursorPosition--
    this._value = this._value.slice(0, -1)
  }

  concat(char = '') {
    char = char.replace(/[\x00-\x1F\x7F-\x9F]/g, '')

    this._isNull = false

    const firstChunk = this._value.slice(0, this._cursorPosition)
    const secondChunk = this._value.slice(this._cursorPosition)
    this._value = `${firstChunk}${char}${secondChunk}`

    this._cursorPosition += char.length
    this._enumPosition = -1
  }
}

module.exports = InputElement
