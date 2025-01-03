// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { backendClient } from "@/sanity/lib/backendClient";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
// });

// export async function POST(req: NextRequest) {
//   try {
//     const { sessionId } = await req.json();

//     if (!sessionId) {
//       return NextResponse.json(
//         { error: "Missing session_id" },
//         { status: 400 }
//       );
//     }

//     // 1. Retrieve the session
//     const session = await stripe.checkout.sessions.retrieve(sessionId, {
//       expand: ["line_items.data.price.product"],
//     });

//     if (!session.line_items?.data.length) {
//       throw new Error("No line items found in session");
//     }

//     // 2. Update product quantities
//     const updatedProducts = await Promise.all(
//       session.line_items.data.map(async (item: any) => {
//         const productName = item.description;
//         const quantitySold = item.quantity;

//         // Fetch product by name
//         const product = await backendClient.fetch(
//           `*[_type == "product" && title == $productName][0]`,
//           { productName }
//         );

//         if (!product) {
//           console.error(`Product not found: ${productName}`);
//           return null;
//         }

//         // Update product quantity
//         const currentQuantity = product.quantity || 0;
//         const newQuantity = Math.max(currentQuantity - quantitySold, 0);

//         await backendClient
//           .patch(product._id)
//           .set({ quantity: newQuantity })
//           .commit();

//         return {
//           productId: product._id,
//           newQuantity,
//         };
//       })
//     );

//     // Filter out any null items (products not found)
//     const validUpdatedProducts = updatedProducts.filter(Boolean);

//     return NextResponse.json({
//       success: true,
//       message: "Stock updated successfully",
//       updatedProducts: validUpdatedProducts,
//     });
//   } catch (err: any) {
//     console.error("Error processing success:", err);
//     return NextResponse.json(
//       {
//         success: false,
//         error: err.message || "Failed to update stock",
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { backendClient } from "@/sanity/lib/backendClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    // Check if a sale record already exists for this session
    const existingSale = await backendClient.fetch(
      `*[_type == "sale" && orderId == $sessionId][0]`,
      { sessionId }
    );

    if (existingSale) {
      return NextResponse.json({
        success: true,
        message: "Sale record already exists",
        saleId: existingSale._id,
      });
    }

    // 1. Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product", "customer"],
    });

    if (!session.line_items?.data.length) {
      throw new Error("No line items found in session");
    }

    // 2. Update product quantities and prepare sale items
    const saleItems = await Promise.all(
      session.line_items.data.map(async (item: any) => {
        const productName = item.description;
        const quantitySold = item.quantity;
        const price = item.price.unit_amount / 100; // Convert from cents to dollars

        // Fetch product by name
        const product = await backendClient.fetch(
          `*[_type == "product" && title == $productName][0]`,
          { productName }
        );

        if (!product) {
          console.error(`Product not found: ${productName}`);
          return null;
        }

        // Update product quantity
        const currentQuantity = product.quantity || 0;
        const newQuantity = Math.max(currentQuantity - quantitySold, 0);

        await backendClient
          .patch(product._id)
          .set({ quantity: newQuantity })
          .commit();

        return {
          productId: {
            _type: "reference",
            _ref: product._id,
          },
          quantity: quantitySold,
          price: price,
        };
      })
    );

    // Filter out any null items (products not found)
    const validSaleItems = saleItems.filter(Boolean);

    // 3. Create sale record in Sanity
    const saleRecord = await backendClient.create({
      _type: "sale",
      orderId: session.id,
      customer: {
        email: session.customer_details?.email || "",
        name: session.customer_details?.name || "",
      },
      items: validSaleItems,
      total: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents to dollars
      date: new Date().toISOString(),
      status: "completed",
    });

    return NextResponse.json({
      success: true,
      message: "Stock updated and sale record created successfully",
      saleId: saleRecord._id,
    });
  } catch (err: any) {
    console.error("Error processing success:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to update stock and create sale record",
      },
      { status: 500 }
    );
  }
}
