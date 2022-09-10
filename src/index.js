require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth");
const cors = require("cors");
const courseRouter = require("./routes/course");
const app = express();
const db = require("./config/db/index");

const port = process.env.PORT || 8088;

// Connect to DB
db.connect();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

app.use("/api/courses", courseRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
