import mongoose from 'mongoose';

export async function connectToDatabase() {
  if (!mongoose.connections[0].readyState) {
    try {
      await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true
      });
    } catch (e) {
      console.log(e);
    }
    
  }
}
