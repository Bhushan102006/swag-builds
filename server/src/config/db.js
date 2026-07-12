const mongoose = require("mongoose");

async function connectDB() {
  console.log("Connecting to MongoDb...");
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDb connected sucessfully ")
  }catch(err){
    console.log("MongoDB connection error", err)
  }
}

module.exports = connectDB