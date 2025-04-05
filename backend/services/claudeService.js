import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config.js';

// Add this flag to toggle between real API and mock data
const USE_MOCK_DATA = true; // Set to false when you have a valid API key

/**
 * Service for handling Claude API interactions
 */
class ClaudeService {
  constructor() {
    this.client = new Anthropic({
      apiKey: config.claudeApiKey,
    });
  }

  /**
   * Analyze an image using Claude API
   * @param {string} imageData - Base64 encoded image data or file path
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeImage(imageData) {
    // Return mock data if flag is set
    if (USE_MOCK_DATA) {
      console.log('Using mock data for image analysis');
      return this.getMockImageAnalysis();
    }

    try {
      // Determine if imageData is a file path or base64 data
      let imageContent;
      let mediaType = "image/jpeg";
      
      if (typeof imageData === 'string' && imageData.startsWith('data:')) {
        // Extract the media type from the data URL
        const matches = imageData.match(/^data:([^;]+);base64,/);
        if (matches && matches.length > 1) {
          mediaType = matches[1];
        }
        // Remove the data URL prefix
        imageContent = imageData.replace(/^data:[^;]+;base64,/, '');
      } else if (typeof imageData === 'string' && (imageData.startsWith('/') || imageData.includes('\\'))) {
        // It's a file path, read the file
        const fs = await import('fs');
        const path = await import('path');
        const fileData = fs.readFileSync(imageData);
        imageContent = fileData.toString('base64');
        
        // Determine media type from file extension
        const ext = path.extname(imageData).toLowerCase();
        if (ext === '.png') mediaType = 'image/png';
        else if (ext === '.gif') mediaType = 'image/gif';
        else if (ext === '.webp') mediaType = 'image/webp';
        else mediaType = 'image/jpeg';
      } else {
        // Assume it's already base64 encoded
        imageContent = imageData;
      }
      
      const response = await this.client.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please identify all food items visible in this image. For each item, provide its name and category (vegetable, meat, grain, etc.). Format your response as a JSON array with objects containing 'name' and 'category' properties."
              },
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mediaType,
                  data: imageContent
                }
              }
            ]
          }
        ]
      });

      // Parse the response to extract food items
      return this.parseImageAnalysisResponse(response.content[0].text);
    } catch (error) {
      console.error('Error analyzing image with Claude:', error);
      throw new Error(`Claude API error: ${error.message}`);
    }
  }

  /**
   * Parse Claude's response to extract food items
   * @param {string} responseText - Claude's response text
   * @returns {Array} Parsed food items
   */
  parseImageAnalysisResponse(responseText) {
    try {
      // Look for JSON in the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // If no JSON found, do manual parsing
      // This is a fallback in case Claude doesn't format as JSON
      const foodItems = [];
      const lines = responseText.split('\n');
      
      for (const line of lines) {
        // Look for patterns like "Tomato - Vegetable" or "Tomato (Vegetable)"
        const match = line.match(/(\w+)[\s-]+(\w+)/);
        if (match) {
          foodItems.push({
            name: match[1],
            category: match[2]
          });
        }
      }
      
      return foodItems;
    } catch (error) {
      console.error('Error parsing Claude response:', error);
      return [];
    }
  }

