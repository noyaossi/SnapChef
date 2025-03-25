import { claudeService } from './claudeService.js';

/**
 * Service for handling recipe-related operations
 */
class RecipeService {
  constructor() {
    this.recipeCache = new Map();
  }

  /**
   * Get all recipes from cache
   * @returns {Array} Array of recipes
   */
  getAllRecipes() {
    return Array.from(this.recipeCache.values());
  }

  /**
   * Get a recipe by ID
   * @param {number} id - Recipe ID
   * @returns {Object|null} Recipe object or null if not found
   */
  getRecipeById(id) {
    return this.recipeCache.get(id) || null;
  }

  /**
   * Add a recipe to the cache
   * @param {Object} recipe - Recipe to add
   */
  addToCache(recipe) {
    this.recipeCache.set(recipe.id, recipe);
  }

  /**
   * Find recipes based on available ingredients and filter by allergies
   * @param {Array} products - Array of product objects
   * @param {Array} userAllergies - Array of allergy strings
   * @returns {Promise<Array>} Array of matching recipes
   */
  async findRecipesByProducts(products, userAllergies = []) {
    try {
      // Get recipe suggestions from Claude
      const claudeRecipes = await claudeService.getRecipeSuggestions(products, userAllergies);
      
      // Add recipes to cache
      if (claudeRecipes && claudeRecipes.length > 0) {
        for (const recipe of claudeRecipes) {
          this.addToCache(recipe);
        }
        return claudeRecipes;
      }
      
      // If Claude didn't return any recipes, return empty array
      return [];
    } catch (error) {
      console.error('Error getting recipes from Claude:', error);
      throw new Error(`Failed to get recipe suggestions: ${error.message}`);
    }
  }
}

// Create and export a singleton instance
export const recipeService = new RecipeService();
