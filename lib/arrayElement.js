const GroupElement = require('./groupElement')

class ArrayElement extends GroupElement {
  constructor (swagger, name, parent, factory, x = 0, y = 0) {
    super(swagger, name, parent, 'array', x, y, '[', ']', factory)

    this._factory = factory
    const child = factory.build(swagger.items, null, this, x + 1, y + 1)
    this._children.push(child)
  }

  append(char) {
    if(char !== '=' && char !== '+' && char !== '-') {
      this.message = `Press "+" to add a new object or "-" to remove this array`
      return this
    } else {
      this.message = null
    }

    if (char === '+' || char === '=') {
      const nextY = this._y + this._children.reduce((acc, c) => acc + c.height, 0) + 1
      const child = this._factory.build(this.swagger.items, null, this, this._x + 1, nextY)

      const candidateArray = [...this._children]
      candidateArray.push(child)

      const isValid = this.validate('onNewChild', candidateArray)

      if (isValid) {
        this._children = candidateArray
      }
    }

    if (char === '-') {
      return this.remove()
    }

    return this
  }  
}

module.exports = ArrayElement
