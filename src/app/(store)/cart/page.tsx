// import ShoppingCart from "@/components/cart/ShopingCart";
// import React from "react";

// const CartPage = () => {
//   return <ShoppingCart />;
// };

// export default CartPage;
import { Suspense } from "react";
import { CartSkeleton } from "@/components/cards/cart-skeleton";
import ShoppingCart from "@/components/cart/ShopingCart";

export default function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <ShoppingCart />
    </Suspense>
  );
}
