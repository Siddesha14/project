const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/error');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Verify and mount routers
const mountRoutes = (path, routerModule) => {
  if (!routerModule || typeof routerModule !== 'function') {
    console.error(`Invalid router module for path: ${path}`);
    throw new Error(`Invalid router module for path: ${path}`);
  }
  app.use(path, routerModule);
};

try {
  // Load and verify routes
  mountRoutes('/api/auth', require('./routes/authRoutes'));
  mountRoutes('/api/donor', require('./routes/donorRoutes'));
  mountRoutes('/api/hospital', require('./routes/hospitalRoutes'));
  mountRoutes('/api/bloodbank', require('./routes/bloodBankRoutes'));
  mountRoutes('/api/requests', require('./routes/requestRoutes'));
  mountRoutes('/api/stats', require('./routes/statsRoutes'));
} catch (err) {
  console.error('Route mounting failed:', err.message);
  process.exit(1);
}

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});