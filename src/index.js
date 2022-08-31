const express = require("express");

const app = express();
const db = require("./config/db/index");

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const PORT = 5000;

// Connect to DB
db.connect();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
