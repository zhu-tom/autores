import mongoose from 'mongoose';

export async function connectToDatabase() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb+srv://admin:YNhkygw6K3G63yJS@cluster0.37ihr.mongodb.net/autores?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }
}