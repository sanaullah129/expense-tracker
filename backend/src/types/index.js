import transactionTypeDef from "./transactions.types.js";
import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./users.type.js";

const mergedTypes = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypes;