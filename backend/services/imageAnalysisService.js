import { productService } from './productService.js';
import { recipeService } from './recipeService.js';

/**
 * Service for handling image analysis operations
 */
class ImageAnalysisService {
  /**
   * Analyze an image to detect products
   * In a real application, this would use computer vision
   * For this example, we return mock results
   * 
   * @returns {Object} Analysis results
   */
  analyzeImage() {
    // Randomly select 1-3 products
    const numProducts = Math.floor(Math.random() * 3) + 1;
    const detectedProducts = productService.getRandomProducts(numProducts);
    
    return {
      detectedProducts,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Process an image and find matching recipes
   * 
   * @param {string} imageData - Base64 encoded image data
   * @param {Array} allergies - User allergies
   * @returns {Object} Analysis and recipe results
   */
  processImage(imageData, allergies = []) {
    // Analyze the image to detect products
    const analysisResults = this.analyzeImage();
    
    // Find recipes based on detected products and user allergies
    const recipes = recipeService.findRecipesByProducts(
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
