# 🛸 Graph Query Functions

A `gql` tag equivalent for TypeScript without the query language bloat.

> ! work in progress (maybe) !

## How is it different?

This is a query using **Graph Query Language**.
```ts
const GetDogPhoto = gql`
  query Dog($breed: String!) {
    dogs(breed: $breed) {
      id
      name
    }
  }
`
```

To get syntax highlighting, autocompletion, and linting for this `gql` tag you need to install
various extensions in your editor. *Sounds similar to what TypeScript does already does...*

This is the same query using **Graph Query Functions**.
```ts
const GetDogPhoto = gqf((bread: string) => query({
  dogs: {
    with: { breed },
    id: 1,
    name: 1,
  }
}))
```

Both output a `DocumentNode` when evaluated and be used with popular tools like Apollo.

```ts
const { data, loading, error } = useQuery(GetDogPhoto)

data?.dogs // [{id: 1, name: Fergus}, {id: 2, name: Louie}]
```


## Usage

Import the functions
```ts
import { gqf, query, mutation, subscription, fragment } from 'graph-query-functions'
```

### Query
```ts 
const GetDog = gqf((bread: string) = query({
  dogs: {
    with: { breed },
    id: 1,
    name: 1,
  }
}))
```

### Mutation
```ts
const AddDog = gqf((name: string, breed: string) => mutation({
  addDog: {
    with: { name, breed },
    id: 1,
    name: 1,
    breed: 1,
  }
}))
```

### Subscription
```ts
const OnDogAdded = gqf((breed: string) => subscription({
  dogs: {
    with: { breed },
    id: 1,
    name: 1,
  }
}))
```

### Fragment
```ts
const Names = gqf(() = fragment({
    firstName: 1,
    lastName: 1,
  }
}))

const GetUser = gqf((id: number) = query({
  user: {
    with: { id },
    id: 1,
    ...Names
  }
}))
```
