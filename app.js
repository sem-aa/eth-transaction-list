const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();
const server = require("http").createServer(app);
const routes = require("./routes/routes");
const db = require("./model/db");

const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/api", routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
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
