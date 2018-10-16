const Element = require('./element')

class GroupElement extends Element {
  constructor (swagger, parent, type, level = 0, y = 0) {
    super(swagger, type, level)

    this._y = y
    this._selectedIndex = -1
    this._children = []
    this._parent = parent
  }

  get isSelected() {
    return this._selectedIndex > -1
  }

  get yLength () {
    const a = 2 + this._children.reduce((acc, c) => {
      // console.log('>>>', acc, c.yLength)
      // console.log(c)

      return acc + c.value.yLength
    }, 0)

    // console.log('g length:', a)

    return a
  }

  offset() {
    return [0, this._y]
  }

  _parentNext() {
    if (!this._parent) {
      return this
    }

    this._selectedIndex = -1
    return this._parent.next()
  }

  _parentPrevious() {
    if (!this._parent) {
      return this
    }

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

    return this._children[this._selectedIndex].value.previous()
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

    return this._children[this._selectedIndex].value.next()
  }
}

module.exports = GroupElement
