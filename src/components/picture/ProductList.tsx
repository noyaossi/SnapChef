import React from "react";
import { Product } from "../../types/pictureTypes";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-600 mb-4">
        Detected Ingredients
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg bg-white hover:shadow-md transition-all"
          >
            <h3 className="font-medium text-lg">{product.name}</h3>
            <div className="mt-1 inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {product.category}
            </div>

            {product.commonAllergens.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-red-600 font-medium">
                  Contains allergens:
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.commonAllergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-3">
        These are the ingredients we detected in your image
      </p>
    </div>
  );
};
