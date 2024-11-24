import { mergeResolvers } from "@graphql-tools/merge";
import usersResolvers from "./users.resolvers.js";
import transactionResolver from "./transactions.resolvers.js";


const mergedResolvers = mergeResolvers([usersResolvers, transactionResolver]);

export default mergedResolvers;