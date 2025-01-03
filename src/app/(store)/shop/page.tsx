import ProductSection from "@/components/shopPage-v1/ProductSection";
import { getProductsAndCategories } from "@/sanity/products/getProductsAndCategories";

export default async function ShopPage() {
  const { products, categories } = await getProductsAndCategories();

  console.log("Products", products);
  console.log("Categories", categories);

  return (
    <div className="px-10">
      <ProductSection initialProducts={products} categories={categories} />
    </div>
  );
}
