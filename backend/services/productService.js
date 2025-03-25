import fs from 'fs';
import { config } from '../config.js';

/**
 * Service for handling product-related operations
 */
class ProductService {
  constructor() {
    this.products = [];
    this.loadProducts();
  }

  /**
   * Load products from the JSON file
   */
  loadProducts() {
    try {
      const productsData = fs.readFileSync(config.productsPath, 'utf8');
      this.products = JSON.parse(productsData);
      console.log(`Loaded ${this.products.length} products`);
    } catch (error) {
      console.error('Error loading products:', error);
      this.products = [];
    }
  }

  /**
   * Get all products
   * @returns {Array} Array of products
   */
  getAllProducts() {
    return this.products;
  }

  /**
   * Get a product by ID
   * @param {number} id - Product ID
   * @returns {Object|null} Product object or null if not found
   */
  getProductById(id) {
    return this.products.find(product => product.id === id) || null;
  }

  /**
   * Get random products for mock image analysis
   * @param {number} count - Number of products to return
   * @returns {Array} Array of random products
   */
  getRandomProducts(count = 1) {
    if (this.products.length === 0) {
      return [];
    }

    const randomProducts = [];
    const maxCount = Math.min(count, this.products.length);
    
    for (let i = 0; i < maxCount; i++) {
      const randomIndex = Math.floor(Math.random() * this.products.length);
      const product = this.products[randomIndex];
      
      // Avoid duplicates
      if (!randomProducts.some(p => p.id === product.id)) {
        randomProducts.push(product);
      } else {
        // Try again if we got a duplicate
        i--;
      }
    }
    
    return randomProducts;
  }
}

// Create and export a singleton instance
export const productService = new ProductService();
