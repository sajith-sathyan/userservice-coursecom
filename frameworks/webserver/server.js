export default function serverConfig(app,mongoose,config){



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017');

// Get the default connection
const db = mongoose.connection;

// Event handling for successful connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Event handling for connection error
db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Event handling for disconnection
db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Close the MongoDB connection when the Node process is terminated
process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
});

    function startServer(){
        app.listen(config.port,()=>{
            console.log(`UserAuth Server Start At port${config.port}`)
        })
    }
    return{
        startServer 
    }
}