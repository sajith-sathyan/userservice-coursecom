export default function connection(mongoose, config, options) {
  mongoose
  .connect(
    "mongodb+srv://sajith:nnBzi1Pz39Mj69aF@cluster0.m8hdckt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
  
    return {
      connectToMongo
    };
  }