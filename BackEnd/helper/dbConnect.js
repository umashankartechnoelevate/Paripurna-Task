const mongoose = require("mongoose");
const db = {
  connect: (url, options) => {
    mongoose.connect(url, options);

    mongoose.connection.on("open", () => {
      console.log("connected to mongo successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Mongoose default connection error :", err.message);
    });
  },
};

module.exports.db = db;
