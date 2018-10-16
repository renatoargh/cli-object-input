const assert = require('assert')
const sinon = require('sinon')

const ElementFactory = require('../lib/elementFactory')
const ObjectElement = require('../lib/objectElement')

describe('ObjectElement', () => {
  before(() => {
    // this.elementFactory = {
    //   build: sinon.stub()
    // }
    this.elementFactory = ElementFactory

    this.objectWithNoProperties = {
      type: 'object',
      properties: {}
    }
  })

  it('Can instantiate element with basic swagger spec', () => {
    new ObjectElement(this.objectWithNoProperties, this.elementFactory)
  })

  it('returns proper render if there are no properties', () => {
    const obj = new ObjectElement(this.objectWithNoProperties, this.elementFactory)
    const expected = '{\n\n}'
    const actual = obj.render()

    JSON.parse(actual)
    assert.equal(actual, expected)
  })

  it('returns proper render if there are no properties and indentation level is 1', () => {
    const obj = new ObjectElement(this.objectWithNoProperties, this.elementFactory, 1)
    const expected = '  {\n  \n  }'
    const actual = obj.render()

    JSON.parse(actual)
    assert.equal(actual, expected)
  })

  it('returns proper render if passing nested objects', () => {
    const obj = new ObjectElement({
      type: 'object',
      properties: {
        children: {
          type: 'object',
          properties: {}
        },
        other: {
          type: 'object',
          properties: {}
        }
      }
    }, this.elementFactory)

    const expected = '{\n  "children": {\n  \n  },\n  "other": {\n  \n  }\n}'
    const actual = obj.render()

    JSON.parse(actual)
    assert.equal(actual, expected)    
  })

  it('returns proper render if passing string property', () => {
    const obj = new ObjectElement({
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        address: {
          type: 'string'
        }
      }
    }, this.elementFactory)

    const expected = '{\n  "name": "",\n  "address": ""\n}'
    const actual = obj.render()

    JSON.parse(actual)
    assert.equal(actual, expected)    
  })

  it('returns proper render if passing array string property', () => {
    const obj = new ObjectElement({
    "type": "object",
    "required": [
      "name",
      "parentId"
    ],
    "properties": {
      "name": {
        "type": "string",
        "minLength": 1,
        "maxLength": 64,
        "pattern": "^(?!\\s*$).+",
        "description": "Name of the group",
        "example": "my_group"
      },
      "parentId": {
        "type": "string",
        "format": "uuid",
        "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
        "description": "ID of the parent group as a string",
        "example": "dc952b4a-5b3d-4ff9-8431-796c77643cc9"
      },
      "deviceIds": {
        "type": "array",
        "items": {
          "type": "object",
          "required": [
            "name",
            "parentId"
          ],
          "properties": {
            "name": {
              type: 'string'
            }
          },
        },
        "description": "IDs for the devices belonging to the group"
      }
    },
    "additionalProperties": false
  }, this.elementFactory)

    const expected = '{\n  "name": "",\n  "address": ""\n}'
    
    const actual = obj.render()

    console.log(actual)

    console.log(JSON.stringify(JSON.parse(actual), null, 2))
    assert.equal(actual, expected)    
  })
})