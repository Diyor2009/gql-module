export type Resolver = {
  type: string;
  handler: (...args: any[]) => any;
};

export type Resolvers = Record<string, Resolver>;

export type UnknownResolvers = Record<string, (...args: any) => any>;

export type OutputResolvers = {
  queries: UnknownResolvers;
  mutations: UnknownResolvers;
};
