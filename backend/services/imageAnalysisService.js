import { productService } from './productService.js';
import { recipeService } from './recipeService.js';
import { claudeService } from './claudeService.js';

/**
 * Service for handling image analysis operations
 */
class ImageAnalysisService {
  /**
   * Analyze an image to detect products using Claude API
   * 
   * @param {string} imageData - Base64 encoded image data
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeImage(imageData) {
    try {
      // Use Claude to analyze the image
      const detectedItems = await claudeService.analyzeImage(imageData);
      
      // Create products from detected items
      const detectedProducts = productService.createProductsFromDetectedItems(detectedItems);
      
      return {
        detectedProducts,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new Error(`Failed to analyze image: ${error.message}`);
    }
  }

  /**
   * Process an image and find matching recipes
   * 
   * @param {string} imageData - Base64 encoded image data
   * @param {Array} allergies - User allergies
   * @returns {Promise<Object>} Analysis and recipe results
   */
  async processImage(imageData, allergies = []) {
    // Analyze the image to detect products
    const analysisResults = await this.analyzeImage(imageData);
    
    // Find recipes based on detected products and user allergies
    const recipes = await recipeService.findRecipesByProducts(
      analysisResults.detectedProducts, 
      allergies
    );
    
    return {
      detectedProducts: analysisResults.detectedProducts,
      recipes,
      timestamp: analysisResults.timestamp
    };
  }
}

// Create and export a singleton instance
export const imageAnalysisService = new ImageAnalysisService();
