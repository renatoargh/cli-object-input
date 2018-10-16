const GroupElement = require('./groupElement')

class ObjectElement extends GroupElement {
  constructor (swagger, name, parent, factory, level = 0, y = 0) {
    super(swagger, parent, 'object', level)

    this._parent = parent

    let yAcc = y + 1

    Object.entries(swagger.properties)
      .forEach(([name, swagger], index) => {
        const element = factory.build(swagger, name, this, level + 1, yAcc)
        yAcc += element.yLength

        this._children.push({
          key: name,
          value: element
        })
      })
  }

  render(key) {
    const properties = this._children.map(property => {
      return property.value.render(property.key)
    }).join(',\n')

    const open = this.isSelected ? '{'.bold : '{'
    const close = this.isSelected ? '}'.bold : '}'

    return this._applyIndentation(key, `${open}\n${properties}\n${close}`)
  }
}

module.exports = ObjectElement
