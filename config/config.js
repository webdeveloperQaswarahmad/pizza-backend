const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const url = process.env.MONGO_URI;
    const connect = await mongoose.connect(url, {
      dbName: 'PIZZA',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Database Connected! ${connect.connections[0].host}`);
  } catch (error) {
    console.log(`error:  ${error.message}`);
  }
};
module.exports = connectDatabase;
