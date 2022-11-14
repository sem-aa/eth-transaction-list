const mongoose = require("mongoose");
// require("dotenv").config();

const uriDb = process.env.DB_CONN_STRING;

const db = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("error", (error) => {
  console.log(`Mongoose error: ${error}`);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection to DB closed and app termination");
    process.exit(1);
  });
});

module.exports = db;
