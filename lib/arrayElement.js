const GroupElement = require('./groupElement')

class ArrayElement extends GroupElement {
  constructor (swagger, name, parent, factory, level = 0, y = 0) {
    super(swagger, parent, 'array', level, y)
    
    // console.log(parent)

    const child = factory.build(swagger.items, null, this, level + 1, y + 1)
    this._children.push({value: child})
  }

  render(key) {
  	const children = this._children.map(c => c.value.render()).join(',\n')

    const open = this.isSelected ? '['.bold : '['
    const close = this.isSelected ? ']'.bold : ']'

    return this._applyIndentation(key, `${open}\n${children}\n${close}`)    
  }
}

module.exports = ArrayElement
