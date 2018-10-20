const Element = require('./element')

class GroupElement extends Element {
  constructor (swagger, name, parent, type, x = 0, y = 0, open, close, factory) {
    super(swagger, type, parent, x)

    this._y = y
    this._selectedIndex = -1
    this._children = []
    this._name = name
    this._open = open
    this._close = close
    this._factory = factory
  }

  get height () {
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
    const index = this._children.indexOf(old)
    this._children[index] = current

    const rootElement = this.getRoot()
    rootElement.recalculateOffsets()
  }

  setNull() {
    const nullObject = this._factory.build(
      {type: 'null'}, 
      this._name, 
      this._parent, 
      this._x, 
      this._y,
      this
    )

    nullObject._isSelected = true

    if (this._parent) {
      this._parent.replaceChild(this, nullObject)
    }

    this._isNull = true
    this._selectedIndex = -1

    return nullObject
  }

  offset() {
    return [Element.INDENT_SPACES * this._x, this._y]
  }

  _parentNext() {
    this._selectedIndex = -1
    return this._parent.next()
  }

  _parentPrevious() {
    this._selectedIndex = -1
    return this._parent.previous()
  }

  validate() {
    const thisIsValid = super.validate()
    const childrenValidations = this._children.map(c => c.validate())
    return thisIsValid && childrenValidations.every(c => c)
  }

  previous() {
    // if (!this._children.length) {
    //   return this._parentPrevious()
    // }

    // this._selectedIndex--
    // if (this._selectedIndex < 0) {
    //   if (this._parent) {
    //     return this._parentPrevious()
    //   }

    //   this._selectedIndex = 0
    // }

    // return this._children[this._selectedIndex].previous()
  }

  next() {
    if (!this._children.length) {
      if (this._parent) {
        return this._parentNext()
      } 

      return
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
    return this._children[this._selectedIndex].next()
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
    if (isRender && this.isSelected) {
      open = open.cyan.bold
      open += this.renderMessage()
    }

    let close = this._close
    if (isRender && this.isSelected) {
      close = close.cyan.bold
    }    

    return this._applyIndentation(this._name, `${open}\n${children}\n${close}`)    
  }

  render() {
    return this._encloseContents('render')
  }  

  toJSON() {
    return this._encloseContents('toJSON')
  }  
}

module.exports = GroupElement
