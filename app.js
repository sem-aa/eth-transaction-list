const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const routes = require("./routes/routes");
const db = require("./model/db");
const path = require('path')

const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/api", routes);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Wrong path",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

app.use("/", express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});


db.then(() => {
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}).catch((error) =>
  console.log(`Server not running. Error message: ${error.message}`)
);
