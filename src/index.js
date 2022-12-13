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
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mern-blog-app.onrender.com"],
  })
);

app.use("/api/auth", authRouter);

app.use("/api/courses", courseRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
