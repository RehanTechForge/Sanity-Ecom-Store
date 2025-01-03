import React from "react";
import ListingWrapper from "../layout/ListingWrapper";
import Card from "../cards/Card";
// import Image from "next/image";
import { ButtonMedium } from "../buttons/buttons";
// import Link from "next/link";
import { getPopularProducts } from "@/sanity/products/getPopularProducts";
// import { getSpecialProducts } from "@/sanity/products/getSpecialProducts";
// import { urlFor } from "@/sanity/lib/image";

const PopularProducts = async () => {
  const popularProducts = await getPopularProducts();
  // const specialProduct = await getSpecialProducts();
  return (
    <ListingWrapper title="Our popular products">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Large Image Section */}
        {/* {specialProduct.map((card) => (
          <div
            className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center cursor-pointer"
            key={card._id}
          >
            {card.mainImage?.asset && (
              <Link
                href={`shop/${card.slug?.current}`}
                className="relative h-auto w-full bg-gray-800"
              >
                <Image
                  src={urlFor(card.mainImage.asset).url() || ""}
                  alt={card.title || "Product Image"}
                  height={500}
                  width={600}
                  className="object-cover"
                />
              </Link>
            )}

            <div className="flex flex-col gap-2 mt-4 text-center">
              <Link href={`/shop/${card.slug?.current}`}>
                <span className="font-clash text-clash-20">
                  {card.title || "The Poplar suede sofa"}
                </span>
              </Link>
              <span className="font-satoshi text-satoshi-18">
                ${card.price}
              </span>
            </div>
          </div>
        ))} */}

        {popularProducts.map((card, index) => (
          <div className="col-span-1" key={card._id}>
            <Card card={card} />
          </div>
        ))}

        {/*
        <div className="col-span-1">
          <Card
            card={{
              title: "The Dandy chair",
              price: "£250",
              image: "/cards/c5.png",
            }}
          />
        </div> */}
      </div>

      {/* Button Section */}
      <div className="mt-6 flex justify-center">
        <ButtonMedium text="View collection" href="/" />
      </div>
    </ListingWrapper>
  );
};

export default PopularProducts;
