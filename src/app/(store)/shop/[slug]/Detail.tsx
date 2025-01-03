"use client";
import Image from "next/image";
import React, { Suspense } from "react";

import { urlFor } from "@/sanity/lib/image";
import AddToCart from "@/components/buttons/AddToCart";
import HandleIncrementDecrement from "@/components/buttons/HandleIncrementDecrement";
import { useShoppingCart } from "use-shopping-cart";

const Detail = ({ product }: { product: any }) => {
  const { cartDetails } = useShoppingCart();
  const cartItem = cartDetails?.[product._id];
  const isInCart = Boolean(cartItem);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product?.quantity <= 0;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 py-10 bg-gray-50">
      {/* Image Section */}
      <div>
        {product?.mainImage?.asset && (
          <Image
            src={urlFor(product.mainImage.asset).url()}
            alt={product.mainImage.alt || "Product Image"}
            width={720}
            height={560}
            className="w-full md:h-[100%] object-cover rounded-lg"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="px-4 sm:px-10 py-6 flex flex-col space-y-6 text-[#2A254B]">
        {/* Title and Price */}
        <div>
          <h1 className="text-clash-36 font-clash">{product?.title}</h1>
          <p className="font-satoshi text-satoshi-18">${product?.price}</p>
        </div>

        {/* Quantity */}
        <div className="text-satoshi-16 font-satoshi">
          <h4 className="text-clash-16 font-clash">Stock Quantity</h4>
          <p className={`text-[#505977] ${isOutOfStock ? "text-red-500" : ""}`}>
            {isOutOfStock
              ? "Out of Stock"
              : `${product?.quantity} items available`}
          </p>
        </div>

        {/* Categories */}
        <div className="text-satoshi-16 font-satoshi flex flex-col space-y-4">
          <h4 className="text-clash-16 font-clash mt-4">Categories</h4>
          <ul className="list-disc pl-10">
            {product?.categories?.length ? (
              product.categories.map((category: any, index: any) => (
                <li key={index}>{category.title || "Unnamed Category"}</li>
              ))
            ) : (
              <p>Not Available</p>
            )}
          </ul>
        </div>

        {/* Description */}
        <div className="text-satoshi-16 font-satoshi flex flex-col space-y-4">
          <h4 className="text-clash-16 font-clash mt-4">Description</h4>
          <p>{product?.description || "No Description Available"}</p>
          <ul className="list-disc pl-10">
            {product?.features && (
              <>
                {product.features.map((feature: any, index: any) => (
                  <li key={index}>{feature}</li>
                ))}
              </>
            )}
          </ul>
        </div>

        {/* Dimensions */}
        <div>
          <h4 className="font-clash text-clash-16 mb-8 mt-6">Dimensions</h4>
          <div className="flex flex-wrap gap-8">
            {[
              {
                label: "Height",
                value: product?.dimensions?.height,
              },
              {
                label: "Width",
                value: product?.dimensions?.width,
              },
              {
                label: "Depth",
                value: product?.dimensions?.depth,
              },
            ].map((dimension, index) => (
              <div
                key={index}
                className="flex flex-col space-y-2 font-clash text-clash-14"
              >
                <span>{dimension.label}</span>
                <span className="text-[#505977]">
                  {dimension.value ? `${dimension.value} cm` : "Not Available"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Actions */}
        <div className="flex flex-col space-y-4 w-full">
          {/* Show increment/decrement only when item is in cart */}
          {isInCart && !isOutOfStock && (
            <div className="font-clash text-clash-14 text-[#505977] flex flex-col lg:flex-row lg:gap-6 items-start lg:items-center w-full">
              <span>Cart Quantity:</span>
              <HandleIncrementDecrement
                product={product}
                availableQuantity={product?.quantity}
              />
            </div>
          )}

          {/* Always show Add to Cart button if not out of stock */}
          <div className="w-full">
            <Suspense fallback={<p>Loading...</p>}>
              <AddToCart product={product} disabled={isOutOfStock} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
