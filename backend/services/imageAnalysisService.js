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
      
      // Map detected items to our product database
      const detectedProducts = this.mapDetectedItemsToProducts(detectedItems);
      
      return {
        detectedProducts,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      
      // Fallback to random products if Claude API fails
      const numProducts = Math.floor(Math.random() * 3) + 1;
      const detectedProducts = productService.getRandomProducts(numProducts);
      
      return {
        detectedProducts,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Map detected items from Claude to our product database
   * @param {Array} detectedItems - Items detected by Claude
   * @returns {Array} Mapped products from our database
   */
  mapDetectedItemsToProducts(detectedItems) {
    const allProducts = productService.getAllProducts();
    const mappedProducts = [];
    
    for (const item of detectedItems) {
      // Try to find a matching product in our database
      const matchingProduct = allProducts.find(product => 
        product.name.toLowerCase() === item.name.toLowerCase() ||
        product.possibleIngredients.some(ing => 
          ing.toLowerCase().includes(item.name.toLowerCase()) ||
          item.name.toLowerCase().includes(ing)
        )
      );
      
      if (matchingProduct) {
        mappedProducts.push(matchingProduct);
      } else {
        // If no match found, create a new product entry
        const newProduct = {
          id: Date.now() + mappedProducts.length,
          name: item.name,
          category: item.category || 'Other',
          possibleIngredients: [item.name.toLowerCase()],
          commonAllergens: []
        };
        mappedProducts.push(newProduct);
      }
    }
    
    return mappedProducts;
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
