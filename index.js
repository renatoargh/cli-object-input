const Ui = require('./lib/ui')

const ui = new Ui({
  "type": "array",
  "minItems": 2,
  "maxItems": 3,
  "items": {
    "type": "object",
    "required": ["name", "sbrubbles"],
    properties: {
        "name": {
          "type": "string",
          "minLength": 1,
          "maxLength": 5,
          "nullable": true,
          "description": "Name of the group",
          "example": "my_group",
          "default": "Wopa"
        },
        // "secret_pass": {
        //   "type": "string",
        //   "format": "password",
        //   "minLength": 3
        // },
        // "someBytes": {
        //   "type": "string",
        //   "format": "byte"
        // },
        // "a_nice_boolean_property": {
        //   "type": "boolean",
        //   "description": "Name of the group"
        // },
        // "parentId": {
        //   "type": "string",
        //   "format": "uuid",
        //   "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
        //   "description": "ID of the parent group as a string",
        //   "example": "dc952b4a-5b3d-4ff9-8431-796c77643cc9"
        // },
        // "deviceIds": {
        //   "type": "array",
        //   "items": {
        //     "type": "object",
        //     "required": [
        //       "name",
        //       "parentId"
        //     ],
        //     "properties": {
        //       "name": {
        //         type: 'string',
        //         example: 'sbrubbles'
        //       },
        //       "age": {
        //         type: 'number'
        //       }
        //     },
        //   },
        //   "description": "IDs for the devices belonging to the group"
        // },
        // "groups": {
        //   type: "array",
        //   items: {
        //     type: "object",
        //     "properties": {
        //       "sbrubbles": {
        //         "type": "string",
        //         "example": "asdasd",
        //         "default": "lololo"
        //       },
        //       "arrayDeString": {
        //         type: "array",
        //         items: {
        //           "type": "string",
        //           example: "alalao"
        //         } 
        //       }
        //     }
        //   }
        // },
    }
  }
})

async function main () {
  const results = await ui.getUserInput()
  console.log(JSON.stringify(results, null, 2))
}

main()
