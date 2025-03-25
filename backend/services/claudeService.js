import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config.js';

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
   * @param {string} imageData - Base64 encoded image data
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeImage(imageData) {
    try {
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
                  media_type: "image/jpeg",
                  data: imageData.replace(/^data:image\/\w+;base64,/, '')
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
}

// Create and export a singleton instance
export const claudeService = new ClaudeService();
