import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, context) => {
      try {
        const authUser = context.getUser();
        if (!authUser) throw new Error("UnAuthorized");

        const userId = await authUser._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error("Error in Transactions Query", error);
        throw new Error(
          error.message || "Something went wrong in fetching transactions"
        );
      }
    },

    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.finById(transactionId);
        return transaction;
      } catch (error) {
        console.error("Error in Transaction Query", error);
        throw new Error(
          error.message ||
            "Something went wrong in fetching transaction details"
        );
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await transaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error in Create Transaction", error);
        throw new Error(
          error.message || "Something went wrong while creating the Transaction"
        );
      }
    },
    updateTransaction: async (_, { input }, context) => {
      try {
        const updatedTransaction = await Transaction.finByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        console.error("Error in Create Transaction", error);
        throw new Error(
          error.message || "Something went wrong while updating the Transaction"
        );
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.finByIdAndDelete(transactionId);
        return deletedTransaction;
      } catch (error) {
        console.error("Error in Create Transaction", error);
        throw new Error(
          error.message || "Something went wrong while updating the Transaction"
        );
      }
    },
  },
};

export default transactionResolver;
