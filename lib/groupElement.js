const Element = require('./element')

class GroupElement extends Element {
  constructor (swagger, name, parent, type, x = 0, y = 0, open, close) {
    super(swagger, type, x)

    this._y = y
    this._selectedIndex = -1
    this._children = []
    this._parent = parent
    this._name = name
    this._open = open
    this._close = close
  }

  get isSelected() {
    return this._selectedIndex > -1
  }

  get height () {
    return 2 + this._children.reduce((acc, c) => acc + c.height, 0)
  }

  offset() {
    return [0, this._y]
  }

  _parentNext() {
    this._selectedIndex = -1
    return this._parent.next()
  }

  _parentPrevious() {
    this._selectedIndex = -1
    return this._parent.previous()
  }

  previous() {
    if (!this._children.length) {
      return this._parentPrevious()
    }

    this._selectedIndex--
    if (this._selectedIndex < 0) {
      if (this._parent) {
        return this._parentPrevious()
      }

      this._selectedIndex = 0
    }

    return this._children[this._selectedIndex].previous()
  }

  next() {
    if (!this._children.length) {
      return this._parentNext()
    }

    this._selectedIndex++
    if (this._selectedIndex >= this._children.length) {
      if (this._parent) {
        return this._parentNext()
      }

      this._selectedIndex = 0
    }

    return this._children[this._selectedIndex].next()
  }

  _encloseContents(applyColors, transform) {
    const children = this._children.map(c => c[transform]()).join(',\n')
    
    let open = this._open
    if (this.isSelected && applyColors) {
      open = open.bold
    }

    let close = this._close
    if (this.isSelected && applyColors) {
      close = close.bold
    }    

    return this._applyIndentation(this._name, `${open}\n${children}\n${close}`)    

  }

  render() {
    return this._encloseContents(true, 'render')
  }  

  toJSON() {
    return this._encloseContents(false, 'toJSON')
  }  
}

module.exports = GroupElement
