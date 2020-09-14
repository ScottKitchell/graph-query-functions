# 🛸 Graph Query Functions

A `gql` tag equivalent for [TypeScript](https://github.com/microsoft/TypeScript) without the query language bloat.

> ! work in progress (maybe) !

## How is it different?

This is a query using **Graph Query Language** (GQL).
```ts
const GetDogs = gql`
  query Dog($breed: String!) {
    dogs(breed: $breed) {
      id
      name
    }
  }
`
```

To get syntax highlighting, autocompletion, and linting for this `gql` tag you need to install
various extensions in your editor. **But why** when TypeScript can already do this for us?

This is the same query using **Graph Query Functions** (GQF).
```ts
const GetDogs = gqf((bread: string) => query({
  dogs: {
    with: { breed },
    id: 1,
    name: 1,
  }
}))
```

Hopefully the standard js syntax isn't as alien to you as GQL either!

Just like `gql`, `gqf` also outputs a `DocumentNode` and so can be used with popular gql libraries 
like Apollo.

```ts
const { data, loading, error } = useQuery(GetDogs, { variables: { breed: 'spoodle' }})

data?.dogs // [{id: 1, name: 'Fergus'}, {id: 2, name: 'Louie'}]
```


## Usage

Import the functions
```ts
import { gqf, query, mutation, subscription, fragment } from 'graph-query-functions'
```

### Query
```ts 
const GetDogs = gqf((bread: string) = query({
  dogs: {
    with: { breed },
    id: 1,
    name: 1,
    owner: {
      id: 1,
      name: 1,
    }
  }
}))
```

You might have noticed the `1`s. These values control whether to include the field of not. They don't have to be `1`, they could be `true`, `false`, `0` or any value that converts to a boolean. 

For example:
```ts
const GetDog = gqf((id: number, includeOwner: boolean) = query({
  dog: {
    with: { id },
    id: 1,
    name: 1,
    owner: includeOwner && {
      id: 1,
      firstName: 1,
    },
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
  dog: {
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

const GetOwner = gqf((id: number) = query({
  owner: {
    with: { id },
    id: 1,
    ...Names,
  }
}))
```
