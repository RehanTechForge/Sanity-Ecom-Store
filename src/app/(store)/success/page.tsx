// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useShoppingCart } from "use-shopping-cart";
// import { CheckCircle, Loader2 } from "lucide-react";
// import Link from "next/link";

// export default function Success() {
//   const searchParams = useSearchParams();
//   const { clearCart } = useShoppingCart();
//   const [isProcessing, setIsProcessing] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [saleId, setSaleId] = useState<string | null>(null);

//   useEffect(() => {
//     const sessionId = searchParams.get("session_id");

//     if (sessionId) {
//       handleSuccess(sessionId);
//     } else {
//       setIsProcessing(false);
//       setError("Invalid session");
//     }
//   }, [searchParams]);

//   const handleSuccess = async (sessionId: string) => {
//     try {
//       const response = await fetch("/api/handle-success", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ sessionId }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to process order");
//       }

//       const data = await response.json();
//       console.log("Order processed successfully", data);
//       setSaleId(data.saleId);

//       clearCart();
//     } catch (error) {
//       console.error("Error processing success:", error);
//       setError("Something went wrong. Please contact support.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (isProcessing) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center">
//           <Loader2 className="mx-auto h-16 w-16 text-darkPrimary animate-spin mb-6" />
//           <h1 className="font-clash text-clash-36 text-darkPrimary mb-4">
//             Processing your order...
//           </h1>
//           <p className="font-satoshi text-satoshi-18 text-primary">
//             Please wait while we confirm your payment.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center">
//           <h1 className="font-clash text-clash-36 text-red-500 mb-4">
//             Oops! Something went wrong
//           </h1>
//           <p className="font-satoshi text-satoshi-18 text-primary mb-8">
//             {error}
//           </p>
//           <Link
//             href="/shop"
//             className="block w-full bg-darkPrimary text-white font-satoshi text-satoshi-16 px-6 py-3 rounded"
//           >
//             Return to Shop
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="max-w-md w-full text-center">
//         <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
//         <h1 className="font-clash text-clash-36 text-darkPrimary mb-4">
//           Thank you for your purchase!
//         </h1>
//         <p className="font-satoshi text-satoshi-18 text-primary mb-4">
//           Your payment was successful and your order has been processed.
//         </p>
//         {saleId && (
//           <p className="font-satoshi text-satoshi-16 text-primary mb-8">
//             Order ID: {saleId}
//           </p>
//         )}
//         <div className="space-y-4">
//           <Link
//             href="/shop"
//             className="block w-full bg-darkPrimary text-white font-satoshi text-satoshi-16 px-6 py-3 rounded"
//           >
//             Continue Shopping
//           </Link>
//           <Link
//             href="/orders"
//             className="block w-full bg-borderGrey text-darkPrimary font-satoshi text-satoshi-16 px-6 py-3 rounded"
//           >
//             View Order History
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Success() {
  const searchParams = useSearchParams();
  const { clearCart } = useShoppingCart();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saleId, setSaleId] = useState<string | null>(null);

  const handleSuccess = useCallback(
    async (sessionId: string) => {
      try {
        const response = await fetch("/api/handle-success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          throw new Error("Failed to process order");
        }

        const data = await response.json();
        console.log("Order processed successfully", data);
        setSaleId(data.saleId);

        clearCart();
      } catch (error) {
        console.error("Error processing success:", error);
        setError("Something went wrong. Please contact support.");
      } finally {
        setIsProcessing(false);
      }
    },
    [clearCart]
  );

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      handleSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("Invalid session");
    }
  }, [searchParams, handleSuccess]);

  // Rendering logic remains unchanged
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <Loader2 className="mx-auto h-16 w-16 text-darkPrimary animate-spin mb-6" />
          <h1 className="font-clash text-clash-36 text-darkPrimary mb-4">
            Processing your order...
          </h1>
          <p className="font-satoshi text-satoshi-18 text-primary">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h1 className="font-clash text-clash-36 text-red-500 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="font-satoshi text-satoshi-18 text-primary mb-8">
            {error}
          </p>
          <Link
            href="/shop"
            className="block w-full bg-darkPrimary text-white font-satoshi text-satoshi-16 px-6 py-3 rounded"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h1 className="font-clash text-clash-36 text-darkPrimary mb-4">
          Thank you for your purchase!
        </h1>
        <p className="font-satoshi text-satoshi-18 text-primary mb-4">
          Your payment was successful and your order has been processed.
        </p>
        {saleId && (
          <p className="font-satoshi text-satoshi-16 text-primary mb-8">
            Order ID: {saleId}
          </p>
        )}
        <div className="space-y-4">
          <Link
            href="/shop"
            className="block w-full bg-darkPrimary text-white font-satoshi text-satoshi-16 px-6 py-3 rounded"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="block w-full bg-borderGrey text-darkPrimary font-satoshi text-satoshi-16 px-6 py-3 rounded"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}
