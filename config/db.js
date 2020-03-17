const mongoose = require('mongoose');
const config = require('config');

const dbConfig = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);

    // terminate with failure
    process.exit(1);
  }
};

module.exports = connectDB;
