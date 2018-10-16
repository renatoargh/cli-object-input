const assert = require('assert')
const sinon = require('sinon')

const ElementFactory = require('../lib/elementFactory')
const ObjectElement = require('../lib/objectElement')

const rootElement = ElementFactory.build({
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
  }
})

console.log(rootElement.render())
