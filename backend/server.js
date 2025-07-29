const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception
// This block catches synchronous errors that are not handled by try...catch blocks.
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1); // Exit the process with a failure code
});

// Config - Load environment variables from .env file
// The path is corrected to point to your .env file located inside the 'config' folder
// relative to the 'backend' directory where server.js resides.
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/.env" }); 
}

// Connecting to database
// This function call initiates the MongoDB connection using Mongoose.
connectDatabase();

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the server and listen on the specified port
// The PORT is now correctly accessed from process.env, which is loaded by dotenv.
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
// This block catches asynchronous errors (promise rejections) that are not handled
// by .catch() blocks. It's crucial for preventing silent failures in Node.js applications.
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  // Close the server gracefully before exiting the process
  server.close(() => {
    process.exit(1); // Exit the process with a failure code
  });
});
