# GraphQL Module Builder 🚀

**GraphQL Module Builder** is a library designed to simplify working with GraphQL modules, enabling you to quickly create, register, and combine types and resolvers into a modular structure.

## Purpose and Motivation 🌟

### 1. **Simplifying Modular Architecture Development in GraphQL** 🛠️

As GraphQL applications scale, organizing the codebase can become challenging. This library allows developers to structure code using modules, where each module encapsulates types and resolvers for a specific functionality.

### 2. **Improved Readability and Maintainability** 📚

A clear, module-based structure makes the code easy to understand and maintain. Each module manages a distinct part of the application, reducing conflicts between resolvers and simplifying the addition of new features.

### 3. **Automated Type and Resolver Aggregation** 🤖

Instead of manually aggregating types and resolvers, the library automatically generates the final `typeDefs` and `resolvers`. This eliminates repetitive tasks, reduces errors, and accelerates development.

### 4. **Flexibility in Resolver Creation** ⚡

The library provides a straightforward API for creating resolvers with clear separation of queries, mutations, and subscriptions. This lets developers focus on business logic rather than infrastructure details.

---

## Installation 📦

Install the library using npm or yarn:

```bash
npm install gql-module
```

or

```bash
yarn add gql-module
```

---

## Usage 💡

Here’s an example of how to use **GraphQL Module Builder**:

```typescript
import { gql } from "apollo-server-core";
import { resolvers, gqlModule, registerModules } from "gql-module";

// 📄 Define GraphQL types
const userTypes = gql`
  type User {
    name: String
    password: String
  }

  type UsersOutput {
    payload: [User]
  }
`;

// 🔧 Define GraphQL resolvers
const userQueries = resolvers({
  getAllUsers: {
    handler: async () => {
      // Simulate fetching data
      return { payload: [{ name: "Alice", password: "hidden" }] };
    },
    type: ": UsersOutput",
  },
});

// 🧩 Create a GraphQL module
const userModule = gqlModule({
  resolvers: {
    queries: userQueries,
  },
  types: [userTypes],
});

// 🔗 Register modules and retrieve final types and resolvers
const { resolvers: builtResolvers, typeDefs } = registerModules([userModule]);

// ✅ Log results
console.log("builtResolvers", builtResolvers);
// Result:
// builtResolvers { Query: { getAllUsers: [Function: builtResolver] } }

console.log("typeDefs", typeDefs.loc.source.body);
// Result:
// typeDefs
//   type User {
//     name: String
//     password: String
//   }
//
//   type UsersOutput {
//     payload: [User]
//   }
//
//   type Query {
//     getAllUsers: UsersOutput
//   }
```

---

## License 📜

This library is distributed under the MIT License. The full license text can be found in the [LICENSE](./LICENSE) file.

---

We hope this library simplifies your work with GraphQL! 💻 If you have ideas for improvements or encounter issues, we’d love to hear from you in the [Issues](https://github.com/Diyor2009/gql-module/issues) section!

