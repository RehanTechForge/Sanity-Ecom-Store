"use client";

import React, { useState, useEffect } from "react";
import Card from "../cards/Card";
import ProductFilters from "./ProductFilter";
import { Category, Product } from "@/sanity/products/getProductsAndCategories";

interface ProductSectionProps {
  initialProducts: Product[];
  categories: Category[];
}

const ProductSection = ({
  initialProducts,
  categories,
}: ProductSectionProps) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: "all",
    popular: false,
  });
  const [selectedSort, setSelectedSort] = useState("newest");

  useEffect(() => {
    const newFilteredProducts = initialProducts.filter((product) => {
      // Category filter
      if (
        selectedFilters.categories.length > 0 &&
        !product.categories.some((cat) =>
          //@ts-expect-error because cat._id is not imported
          selectedFilters.categories.includes(cat._id)
        )
      ) {
        return false;
      }

      // Price range filter
      if (selectedFilters.priceRange !== "all") {
        const [min, max] = selectedFilters.priceRange.split("-").map(Number);
        if (max && (product.price < min || product.price > max)) return false;
        if (!max && product.price <= min) return false;
      }

      // Popular filter
      if (selectedFilters.popular && !product.popular) {
        return false;
      }

      return true;
    });

    // Sorting
    newFilteredProducts.sort((a, b) => {
      if (selectedSort === "newest")
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      if (selectedSort === "price-asc") return a.price - b.price;
      if (selectedSort === "price-desc") return b.price - a.price;
      return 0;
    });

    setFilteredProducts(newFilteredProducts);
  }, [initialProducts, selectedFilters, selectedSort]);

  return (
    <section className="my-10 bg-gray-50">
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <aside className="col-span-12 md:col-span-3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Filters</h2>
          <ProductFilters
            //@ts-expect-error because setSelectedFilters is not imported
            categories={categories}
            selectedFilters={selectedFilters}
            //@ts-expect-error because setSelectedFilters is not imported
            setSelectedFilters={setSelectedFilters}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </aside>

        {/* Products Section */}
        <main className="col-span-12 md:col-span-9">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                //@ts-expect-error because Card component props required more is not imported
                <Card card={product} key={product._id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <p className="text-lg font-medium text-gray-600">
                No products found.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your filters or check back later.
              </p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default ProductSection;
