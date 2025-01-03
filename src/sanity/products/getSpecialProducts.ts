import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
export const getSpecialProducts = async () => {
  const SPECIAL_PRODUCT_QUERY = defineQuery(`
    *[_type == "special"] | order(title asc)
  `);

  try {
    const products = await sanityFetch({ query: SPECIAL_PRODUCT_QUERY });
    return products.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
