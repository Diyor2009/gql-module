import { gql } from "apollo-server-core";
import { gqlModule, registerModules } from "./module";
import { resolvers } from "./resolver";

export * from "./module";
export * from "./resolver";
export * from "./service";
export * from "./types";

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
    handler() {},
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
console.log("typeDefs", typeDefs.loc.source.body);
