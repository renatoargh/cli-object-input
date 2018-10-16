module.exports = class ElementFactory {
  static build(swagger, name, parent, level = 0, y = 0) {
    const Element = {
      'object': require('./objectElement'),
      'string': require('./stringElement'),
      'number': require('./numberElement'),
      'integer': require('./numberElement'),
      'array': require('./arrayElement'),
    }[swagger.type]

    if (!Element) {
      throw new Error(`Type "${swagger.type}" is not recognized`)
    }

    return new Element(swagger, name, parent, ElementFactory, level, y)
  }
}
