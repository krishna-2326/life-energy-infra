const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/life_energy_db', {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] Initial connection failed: ${error.message}`);
    console.log(`[MongoDB Notice] Make sure MongoDB service is running locally or MONGO_URI in .env is updated to MongoDB Atlas.`);
  }
};

module.exports = connectDB;
