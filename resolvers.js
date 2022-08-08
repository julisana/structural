const Department = require('./models/department')
const Person = require('./models/person')

const DepartmentResolver = require('./resolvers/department')
const PersonResolver = require('./resolvers/person')

module.exports = {
  Query: {
    /**
     * Query a specific department from the database
     *
     * @param _ (parent)
     * @param id (args)
     * @returns {Promise}
     */
    department: async (_, {id}) => {
      return await Department.findOne({id: id})
    },
    /**
     * Search for departments in the database
     *
     * @param _ (parent)
     * @param args
     * @returns {Promise}
     */
    departments: async (_, args) => {
      let limit = null
      if ( args.hasOwnProperty( 'limit' ) ) {
        limit = args.limit
        delete args.limit
      }

      let query = {}
      if ( Object.keys(args).length !== 0 ) {
        query = args
      }

      return await Department.find(query).limit(limit)
    },
    /**
     * Query a specific person from the database
     *
     * @param _ (parent)
     * @param id (args)
     * @returns {Promise}
     */
    person: async (_, {id}) => {
      return await Person.findOne({id: id})
    },
    /**
     * Search for people in the database
     *
     * @param _ (parent)
     * @param args
     * @returns {Promise}
     */
    people: async (_, args) => {
      let limit = null
      if ( args.hasOwnProperty( 'limit' ) ) {
        limit = args.limit
        delete args.limit
      }

      let query = {}
      if ( Object.keys(args).length !== 0 ) {
        query = args
      }

      return await Person.find(query).limit(limit)
    },
  },

  Mutation: {
    /**
     * Modifies the specified document and returns the updated version to the user
     *
     * @param _ (parent)
     * @param id (args)
     * @param personInput (args)
     * @returns {Promise}
     */
    update_person: async (_, {id, personInput: personInput}) => {
      return await Person.findOneAndUpdate({id: id}, personInput, {new: true})
    },
  },

  //Most fields are handled by the default type definitions found within Apollo, but the fields defined in these files
  //needed more than just the defaults.
  Department: DepartmentResolver,
  Person: PersonResolver,
}
