import React from "react";
import { Product } from "../../types/pictureTypes";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-3">Detected Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-3 border rounded-lg bg-white">
            <h3 className="font-medium text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600">
              Category: {product.category}
            </p>
            {product.commonAllergens.length > 0 && (
              <div className="mt-2">
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
    </div>
  );
};
