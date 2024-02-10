const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const url = process.env.MONGO_URI;
    const connect = await mongoose.connect(url, {
      dbName: 'PIZZA',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
  }
};
module.exports = connectDatabase;
