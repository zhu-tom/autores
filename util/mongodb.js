import mongoose from 'mongoose';

export async function connectToDatabase() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb+srv://"+ process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "/autores?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }
}