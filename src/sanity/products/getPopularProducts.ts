import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
export const getPopularProducts = async () => {
  const POPULAR_PRODUCTS_QUERY = defineQuery(`
    *[_type == "product" && popular == true] | order(title asc)
  `);

  try {
    const products = await sanityFetch({ query: POPULAR_PRODUCTS_QUERY });
    return products.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
