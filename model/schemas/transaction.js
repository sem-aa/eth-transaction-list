const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const transactionSchema = new Schema(
  {
    blockHash: String,
    blockNumber: String,
    from: String,
    gas: String,
    gasPrice: String,
    maxFeePerGas: String,
    maxPriorityFeePerGas: String,
    hash: String,
    input: String,
    nonce: String,
    to: String,
    transactionIndex: String,
    value: String,
    type: String,
    accessList: Array,
    chainId: String,
    timestamp: String,
    blockConfirm: Number,
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
