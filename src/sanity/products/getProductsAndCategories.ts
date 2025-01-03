import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";

export interface Category {
  _id: string;
  title: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: { asset: { url: string }; alt: string };
  categories: Category[];
  description: string;
  price: number;
  popular: boolean;
  publishedAt: string;
}

export interface ProductsAndCategories {
  products: Product[];
  categories: Category[];
}

export async function getProductsAndCategories(): Promise<ProductsAndCategories> {
  const QUERY = defineQuery(`{
    "products": *[_type == "product"] {
      _id,
      title,
      slug,
      mainImage,
      categories[]-> {
        _id,
        title
      },
      description,
      price,
      popular,
      publishedAt
    },
    "categories": *[_type == "category"] {
      _id,
      title
    }
  }`);

  try {
    const result = await sanityFetch({ query: QUERY });
    // @ts-expect-error This is a valid type
    return result.data || { products: [], categories: [] };
  } catch (error) {
    console.error("Error fetching products and categories:", error);
    return { products: [], categories: [] };
  }
}
