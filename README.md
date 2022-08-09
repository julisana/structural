# structural

## Getting Started
- Clone the git repository
- Switch to node 14 or greater (nvm is useful for this). Tested with 14.20.0 and 16.16.0.
- Run `npm install` to install all the packages for the application

## Running the Application
- Run `npm start` to start up the application itself.
- The system is listening on port 5000. To view the sandbox, go to `http://localhost:5000`

## Running Tests
- Start with `node node_modules/serverless/bin/serverless.js mongodb start`. The MongoDB service will be running on port 12345.
    - Alternative: run `npm install -g serverless` to install the serverless application globally, and then use `sls mongodb start` to start the mongodb instance
- In a new terminal tab, run `npm test` to run the test suite
- Output should look like the following:
```
➜  structural git:(main) ✗ npm test

> structural@1.0.0 test /Volumes/Samsung_T5/GitHub/structural
> jest

 PASS  __tests__/person-mutation.js
 PASS  __tests__/departments.js
 PASS  __tests__/department.js
 PASS  __tests__/person.js
 PASS  __tests__/people.js

Test Suites: 5 passed, 5 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        3.87 s, estimated 5 s
Ran all test suites.
```

### Example Queries
#### Departments
Query:
```graphql
query Departments {
  departments(name: "Operations") {
    id
    name
    employees {
      id
    }
  }
}
```

Results:
```json
{
  "data": {
    "departments": [
      {
        "id": "e573dd1c-4cd4-451d-a844-a25210e91135",
        "name": "Operations",
        "employees": [
          {
            "id": "2e463e7c-b35e-425a-aeac-2762c8bbbff3"
          },
          {
            "id": "ad0ccddc-f957-4ded-b44d-18fb39cb2250"
          },
          {
            "id": "cc59441e-2aac-4e50-adab-8697aca33ec3"
          },
          {
            "id": "ff2d59ff-b193-464b-8b98-690e0930e5c5"
          },
          {
            "id": "33c0ec12-c1a0-4281-8091-43f2ce59aa99"
          },
          {
            "id": "83f61bbb-e9e7-46f4-8e23-7005d7d29636"
          },
          {
            "id": "92bb1af6-a990-46a7-9588-458c84783e45"
          },
          {
            "id": "45b2e05f-3a8f-466b-9786-87ac75ec1e6f"
          },
          {
            "id": "c10f1ee8-aa20-44cf-a731-c401886549d2"
          },
          {
            "id": "eaed139f-308a-475c-8e51-979235335cb7"
          },
          {
            "id": "cb10a6ca-b5cd-4e8a-a3f7-a92804d7e601"
          }
        ]
      }
    ]
  }
}
```

#### Department
Query:
```graphql
query Department {
  department(id: "2b9edccb-41fc-4fc5-b832-ac86a034a877") {
    id
    name
    employees {
      id
      firstName
      lastName
      jobTitle
    }
  }
}
```
Results:
```json
{
  "data": {
    "department": {
      "id": "2b9edccb-41fc-4fc5-b832-ac86a034a877",
      "name": "Management",
      "employees": [
        {
          "id": "2798c35b-5b8f-4a5d-9858-0a818d48cbef",
          "firstName": "Orval",
          "lastName": "Hauck",
          "jobTitle": "CEO"
        },
        {
          "id": "6a56a153-05d6-4ce3-b6ec-c629a3815d81",
          "firstName": "Kody",
          "lastName": "Conn",
          "jobTitle": "Investor Data Associate"
        },
        {
          "id": "683287b8-4993-4c05-9dc0-0ae66844737c",
          "firstName": "Dorcas",
          "lastName": "Weber",
          "jobTitle": "National Integration Director"
        },
        {
          "id": "e499e3fb-d0d0-442b-ad6c-c44b4eb9038a",
          "firstName": "Myrl",
          "lastName": "Sanford",
          "jobTitle": "Dynamic Configuration Orchestrator"
        },
        {
          "id": "5dc61ac9-d0f3-456b-8c5d-2bdfbeee95c3",
          "firstName": "Zoie",
          "lastName": "Lesch",
          "jobTitle": "Corporate Identity Producer"
        },
        {
          "id": "cca3a445-0258-4b9f-963f-6ca495af0578",
          "firstName": "Hester",
          "lastName": "Hickle",
          "jobTitle": "Global Directives Manager"
        },
        {
          "id": "9eb5b46c-866f-4154-9c02-0278ba08167c",
          "firstName": "Luis",
          "lastName": "Gottlieb",
          "jobTitle": "Dynamic Accounts Executive"
        },
        {
          "id": "ffc3f5f4-3494-4f3e-b64a-4c5058d0ea61",
          "firstName": "Mateo",
          "lastName": "Schowalter",
          "jobTitle": "Principal Web Manager"
        },
        {
          "id": "47d59eee-fcf2-437a-997e-2c1c3c2ce12f",
          "firstName": "Freddy",
          "lastName": "Bradtke",
          "jobTitle": "Principal Research Supervisor"
        },
        {
          "id": "9d24311a-01c6-47a6-9e68-61bb363a7af2",
          "firstName": "Megane",
          "lastName": "Moore",
          "jobTitle": "Regional Program Engineer"
        },
        {
          "id": "665f6462-3a63-4914-b730-a56f66b9d445",
          "firstName": "Granville",
          "lastName": "McGlynn",
          "jobTitle": "Principal Accounts Producer"
        },
        {
          "id": "1f6c76a0-2954-433d-a1de-9f4e5f791014",
          "firstName": "Noble",
          "lastName": "Schneider",
          "jobTitle": "District Paradigm Strategist"
        }
      ]
    }
  }
}
```

