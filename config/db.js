const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");
// "mongodb://localhost:27017/moving",
//     "mongodb://arnas:630allenSt.@159.89.155.12:27017/moving",

const connectDB = async () => {
  console.log("well this works");

  var options = {
    // db: { native_parser: true },
    useNewUrlParser: true,
    useCreateIndex: true
  };

  try {
    await mongoose.connect(db, options);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
