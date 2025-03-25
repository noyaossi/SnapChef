import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import apiRoutes from './routes/api.js';

/**
 * Main server application
 */
class Server {
  constructor() {
    this.app = express();
    this.port = config.port;
    this.setupMiddleware();
    this.setupRoutes();
  }

  /**
   * Set up middleware
   */
  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  }

  /**
   * Set up routes
   */
  setupRoutes() {
    this.app.use('/api', apiRoutes);
  }

  /**
   * Start the server
   */
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
      console.log(`Health check: http://localhost:${this.port}/api/health`);
    });
  }
}

// Create and start the server
const server = new Server();
server.start();
