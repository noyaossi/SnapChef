import { claudeService } from './claudeService.js';

/**
 * Service for handling product-related operations
 */
class ProductService {
  constructor() {
    this.products = [];
    this.productCache = new Map();
  }

  /**
   * Get all products from cache
   * @returns {Array} Array of products
   */
  getAllProducts() {
    return Array.from(this.productCache.values());
  }

  /**
   * Get a product by ID
   * @param {number} id - Product ID
   * @returns {Object|null} Product object or null if not found
   */
  getProductById(id) {
    return this.productCache.get(id) || null;
  }

  /**
   * Add a product to the cache
   * @param {Object} product - Product to add
   */
  addToCache(product) {
    this.productCache.set(product.id, product);
  }

  /**
   * Create products from detected items
   * @param {Array} detectedItems - Items detected by Claude
   * @returns {Array} Created products
   */
  createProductsFromDetectedItems(detectedItems) {
    const products = [];
    
    for (const item of detectedItems) {
      // Create a product from the detected item
      const product = {
        id: Date.now() + products.length,
        name: item.name,
        category: item.category || 'Other',
        possibleIngredients: [item.name.toLowerCase()],
        commonAllergens: []
      };
      
      // Add to cache and return array
      this.addToCache(product);
      products.push(product);
    }
    
    return products;
  }
}

// Create and export a singleton instance
export const productService = new ProductService();
