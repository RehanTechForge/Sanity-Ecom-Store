"use client";

import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import getStripe from "@/lib/stripe";
import { Loader2, ShoppingBag, Trash2, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ShoppingCart() {
  const { cartDetails, removeItem, setItemQuantity, totalPrice, clearCart } =
    useShoppingCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);
  const { isSignedIn } = useAuth();

  // Add a loading state that resolves after cart is initialized
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Add a small delay to prevent flash

    return () => clearTimeout(timer);
  }, [cartDetails]);

  const cartItems = Object.values(cartDetails ?? {});

  // Helper function to format price consistently
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      setUpdatingItem(productId);
      if (newQuantity >= 1) {
        await setItemQuantity(productId, newQuantity);
      } else {
        await removeItem(productId);
      }
    } catch (error) {
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isSignedIn) {
      toast.error("Please sign in to checkout");
      return;
    }

    try {
      setIsCheckingOut(true);
      const stripe = await getStripe();
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartDetails),
      });

      const session = await response.json();
      if (!response.ok) throw new Error(session.message || "Checkout failed");

      await stripe!.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast.success("Cart cleared successfully");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your shopping cart</h1>
          {cartItems.length > 0 && (
            <Button
              variant="ghost"
              onClick={handleClearCart}
              className="text-destructive hover:text-destructive/90"
              disabled={isCheckingOut}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center mt-16 space-y-6">
            <div className="flex justify-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground">
              No items found in your cart.
            </p>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8 hidden md:grid grid-cols-[2fr,1fr,1fr] gap-4">
              <div className="font-medium">Product</div>
              <div className="text-center font-medium">Quantity</div>
              <div className="text-right font-medium">Total</div>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 gap-4 border-b pb-4 md:grid-cols-[2fr,1fr,1fr] md:items-center"
                >
                  <div className="flex gap-4">
                    <div className="h-[140px] w-[96px] flex-shrink-0 overflow-hidden bg-muted">
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        width={96}
                        height={140}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="mt-1 text-sm">{formatPrice(item.price)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-start md:justify-center">
                    <div className="flex items-center space-x-4 rounded-md border p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={updatingItem === item.id || isCheckingOut}
                      >
                        -
                      </Button>
                      <span className="min-w-[20px] text-center">
                        {updatingItem === item.id ? (
                          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                        ) : (
                          item.quantity
                        )}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={updatingItem === item.id || isCheckingOut}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="text-right font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-8">
              <div className="flex flex-col items-end space-y-4">
                <div className="flex gap-4 items-center">
                  <span className="text-lg font-medium">Subtotal</span>
                  <span className="text-2xl font-bold">
                    {formatPrice(totalPrice || 0)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Taxes and shipping are calculated at checkout
                </p>
                <div className="flex gap-4 w-full sm:w-auto">
                  <Button variant="outline" asChild>
                    <Link
                      href="/shop"
                      tabIndex={isCheckingOut ? -1 : 0}
                      aria-disabled={isCheckingOut}
                    >
                      Continue Shopping
                    </Link>
                  </Button>
                  {isSignedIn ? (
                    <Button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="min-w-[160px]"
                    >
                      {isCheckingOut ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        "Checkout"
                      )}
                    </Button>
                  ) : (
                    <SignInButton mode="modal">
                      <Button className="min-w-[160px]">
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign in to Checkout
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
