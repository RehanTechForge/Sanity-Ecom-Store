// "use client";

// import React, { useState } from "react";
// import { useShoppingCart } from "use-shopping-cart";
// import { Product } from "../../../sanity.types";

// interface HandleIncrementDecrementProps {
//   product: Product;
//   availableQuantity: number;
// }

// const HandleIncrementDecrement: React.FC<HandleIncrementDecrementProps> = ({
//   product,
//   availableQuantity,
// }) => {
//   const { incrementItem, decrementItem, cartDetails } = useShoppingCart();
//   const [message, setMessage] = useState<string | null>(null);

//   const cartItem = cartDetails?.[product._id];
//   const quantity = cartItem ? cartItem.quantity : 0;

//   const handleIncrement = () => {
//     if (quantity < availableQuantity) {
//       incrementItem(product._id);
//       setMessage(null);
//     } else {
//       setMessage("Maximum available quantity reached");
//     }
//   };

//   const handleDecrement = () => {
//     if (quantity > 0) {
//       decrementItem(product._id);
//       setMessage(null);
//     }
//   };

//   return (
//     <div className="flex flex-col items-start w-full">
//       <div className="bg-borderGrey px-6 flex flex-row space-x-10 py-4 text-satoshi-16 font-satoshi w-full lg:w-auto justify-between lg:justify-center">
//         <span
//           className="text-borderDark cursor-pointer"
//           onClick={handleDecrement}
//         >
//           -
//         </span>
//         <span className="text-darkPrimary">{quantity}</span>
//         <span
//           className="text-borderDark cursor-pointer"
//           onClick={handleIncrement}
//         >
//           +
//         </span>
//       </div>
//       {message && (
//         <p className="text-red-500 text-sm mt-2 font-satoshi">{message}</p>
//       )}
//     </div>
//   );
// };

// export default HandleIncrementDecrement;
"use client";

import React, { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "../../../sanity.types";

interface HandleIncrementDecrementProps {
  product: Product;
  availableQuantity: number;
}

const HandleIncrementDecrement: React.FC<HandleIncrementDecrementProps> = ({
  product,
  availableQuantity,
}) => {
  const { incrementItem, decrementItem, cartDetails } = useShoppingCart();
  const [message, setMessage] = useState<string | null>(null);

  const cartItem = cartDetails?.[product._id];
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrement = () => {
    if (quantity < availableQuantity) {
      incrementItem(product._id);
      setMessage(null);
    } else {
      setMessage("Maximum available quantity reached");
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      decrementItem(product._id);
      setMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className="bg-borderGrey px-6 flex flex-row space-x-10 py-4 text-satoshi-16 font-satoshi w-full lg:w-auto justify-between lg:justify-center">
        <span
          className={`text-borderDark cursor-pointer ${quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleDecrement}
        >
          -
        </span>
        <span className="text-darkPrimary">{quantity}</span>
        <span
          className={`text-borderDark cursor-pointer ${quantity >= availableQuantity ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleIncrement}
        >
          +
        </span>
      </div>
      {message && (
        <p className="text-red-500 text-sm mt-2 font-satoshi">{message}</p>
      )}
    </div>
  );
};

export default HandleIncrementDecrement;
