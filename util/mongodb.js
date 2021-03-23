import mongoose from 'mongoose';

export async function connectToDatabase() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb://localhost:27017/autores", {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }
}
