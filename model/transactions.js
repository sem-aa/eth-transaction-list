const Transaction = require("./schemas/transaction");

const addTransactionsBd = async (body) => {
  try {
    const result = await Transaction.create(body);
    return result;
  } catch (e) {
    console.log(e);
  }
};

const getAllTransactions = async () => {
  try {
    const result = await Transaction.find();
    return result;
  } catch (e) {
    console.log(e);
  }
};

const getQueryTransactions = async (query, page) => {
  try {
    const pages = Math.ceil((await Transaction.countDocuments(query)) / 10);
    const result = await Transaction.find(
      query,
      {},
      { skip: page * 10, limit: 10 }
    );
    return { result, pages };
  } catch (e) {
    console.log(e);
  }
};

const updateTransactions = async (blockNumber, blockConfirm) => {
  try {
    const result = await Transaction.updateMany(
      { blockNumber: blockNumber },
      { blockConfirm: blockConfirm }
    );
    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  addTransactionsBd,
  getAllTransactions,
  updateTransactions,
  getQueryTransactions,
};
