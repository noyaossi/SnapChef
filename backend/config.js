import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
  port: process.env.PORT || 3000,
  uploadsDir: join(__dirname, 'uploads'),
  claudeApiKey: process.env.CLAUDE_API_KEY
};