#### People
Query:
```graphql
query People {
  people(limit:5) {
    id
    firstName
    lastName
    jobTitle
    department {
      name
    }
    manager {
      firstName
      lastName
      jobTitle
    }
    subordinates {
      id
    }
  }
}
```

Results:
```json
{
  "data": {
    "people": [
      {
        "id": "d72d5ed0-5bc8-422d-9603-c873bb9d3b2b",
        "firstName": "Frank",
        "lastName": "Collins",
        "jobTitle": "Chief Integration Director",
        "department": {
          "name": "Marketing"
        },
        "manager": {
          "firstName": "Marta",
          "lastName": "Schulist",
          "jobTitle": "Dynamic Quality Developer"
        },
        "subordinates": []
      },
      {
        "id": "252c982c-0770-41b1-824d-f6b847d84e36",
        "firstName": "Tevin",
        "lastName": "Johnson",
        "jobTitle": "District Research Executive",
        "department": {
          "name": "Engineering"
        },
        "manager": {
          "firstName": "Fleta",
          "lastName": "Moore",
          "jobTitle": "Senior Applications Architect"
        },
        "subordinates": [
          {
            "id": "c6297557-cc3d-4f8a-92b7-383e001e560f"
          }
        ]
      },
      {
        "id": "fe265097-a16f-48d8-a378-2beba254cdbb",
        "firstName": "Lois",
        "lastName": "Schimmel",
        "jobTitle": "Dynamic Response Representative",
        "department": {
          "name": "Sales"
        },
        "manager": {
          "firstName": "Asia",
          "lastName": "Streich",
          "jobTitle": "Dynamic Branding Orchestrator"
        },
        "subordinates": [
          {
            "id": "2e463e7c-b35e-425a-aeac-2762c8bbbff3"
          },
          {
            "id": "4af1baa3-aaeb-4fcf-96eb-5d2db0be644f"
          }
        ]
      },
      {
        "id": "46956d54-093b-47c0-9c15-e1c512e0c155",
        "firstName": "Stanley",
        "lastName": "Bergstrom",
        "jobTitle": "Global Creative Strategist",
        "department": {
          "name": "Marketing"
        },
        "manager": {
          "firstName": "Asia",
          "lastName": "Streich",
          "jobTitle": "Dynamic Branding Orchestrator"
        },
        "subordinates": [
          {
            "id": "ad0ccddc-f957-4ded-b44d-18fb39cb2250"
          },
          {
            "id": "900923b0-1296-442a-8d95-43f3cf598614"
          },
          {
            "id": "9d24311a-01c6-47a6-9e68-61bb363a7af2"
          },
          {
            "id": "78605b33-0d4c-4239-965c-d246e6098803"
          }
        ]
      },
      {
        "id": "67eb7ce0-dc60-4047-a188-bf90b92a76f4",
        "firstName": "Beatrice",
        "lastName": "McGlynn",
        "jobTitle": "Investor Functionality Manager",
        "department": {
          "name": "Marketing"
        },
        "manager": {
          "firstName": "Fleta",
          "lastName": "Moore",
          "jobTitle": "Senior Applications Architect"
        },
        "subordinates": []
      }
    ]
  }
}
```

#### Person
Query:
```graphql
query Person {
  person(id:"e371d011-f48c-4a76-abbe-a3df9a57e84c") {
    id
    firstName
    lastName
    department {
      name
    }
    manager {
      id
      firstName
      lastName
      jobTitle
    }
    subordinates {
      id
      firstName
      lastName
      jobTitle
    }
  }
}
```

Results:
```json
{
  "data": {
    "person": {
      "id": "e371d011-f48c-4a76-abbe-a3df9a57e84c",
      "firstName": "Casper",
      "lastName": "Tillman",
      "department": {
        "name": "Sales"
      },
      "manager": {
        "id": "4af1baa3-aaeb-4fcf-96eb-5d2db0be644f",
        "firstName": "Chasity",
        "lastName": "Steuber",
        "jobTitle": "Regional Applications Liaison"
      },
      "subordinates": [
        {
          "id": "24b5d32f-e285-495a-9524-c4157a0c14f9",
          "firstName": "Chanel",
          "lastName": "McKenzie",
          "jobTitle": "Customer Tactics Associate"
        }
      ]
    }
  }
}
```

### Example Mutations
#### Update Person
Before:
```json
{
  "data": {
    "person": {
      "id": "b7e29a6d-3586-4c11-8573-e9e283b94280",
      "firstName": "Geo",
      "lastName": "Howell",
      "jobTitle": "Legacy Group Designer"
    }
  }
}
```

Query:
```graphql
mutation UpdatePerson($id: String!, $personInput: PersonInput) {
  update_person(id: $id, personInput: $personInput) {
    id
    firstName
    lastName
    jobTitle
  }
}
```

Variables:
```json
{
  "id": "b7e29a6d-3586-4c11-8573-e9e283b94280",
  "personInput": {
    "lastName": "Location"
  }
}
```

Results:
```json
{
  "data": {
    "update_person": {
      "id": "b7e29a6d-3586-4c11-8573-e9e283b94280",
      "firstName": "Geo",
      "lastName": "Location",
      "jobTitle": "Legacy Group Designer"
    }
  }
}
```