const GroupElement = require('./groupElement')

class ArrayElement extends GroupElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0) {
    super(swagger, name, parent, 'array', x, y, '[', ']')

    const child = factory.build(swagger.items, null, this, x + 1, y + 1)
    this._children.push(child)
  }
}

module.exports = ArrayElement
