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
router.post('/analyze', async (req, res) => {
  try {
    console.log('Received analyze request');
    
    // Get the image data and allergies from the request body
    const { imageData, allergies } = req.body;
    
    if (!imageData) {
      console.log('No image data provided');
      return res.status(400).json({ 
        success: false,
        message: 'No image data provided' 
      });
    }
    
    // Log image data type for debugging
    console.log('Image data type:', typeof imageData);
    console.log('Image data starts with:', typeof imageData === 'string' ? imageData.substring(0, 50) + '...' : 'not a string');
    
    // Process the image
    const results = await imageAnalysisService.processImage(imageData, allergies);
    
    // Return the analysis and recipe results
    console.log('Analysis completed successfully');
    res.json({
      success: true,
      message: 'Image analyzed successfully',
      results
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    
    // Provide more detailed error response
    res.status(500).json({ 
      success: false, 
      message: 'Error analyzing image', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

/**
 * POST /api/analyze/upload
 * Upload and analyze an image file
 */
router.post('/analyze/upload', upload.single('image'), async (req, res) => {
  try {
    console.log('Received file upload request');
    
    if (!req.file) {
      console.log('No image file provided');
      return res.status(400).json({ 
        success: false,
        message: 'No image file provided' 
      });
    }
    
    console.log('File received:', req.file.filename);
    
    // Process the image
    const results = await imageAnalysisService.processImage(req.file.path);
    
    // Return the analysis results
    console.log('File analysis completed successfully');
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
    console.error('Error analyzing uploaded image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error analyzing image', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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
