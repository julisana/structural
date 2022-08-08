const {gql} = require('apollo-server')

module.exports = gql`
  """
  Collection: departments

  Description: List of all departments in the organization
  """
  type Department {
    "Unique identifier of the department. This is different than the MongoDB unique _id value"
    id: String!
    "Name of the department"
    name: String!
    "List of employees that work in the department"
    employees: [Person!]
  }

  """
  Collection: people

  Description: List of all people in the organization
  """
  type Person {
    "Unique identifier of the person. This is different than the MongoDB unique _id value"
    id: String!
    "Person's first name"
    firstName: String
    "Person's last name"
    lastName: String
    "Person's job title"
    jobTitle: String
    "Department the person works in"
    department: Department
    "Manager of the user"
    manager: Person
    "List of people who are managed by the user"
    subordinates: [Person!]
  }

  """
  Input fields available for the Person object. All fields are optional, only fields that are populated will be updated
  in the database
  """
  input PersonInput {
    "Person's first name"
    firstName: String
    "Person's last name"
    lastName: String
    "Person's job title"
    jobTitle: String
    "'id' (not _id) of the department the person is associated with"
    departmentId: String
    "'id' (not _id) of the person's manager"
    managerId: String
  }

  type Query {
    """
    Query a single department, based on ID

    @param string id - ID of the department you want to access. Note, this is different than the MongoDB _id field
    """
    department(id: String): Department
    """
    Search for the desired department(s).

    @param string name - Name of the department(s) you want to find. Default: null (all records will match)\n\n
    @param int limit - Max number of records to return Default: null (all matching records will be returned)
    """
    departments(name: String, limit: Int): [Department]

    """
    Query a single person, based on ID

    @param string id - ID of the person you want to access. Note, this is different than the MongoDB _id field
    """
    person(id: String): Person
    """
    Search for the desired user(s)

    @param string firstName - First name of the user(s) you want to find. Default: null\n\n
    @param string lastName - Last name of the user(s) you want to find. Default: null\n\n
    @param string jobTitle - Job title of the user(s) you want to find. Default: null\n\n
    @param string departmentId - Department ID of the user(s) you want to find. Default: null\n\n
    @param string managerId - Manager ID of the user(s) you want to find. Default: null\n\n
    @param int limit - Max number of records to return Default: null (all matching records will be returned)
    """
    people(firstName: String, lastName: String, jobTitle: String, departmentId: String, managerId: String, limit: Int): [Person!]
  }

  type Mutation {
    """
    Update a specific person in the database

    @param string id - ID of the person that will be updated\n\n
    @param PersonInput personInput - Data points that should be updated on the user. Fields available are: 
      firstName, lastName, jobTitle, departmentId, managerId
    """
    update_person(id: String!, personInput: PersonInput): Person!
  }
`
