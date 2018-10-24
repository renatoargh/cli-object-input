const assert = require('assert')
const Element = require('./element')

class GroupElement extends Element {
  constructor (swagger, name, parent, type, x = 0, y = 0, open, close, factory) {
    super(swagger, type, parent, x, y, factory)

    this._selectedIndex = -1
    this._children = []
    this._name = name
    this._open = open
    this._close = close
  }

  get height () {
    if (!this._children.length) {
      return 1
    }

    return 2 + this._children.reduce((acc, c) => acc + c.height, 0)
  }

  get hasInlineMessage() {
    return false
  }

  get requiresCursor() {
    return false
  }

  recalculateOffsets() {
    let y = this._y + 1

    for(const children of this._children) {
      children._y = y
      children.recalculateOffsets()

      y += children.height
    }
  }

  replaceChild(old, current) {
    assert(old)
    assert(current)

    const index = this._children.indexOf(old)
    this._children[index] = current

    const rootElement = this.getRoot()
    rootElement.recalculateOffsets()
  }

  offset() {
    return [Element.INDENT_SPACES * this._x, this._y]
  }

  _parentNext() {
    this._selectedIndex = -1
    this._isSelected = false
    return this._parent.next(true)
  }

  validate(event, children = this._children) {
    const thisIsValid = super.validate(event, children)
    const childrenAreValid = this._children.map(c => c.validate(event)).every(c => c)

    return thisIsValid && childrenAreValid
  }

  next(invokedFromChild = false) {
    if (!this._children.length) {
      if (invokedFromChild) {
        this._isSelected = true
        return this
      }

      if (this._parent) {
        return this._parentNext()
      } 

      this._isSelected = true
      return this
    }

    this._selectedIndex++
    if (this._selectedIndex >= this._children.length) {
      if (this._parent) {
        return this._parentNext()
      }

      this._selectedIndex = 0
    }

    this.message = null
    this._isSelected = false

    return this._children[this._selectedIndex].next(invokedFromChild)
  }

  _encloseContents(transform) {
    const isRender = transform === 'render'
    const children = this._children.reduce((acc, child, index) => {
      const isLastElement = index + 1 !== this._children.length

      acc += child[transform]()

      if (isLastElement) {
        acc += ','
      }

      if (isRender && child.hasMessage && child.hasInlineMessage) {
        acc += child.renderMessage()
      }

      if (isLastElement) {
        acc += '\n'
      }

      return acc
    }, '')

    let open = this._open
    if (isRender) {
      if(this.isSelected) {
        open = open.cyan.bold
      }

      open += this.renderMessage()
    }

    let close = this._close
    if (isRender && this.isSelected) {
      close = close.cyan.bold
    }    

    const lineBreak = children.length ? '\n' : ''
    const result = `${open}${lineBreak}${children}${lineBreak}${close}`

    return this._applyIndentation(this._name, result)    
  }

  append(char) {
    if (char !== '-') {
      this.message = 'Press "-" to remove this ' + this.type
      return this
    }

    this.message = ''
    return this.remove()
  }

  render() {
    return this._encloseContents('render')
  }  

  toJSON() {
    return this._encloseContents('toJSON')
  }  
}

module.exports = GroupElement
