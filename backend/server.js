// ********************************************************************************************* IMPORTS
const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

// ********************************************************************************************* EXCEPTION
// Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

// ********************************************************************************************* ENV
// Setting up config file
//if (process.env.NODE_ENV !== 'PRODUCTION')
require('dotenv').config({ path: 'backend/config/config.env' });

// ********************************************************************************************* DATABASE
// Connecting to database
connectDatabase();

// ********************************************************************************************* CLOUDINARY
// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// ********************************************************************************************* REJECTION
// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
