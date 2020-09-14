type Falsy = false | null | 0 | -0 | ""
type Related<T> = T | Falsy
type With<T> = T | Falsy

interface Company {
  with?: With<{ id?: number }>
  id?: any
  name?: any
}

interface User {
  with?: With<{ id?: number }>
  id: any
  firstName?: any
  lastName?: any
  company?: Related<Company>
}

interface QuerySchema {
  user?: Related<User>
  company?: Related<Company>
}

function query(query: QuerySchema) {
  return query
}

const GetDogs = () => query({
  user: {
    firstName: 1,
    cool: 1,
  }
})

type Query<T> = (args: T) => QuerySchema

function gqf<T>(query: Query<T>) {
  return query
}


type GetUserVars = { id: number, includeCompany: boolean }
const GET_USER = gqf(({id, includeCompany}: GetUserVars) => query({
  user: {
    with: {id},
    id: 0,
    firstName: includeCompany,
    company: includeCompany && {
      id: 1,
      name: 1,
    },
  }
}))
