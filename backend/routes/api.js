import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { config } from '../config.js';
import { imageAnalysisService } from '../services/imageAnalysisService.js';

// Create uploads directory if it doesn't exist
if (!fs.existsSync(config.uploadsDir)) {
  fs.mkdirSync(config.uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create router
const router = express.Router();

/**
 * POST /api/analyze
 * Analyze an image and suggest recipes
 */
router.post('/analyze', (req, res) => {
  try {
    // Get the image data and allergies from the request body
    const { imageData, allergies } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' });
    }
    
    // Process the image
    const results = imageAnalysisService.processImage(imageData, allergies);
    
    // Return the analysis and recipe results
    res.json({
      success: true,
      message: 'Image analyzed successfully',
      results
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error analyzing image', 
      error: error.message 
    });
  }
});

/**
 * POST /api/analyze/upload
 * Upload and analyze an image file
 */
router.post('/analyze/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    // Process the image
    const results = imageAnalysisService.processImage(req.file.path);
    
    // Return the analysis results
    res.json({
      success: true,
      message: 'Image analyzed successfully',
      results,
      file: {
        filename: req.file.filename,
        path: req.file.path
      }
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error analyzing image', 
      error: error.message 
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
