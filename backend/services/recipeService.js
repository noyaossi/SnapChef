import fs from 'fs';
import { config } from '../config.js';

/**
 * Service for handling recipe-related operations
 */
class RecipeService {
  constructor() {
    this.recipes = [];
    this.loadRecipes();
  }

  /**
   * Load recipes from the JSON file
   */
  loadRecipes() {
    try {
      const recipesData = fs.readFileSync(config.recipesPath, 'utf8');
      this.recipes = JSON.parse(recipesData);
      console.log(`Loaded ${this.recipes.length} recipes`);
    } catch (error) {
      console.error('Error loading recipes:', error);
      this.recipes = [];
    }
  }

  /**
   * Get all recipes
   * @returns {Array} Array of recipes
   */
  getAllRecipes() {
    return this.recipes;
  }

  /**
   * Get a recipe by ID
   * @param {number} id - Recipe ID
   * @returns {Object|null} Recipe object or null if not found
   */
  getRecipeById(id) {
    return this.recipes.find(recipe => recipe.id === id) || null;
  }

  /**
   * Find recipes based on available ingredients and filter by allergies
   * @param {Array} products - Array of product objects
   * @param {Array} userAllergies - Array of allergy strings
   * @returns {Array} Array of matching recipes
   */
  findRecipesByProducts(products, userAllergies = []) {
    // Extract possible ingredients from products
    const availableIngredients = products.flatMap(product => 
      product.possibleIngredients || []
    );
    
    if (availableIngredients.length === 0) {
      return [];
    }
    
    // Find recipes that use at least one of the available ingredients
    let matchingRecipes = this.recipes.filter(recipe => 
      recipe.ingredients.some(ingredient => 
        availableIngredients.some(available => 
          ingredient.includes(available) || available.includes(ingredient)
        )
      )
    );
    
    // Filter out recipes that contain user allergies
    if (userAllergies && userAllergies.length > 0) {
      matchingRecipes = matchingRecipes.filter(recipe => 
        !recipe.allergens.some(allergen => 
          userAllergies.includes(allergen)
        )
      );
    }
    
    // Sort recipes by relevance (number of matching ingredients)
    matchingRecipes.sort((a, b) => {
      const aMatches = a.ingredients.filter(ingredient => 
        availableIngredients.some(available => 
          ingredient.includes(available) || available.includes(ingredient)
        )
      ).length;
      
      const bMatches = b.ingredients.filter(ingredient => 
        availableIngredients.some(available => 
          ingredient.includes(available) || available.includes(ingredient)
        )
      ).length;
      
      return bMatches - aMatches;
    });
    
    // Return top 5 recipes
    return matchingRecipes.slice(0, 5);
  }
}

// Create and export a singleton instance
export const recipeService = new RecipeService();
