import { gql } from "apollo-server-core";
import { resolvers } from "./resolver";
import { gqlModule, registerModules } from "./module";

const userTypes = gql`
  type User {
    name: String
    password: String
  }

  type UsersOutput {
    payload: [User]
  }
`;

const userQueries = resolvers({
  getAllUsers: {
    handler(...args) {},
    type: ": UsersOutput",
  },
});

const userModule = gqlModule({
  resolvers: {
    queries: userQueries,
  },
  types: [userTypes],
});

const { resolvers: builtResolvers, typeDefs } = registerModules([userModule]);

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

//   type UsersOutput {
//     payload: [User]
//   }

//   type Query {
//     getAllUsers: UsersOutput
//   }
