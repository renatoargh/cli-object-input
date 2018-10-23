const GroupElement = require('./groupElement')

class ObjectElement extends GroupElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0) {
    super(swagger, name, parent, 'object', x, y, '{', '}', factory)

    const properties = Object.entries(swagger.properties)
    properties.forEach(([name, swagger]) => {
      const element = factory.build(swagger, name, this, x + 1, y + 1)
      
      y += element.height

      this._children.push(element)
    })
  }
}

module.exports = ObjectElement
