const Person = require('../models/person')
const Department = require('../models/department')

/**
 * Resolve any relationships for the type definition
 */
module.exports = {
  //What department is the user in?
  department: async ({departmentId}) => {
    if (typeof departmentId == 'undefined' || !departmentId) {
      return null
    }

    return await Department.findOne({id: departmentId})
  },
  //Who is the user's manager?
  manager: async ({managerId}) => {
    if (typeof managerId == 'undefined' || !managerId) {
      return null
    }

    return await Person.findOne({id: managerId})
  },
  //Who works for the user?
  subordinates: async ({id}) => {
    if (typeof id == 'undefined' || !id) {
      return null
    }

    return await Person.find({managerId: id})
  }
}
