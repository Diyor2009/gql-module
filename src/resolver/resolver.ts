import {
  ModuleResolver,
  OutputResolvers,
  Resolvers,
  UnknownResolvers,
} from "src/types";

export const moduleResolvers = <T>(moduleResolvers: ModuleResolver & T) =>
  moduleResolvers;

export const resolvers = <T>(resolvers: Resolvers & T) => resolvers;

const buildResolvers = (resolvers: Resolvers) => {
  const builtResolvers: UnknownResolvers = {};
  let resolverType = ``;

  Object.keys(resolvers).forEach((resolverName) => {
    const resolver = resolvers[resolverName];
    const { type, handler } = resolver;

    resolverType += `${resolverName}${type}`;

    const builtResolver = (_: any, args: any, context: any) => {
      return handler(args, context);
    };

    builtResolvers[resolverName] = builtResolver;
  });

  return { builtResolvers, resolverType };
};

export const setupResolvers = (resolvers: ModuleResolver) => {
  const { queries, mutations } = resolvers;

  const outputResolvers: OutputResolvers = {
    mutations: {},
    queries: {},
  };

  let queryType = ``;
  let mutationType = ``;

  if (queries) {
    const { builtResolvers, resolverType } = buildResolvers(queries);

    queryType = resolverType;
    outputResolvers.queries = builtResolvers;
  }

  if (mutations) {
    const { builtResolvers, resolverType } = buildResolvers(mutations);
    mutationType = resolverType;
    outputResolvers.mutations = builtResolvers;
  }

  return {
    types: { queryType, mutationType },
    resolvers: outputResolvers,
  };
};
