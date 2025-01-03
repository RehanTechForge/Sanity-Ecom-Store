// "use client";
// import { urlFor } from "@/sanity/lib/image";
// import React from "react";
// import { useShoppingCart } from "use-shopping-cart";

// const AddToCart = ({ product }: any) => {
//   const { addItem, cartCount } = useShoppingCart();
//   console.log(cartCount);

//   const handleAddToCart = () => {
//     addItem({
//       id: product._id,
//       name: product.title,
//       price: product.price,
//       currency: "GBP", // Assuming the currency is GBP based on the '£' symbol
//       image: product.mainImage?.asset
//         ? urlFor(product.mainImage.asset).url()
//         : "",
//     });
//   };

//   return (
//     <button
//       className="bg-darkPrimary text-white font-satoshi text-satoshi-16 px-[32px] py-[16px] my-6 inline-block text-center min-w-max capitalize"
//       onClick={handleAddToCart}
//     >
//       Add to Cart
//     </button>
//   );
// };

// export default AddToCart;
"use client";

import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";

interface AddToCartProps {
  product: Product;
  disabled?: boolean;
}

const AddToCart: React.FC<AddToCartProps> = ({ product, disabled = false }) => {
  const { addItem } = useShoppingCart();

  const handleAddToCart = () => {
    if (!disabled) {
      addItem({
        id: product._id,
        name: product.title!,
        price: product.price!,
        currency: "GBP", // Assuming the currency is GBP based on the '£' symbol
        image: product.mainImage?.asset
          ? urlFor(product.mainImage.asset).url()
          : "",
      });
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`bg-darkPrimary text-white font-satoshi text-satoshi-16 px-[32px] py-[16px] my-6 inline-block text-center w-full sm:min-w-max capitalize ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {disabled ? "Out of Stock" : "Add to Cart"}
    </button>
  );
};

export default AddToCart;
