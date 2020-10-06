const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://dbAdmin1:CnrW1RRpcQgelEa9@cluster0.hf9wk.mongodb.net/CaseStudy?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB Connected....');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;