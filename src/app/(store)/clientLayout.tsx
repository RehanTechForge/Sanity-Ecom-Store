"use client";

import { ClerkLoaded } from "@clerk/nextjs";
import { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_URL}/cart`}
      currency="USD"
      allowedCountries={["US"]}
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      <ClerkLoaded>{children}</ClerkLoaded>
    </CartProvider>
  );
}
