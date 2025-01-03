import { ButtonMediumDark } from "@/components/buttons/buttons";
import FeaturesSection from "@/components/homePage-V1/FeaturesSection";
import WishList from "@/components/homePage-V1/WishList";
import ListingProducts from "@/components/shopDetailPage/ListingProducts";
import { urlFor } from "@/sanity/lib/image";
import { getProductBySlug } from "@/sanity/products/getProductBySlug";
import Image from "next/image";
import React from "react";
import { Product } from "../../../../../sanity.types";
import AddToCart from "@/components/buttons/AddToCart";
import Detail from "./Detail";

const ProductListingPage = async ({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  return (
    <>
      <Detail product={product} />
      <ListingProducts products={product?.relatedProducts} />
      <FeaturesSection alignText="justify-center" />
      <WishList />
    </>
  );
};

export default ProductListingPage;
