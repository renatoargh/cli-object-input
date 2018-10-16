const GroupElement = require('./groupElement')

class ObjectElement extends GroupElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0) {
    super(swagger, name, parent, 'object', x, 0, '{', '}')

    this._parent = parent

    y += 1

    const properties = Object.entries(swagger.properties)

    properties.forEach(([name, swagger], i) => {
      const element = factory.build(swagger, name, this, x + 1, y)
      
      y += element.height

      this._children.push(element)
    })
  }
}

module.exports = ObjectElement
