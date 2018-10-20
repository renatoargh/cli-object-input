const fs = require('fs')
const path = require('path')
const validatorsPath = (v) => path.join(__dirname, '/validators', v || '')
const validators = fs.readdirSync(validatorsPath()).map(v => path.basename(v, '.js'))

module.exports = class ElementFactory {
  static build(swagger, name, parent, x = 0, y = 0) {
    const {type} = swagger
    const Element = require(`./${type}Element`)

    if (!Element) {
      throw new Error(`Type "${type}" is not recognized`)
    }

    const element = new Element(swagger, name, parent, ElementFactory, x, y)
    
    element._validators = validators.map((v) => {
      if (!swagger[v]) {
        return
      }

      const Validator = require(validatorsPath(v))

      return new Validator(swagger)
    }).filter(v => v)

    return element
  }
}
