import mongoose from 'mongoose';

const database = async (req, res, next) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    next();
  }
  // Use new db connection
  await mongoose.connect("mongodb://127.0.0.1:27017/autores", {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  });
  next();
};

export default database;