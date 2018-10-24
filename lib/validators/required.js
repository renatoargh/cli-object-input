class Required {
  constructor ({required}) {
    this._required = required
  }

  get conditions() {
    return []
  }

  validate (children = []) {
    let missingProperties = this._required.filter(property => {
      return !children.find(c => c._name === property)
    })

    let pluralizedMessage 
    if (missingProperties.length === 1) {
      pluralizedMessage = `Property ${missingProperties[0]} is required`
    }

    if (missingProperties.length > 1) {
      missingProperties = missingProperties.join(',').replace(/,/g, ', ').replace(/,\s([^,]+)$/, ' and $1')
      pluralizedMessage = `Properties ${missingProperties} are required`
    }

    return [
      missingProperties.length === 0, 
      pluralizedMessage
    ]
  }
}


module.exports = Required