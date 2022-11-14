const {
  getLastBlockTransactions,
  getLastBlockNumber,
} = require("../services/api-eth");
const {
  addTransactionsBd,
  getAllTransactions,
  getQueryTransactions,
  updateTransactions,
} = require("../model/transactions");
const { MAX_QNT_BLOCK } = require("../helpers/constants");

const getTransactions = async (req, res, next) => {
  const { page, query } = req.body;
  const result = await getQueryTransactions(query, page);
  return res.status(200).json({ data: result });
};

const updateBlockConfirm = async (currentBlockNumber) => {
  const result = await getAllTransactions();
  const uniqBlockNumber = result.reduce((arr, item) => {
    if (!arr.includes(item.blockNumber)) {
      arr.push(item.blockNumber);
    }
    return arr;
  }, []);
  for (number of uniqBlockNumber) {
    const newBlockConfir =
      parseInt(currentBlockNumber, 16) - parseInt(number, 16);
    await updateTransactions(number, newBlockConfir);
  }
  return uniqBlockNumber.length;
};

const addTransactionsToBd = async () => {
  const allTransactionFromBd = await getAllTransactions();
  const lastNumberBlock = await getLastBlockNumber();
  if (!allTransactionFromBd.length) {
    const result = await getLastBlockTransactions(lastNumberBlock);
    await addTransactionsBd(result);
    return addTransactionsToBd();
  }
  if (
    lastNumberBlock !==
    allTransactionFromBd[allTransactionFromBd.length - 1].blockNumber
  ) {
    const result = await getLastBlockTransactions(lastNumberBlock);
    if (qntAddBlock >= MAX_QNT_BLOCK) {
      console.log(`Add to DB ${MAX_QNT_BLOCK}`);
      return;
    }
    const qntAddBlock = await updateBlockConfirm(lastNumberBlock);
    await addTransactionsBd(result);
  } else {
    await wait(5000);
    return addTransactionsToBd();
  }
  await wait(5000);
  return addTransactionsToBd();
};

addTransactionsToBd();

const wait = async (time) => {
  console.log("wait");
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, time);
  });
};

module.exports = {
  getTransactions,
  addTransactionsToBd,
};
