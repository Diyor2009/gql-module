import { Resolvers } from "./resolver.type";
import { DocumentNode } from "graphql";

export type ModuleResolver = {
  queries?: Resolvers;
  mutations?: Resolvers;
};

export type Module = {
  types?: DocumentNode[];
  resolvers: ModuleResolver;
};