  /**
   * Get recipe suggestions based on ingredients
   * @param {Array} ingredients - List of ingredients
   * @param {Array} allergies - User allergies
   * @returns {Promise<Array>} Recipe suggestions
   */
  async getRecipeSuggestions(ingredients, allergies = []) {
    // Return mock data if flag is set
    if (USE_MOCK_DATA) {
      console.log('Using mock data for recipe suggestions');
      return this.getMockRecipes(ingredients, allergies);
    }

    try {
      const ingredientsList = ingredients.map(i => i.name).join(', ');
      const allergiesList = allergies.length > 0 ? allergies.join(', ') : 'none';
      
      const response = await this.client.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Based on these ingredients: ${ingredientsList}, suggest 3-5 recipes that could be made with them. The user has the following allergies: ${allergiesList}. Format your response as a JSON array with objects containing 'name', 'ingredients', 'instructions' (as an array of steps), 'allergens', 'prepTime', 'cookTime', 'servings', and 'difficulty' properties.`
              }
            ]
          }
        ]
      });

      // Parse the response to extract recipes
      return this.parseRecipeSuggestionsResponse(response.content[0].text);
    } catch (error) {
      console.error('Error getting recipe suggestions from Claude:', error);
      throw new Error(`Claude API error: ${error.message}`);
    }
  }

  /**
   * Parse Claude's response to extract recipe suggestions
   * @param {string} responseText - Claude's response text
   * @returns {Array} Parsed recipes
   */
  parseRecipeSuggestionsResponse(responseText) {
    try {
      // Look for JSON in the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const recipes = JSON.parse(jsonMatch[0]);
        
        // Add IDs to recipes
        return recipes.map((recipe, index) => ({
          id: Date.now() + index,
          ...recipe
        }));
      }
      
      // If no JSON found, return empty array
      return [];
    } catch (error) {
      console.error('Error parsing Claude recipe response:', error);
      return [];
    }
  }

  /**
   * Get mock image analysis data for testing
   * @returns {Array} Mock detected items
   */
  getMockImageAnalysis() {
    return [
      { name: "Tomatoes", category: "Vegetable" },
      { name: "Onions", category: "Vegetable" },
      { name: "Garlic", category: "Vegetable" },
      { name: "Bell Peppers", category: "Vegetable" },
      { name: "Pasta", category: "Grain" },
      { name: "Olive Oil", category: "Oil" }
    ];
  }

  /**
   * Get mock recipe suggestions for testing
   * @param {Array} ingredients - List of ingredients
   * @param {Array} allergies - User allergies
   * @returns {Array} Mock recipes
   */
  getMockRecipes(ingredients, allergies = []) {
    // Base recipes
    const allRecipes = [
      {
        id: Date.now() + 1,
        name: "Pasta Marinara",
        ingredients: ["Pasta", "Tomatoes", "Garlic", "Onions", "Olive Oil", "Salt", "Black Pepper", "Basil"],
        instructions: [
          "Bring a large pot of salted water to boil and cook pasta according to package instructions.",
          "In a large pan, heat olive oil over medium heat.",
          "Add diced onions and cook until translucent, about 3-4 minutes.",
          "Add minced garlic and cook for another minute.",
          "Add diced tomatoes and cook until they break down, about 10 minutes.",
          "Season with salt, pepper, and torn basil leaves.",
          "Drain pasta and toss with the sauce before serving."
        ],
        allergens: ["Wheat"],
        prepTime: "10 minutes",
        cookTime: "20 minutes",
        servings: 4,
        difficulty: "Easy"
      },
      {
        id: Date.now() + 2,
        name: "Roasted Vegetable Medley",
        ingredients: ["Bell Peppers", "Onions", "Garlic", "Olive Oil", "Salt", "Black Pepper", "Thyme"],
        instructions: [
          "Preheat oven to 425°F (220°C).",
          "Cut bell peppers and onions into 1-inch pieces.",
          "Mince garlic or leave whole cloves.",
          "Toss vegetables with olive oil, salt, pepper, and thyme on a baking sheet.",
          "Roast for 25-30 minutes, stirring halfway through, until vegetables are tender and slightly caramelized."
        ],
        allergens: [],
        prepTime: "10 minutes",
        cookTime: "30 minutes",
        servings: 4,
        difficulty: "Easy"
      },
      {
        id: Date.now() + 3,
        name: "Tomato Garlic Bruschetta",
        ingredients: ["Tomatoes", "Garlic", "Baguette", "Olive Oil", "Basil", "Salt", "Black Pepper"],
        instructions: [
          "Dice tomatoes and place in a bowl.",
          "Mince garlic and add to tomatoes.",
          "Add chopped fresh basil, olive oil, salt, and pepper. Mix well.",
          "Slice baguette and toast until golden brown.",
          "Rub toasted bread with a garlic clove.",
          "Top each slice with the tomato mixture and serve immediately."
        ],
        allergens: ["Wheat"],
        prepTime: "15 minutes",
        cookTime: "5 minutes",
        servings: 6,
        difficulty: "Easy"
      },
      {
        id: Date.now() + 4,
        name: "Pasta Primavera",
        ingredients: ["Pasta", "Bell Peppers", "Onions", "Garlic", "Olive Oil", "Parmesan Cheese", "Cream", "Salt", "Black Pepper"],
        instructions: [
          "Cook pasta according to package directions.",
          "In a large skillet, heat olive oil over medium heat.",
          "Add diced onions and bell peppers, cooking until softened.",
          "Add minced garlic and cook for another minute.",
          "Stir in cream and bring to a simmer.",
          "Add cooked pasta, grated Parmesan, salt, and pepper.",
          "Toss until pasta is coated with sauce and serve hot."
        ],
        allergens: ["Wheat", "Dairy"],
        prepTime: "15 minutes",
        cookTime: "15 minutes",
        servings: 4,
        difficulty: "Medium"
      },
      {
        id: Date.now() + 5,
        name: "Tomato and Garlic Soup",
        ingredients: ["Tomatoes", "Garlic", "Onions", "Vegetable Broth", "Olive Oil", "Salt", "Black Pepper", "Basil"],
        instructions: [
          "Heat olive oil in a large pot over medium heat.",
          "Add diced onions and cook until translucent.",
          "Add minced garlic and cook for 30 seconds.",
          "Add diced tomatoes and cook for 5 minutes.",
          "Pour in vegetable broth and bring to a simmer.",
          "Cook for 15 minutes, then blend until smooth.",
          "Season with salt, pepper, and fresh basil."
        ],
        allergens: [],
        prepTime: "10 minutes",
        cookTime: "25 minutes",
        servings: 4,
        difficulty: "Easy"
      }
    ];
    
    // Filter out recipes with allergens that match user allergies
    const filteredRecipes = allergies.length > 0 
      ? allRecipes.filter(recipe => 
          !recipe.allergens.some(allergen => 
            allergies.includes(allergen.toLowerCase())
          )
        )
      : allRecipes;
    
    // Take a subset of recipes
    return filteredRecipes.slice(0, 3);
  }
}

// Create and export a singleton instance
export const claudeService = new ClaudeService();