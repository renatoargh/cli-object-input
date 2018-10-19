const GroupElement = require('./groupElement')

class ArrayElement extends GroupElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0) {
    super(swagger, name, parent, 'array', x, y, '[', ']')

    this._factory = factory
    const child = factory.build(swagger.items, null, this, x + 1, y + 1)
    this._children.push(child)
  }

  append(char) {
    if(char !== '+') {
      this.message = 'Press + to add a new element'
      return
    } else {
      this.message = null
    }

    const nextY = this._y + this._children.reduce((acc, c) => acc + c.height, 0) + 1
    const child = this._factory.build(this.swagger.items, null, this, this._x + 1, nextY)
    this._children.push(child)
  }  
}

module.exports = ArrayElement
