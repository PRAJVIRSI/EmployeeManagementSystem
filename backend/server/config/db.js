const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb+srv://purohitrajvirsinh5:MongoDb123@cluster0.xcj0d1l.mongodb.net/Assignment2?retryWrites=true&w=majority&appName=Cluster0");

  console.log(` Database connection established `);
};

module.exports = connectDB;
