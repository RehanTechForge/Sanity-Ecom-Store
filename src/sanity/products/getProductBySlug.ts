import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug] | order(name asc) [0]{
      title,
      mainImage,
      categories[]->{
        title,
      },
      price,
      quantity,
      slug,
      _id,
      description,
      features,
      dimensions,
          "relatedProducts": *[_type == "product" && slug.current != $slug] {
      title,
      price,
      mainImage,
      slug
    }

    }`
  );

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product.data || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
