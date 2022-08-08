const Person = require('../models/person')

/**
 * Resolve any relationships for the type definition
 */
module.exports = {
  //Who works in the department?
  employees: async ({id}) => {
    if (typeof id == 'undefined' || !id) {
      return null
    }

    return await Person.find({departmentId: id})
  }
}
