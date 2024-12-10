import { gql } from "apollo-server-core";
import { Module } from "../types/module.type";
import { setupResolvers } from "../resolver";
import { DocumentNode } from "graphql";

export const gqlModule = <T>(module: Module & T) => module;

const getResolvers = ({
  queryType = "",
  mutationType = "",
  collectedResolvers = { Query: {}, Mutation: {} },
}) => {
  let resolverTypes = "";
  const resolvers: Record<string, any> = {};

  const queriesType = queryType.trim()
    ? `  type Query {\n    ${queryType.trim()}\n  }`
    : "";

  const mutationsType = mutationType.trim()
    ? `  type Mutation {\n    ${mutationType.trim()}\n  }`
    : "";

  if (mutationsType) {
    resolvers.Mutation = collectedResolvers.Mutation;
    resolverTypes += mutationsType;
  }

  if (queriesType) {
    resolvers.Query = collectedResolvers.Query;
    resolverTypes += queriesType;
  }

  return { resolverTypes, resolvers };
};

export const registerModules = (modules: Module[] = []) => {
  const types: DocumentNode[] = [];

  let mutationType = ``;

  let queryType = ``;

  const collectedResolvers = {
    Query: {},
    Mutation: {},
  };

  modules.forEach((module) => {
    if (module.types) {
      types.push(...module.types);
    }

    const {
      types: resolverTypes,
      resolvers: { mutations: resolverMutations, queries: resolverQueries },
    } = setupResolvers(module.resolvers);

    if (resolverTypes.queryType) {
      queryType += resolverTypes.queryType;

      collectedResolvers.Query = {
        ...collectedResolvers.Query,
        ...resolverQueries,
      };
    }

    if (resolverTypes.mutationType) {
      mutationType += resolverTypes.mutationType;

      collectedResolvers.Mutation = {
        ...collectedResolvers.Mutation,
        ...resolverMutations,
      };
    }
  });

  const { resolverTypes, resolvers } = getResolvers({
    queryType,
    mutationType,
    collectedResolvers,
  });

  return {
    typeDefs: gql(
      `${types
        .map((t) => (t.kind ? t.loc?.source?.body : t))
        .join("")}\n${resolverTypes}`
    ),
    resolvers,
  };
};
