import axios from "axios";
// const URL = "http://localhost:4444";

export const getAllTransactions = (query, page) =>
  axios
    .post("/api/transactions", {
      query: query,
      page: page,
    })
    .then((response) => response.data.data)
    .catch((e) => console.log(e));
