const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mern-blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB ");
  } catch (e) {
    console.log("Error connecting to MongoDB ");
    process.exit(1);
  }
};

module.exports = { connect };
