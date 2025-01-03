"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Category } from "../../../sanity.types";

interface ProductFiltersProps {
  categories: Category[];
  selectedFilters: {
    categories: string[];
    priceRange: string;
    popular: boolean;
  };
  setSelectedFilters: (filters: {
    categories: string[];
    priceRange: string;
    popular: boolean;
  }) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

const priceRanges = [
  { label: "All", value: "all" },
  { label: "0 - 100", value: "0-100" },
  { label: "101 - 500", value: "101-500" },
  { label: "501+", value: "501-plus" },
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function ProductFilters({
  categories,
  selectedFilters,
  setSelectedFilters,
  selectedSort,
  setSelectedSort,
}: ProductFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const toggleCategoryFilter = (categoryId: string) => {
    setSelectedFilters({
      ...selectedFilters,
      categories: selectedFilters.categories.includes(categoryId)
        ? selectedFilters.categories.filter((id) => id !== categoryId)
        : [...selectedFilters.categories, categoryId],
    });
  };

  const setPriceRange = (range: string) => {
    setSelectedFilters({ ...selectedFilters, priceRange: range });
  };

  const togglePopular = () => {
    setSelectedFilters({
      ...selectedFilters,
      popular: !selectedFilters.popular,
    });
  };

  return (
    <>
      {/* Mobile Filters */}
      <div className="sticky top-0 z-40 flex w-full border-b border-gray-200 bg-white md:hidden text-clash-16 font-clash text-darkPrimary">
        <button
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
            setIsSortOpen(false);
          }}
          className="flex w-1/2 items-center justify-center border-r border-gray-200 py-4 text-sm font-medium"
        >
          Filters
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setIsSortOpen(!isSortOpen);
            setIsFilterOpen(false);
          }}
          className="flex w-1/2 items-center justify-center py-4 text-sm font-medium"
        >
          Sorting
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </div>

      {/* Mobile Filter Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-white px-4 pt-16 md:hidden text-satoshi-16 font-satoshi text-darkPrimary">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-lg font-medium">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-sm text-gray-500"
            >
              Done
            </button>
          </div>
          <div className="space-y-4 py-4">
            <div>
              <h3 className="mb-2 font-clash text-clash-16">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.categories.includes(
                        category._id
                      )}
                      onChange={() => toggleCategoryFilter(category._id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="text-sm">{category.title}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-clash text-clash-16">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={selectedFilters.priceRange === range.value}
                      onChange={() => setPriceRange(range.value)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFilters.popular}
                  onChange={togglePopular}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">Popular Items</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sort Panel */}
      {isSortOpen && (
        <div className="fixed inset-0 z-50 bg-white px-4 pt-16 md:hidden text-satoshi-16 font-satoshi">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-lg font-medium">Sort</h2>
            <button
              onClick={() => setIsSortOpen(false)}
              className="text-sm text-gray-500"
            >
              Done
            </button>
          </div>
          <div className="space-y-2 py-4">
            {sortOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={selectedSort === option.value}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="h-4 w-4 border-gray-300"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <aside className="hidden w-64 space-y-8 pr-8 md:block text-satoshi-16 font-satoshi">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="mb-4 text-sm font-medium">Categories</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category._id}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.categories.includes(category._id)}
                  onChange={() => toggleCategoryFilter(category._id)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                {category.title}
              </label>
            ))}
          </div>
        </div>
        <div className="border-b border-gray-200 pb-4">
          <h3 className="mb-4 text-sm font-medium">Price Range</h3>
          <div className="space-y-3">
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  checked={selectedFilters.priceRange === range.value}
                  onChange={() => setPriceRange(range.value)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                {range.label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedFilters.popular}
              onChange={togglePopular}
              className="h-4 w-4 rounded border-gray-300"
            />
            Popular Items
          </label>
        </div>
      </aside>
    </>
  );
}
