export interface LocationState {
  imageData: string;
  allergies?: string[];
}

export interface Product {
  id: number;
  name: string;
  category: string;
  possibleIngredients: string[];
  commonAllergens: string[];
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  allergens: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
}

export interface AnalysisResults {
  detectedProducts: Product[];
  recipes: Recipe[];
  timestamp: string;
}
