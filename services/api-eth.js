const axios = require("axios");
// require("dotenv").config();

const { API_KEY_ETH } = process.env;
const BASE_URL = "https://api.etherscan.io/api";

const getLastBlockNumber = async () => {
  const result = await axios.get(
    `${BASE_URL}?module=proxy&action=eth_blockNumber&apikey=${API_KEY_ETH}`
  );
  const blockNumber = result.data.result;
  return blockNumber;
};

const getLastBlockTransactions = async (lastBlock) => {
  const arrTransactions = await axios.get(
    `${BASE_URL}?module=proxy&action=eth_getBlockByNumber&tag=${lastBlock}&boolean=true&apikey=${API_KEY_ETH}`
  );
  const arr = arrTransactions.data.result.transactions;
  const { timestamp } = arrTransactions.data.result;
  for (item of arr) {
    item.blockConfirm = 0;
    item.timestamp = timestamp;
  }

  return arr;
};

module.exports = { getLastBlockTransactions, getLastBlockNumber };
