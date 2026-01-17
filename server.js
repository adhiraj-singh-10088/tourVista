const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

let server;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
    // Fallback timeout to force exit if server.close hangs
    setTimeout(() => {
      process.exit(1);
    }, 5000).unref();
  } else {
    process.exit(1);
  }
});

const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log('DB connection error:', err);
  });

const port = process.env.PORT;
server = app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
