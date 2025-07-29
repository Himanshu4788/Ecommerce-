const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    // Connect to MongoDB using the DB environment variable from your .env file.
    // This was changed from process.env.DB_URI to process.env.DB to match your .env.
    .connect(process.env.DB, { 
      useNewUrlParser: true, // Recommended option for parsing connection strings
      useUnifiedTopology: true, // Recommended option for new server discovery and monitoring engine
      // useCreateIndex: true, // This option is deprecated in Mongoose 6+ and can be removed.
    })
    .then((data) => {
      // Log success message if connection is established
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      // Catch any errors during the connection process and log them
      console.error(`MongoDB connection error: ${err.message}`);
      // Exit the process if the database connection fails, as the application cannot function without it.
      process.exit(1); 
    });
};

module.exports = connectDatabase;
