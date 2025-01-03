import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
// });

export async function POST(req: NextRequest) {
  try {
    const { lineItems } = await req.json();

    for (const item of lineItems.data) {
      const productTitle = item.description;
      const quantitySold = item.quantity;

      // Fetch product by title
      const result = await backendClient.fetch(
        `*[_type == "product" && title == $productTitle][0]`,
        { productTitle }
      );

      if (!result) {
        console.error(`Product not found: ${productTitle}`);
        continue;
      }

      const currentQuantity = result.quantity || 0;
      const newQuantity = Math.max(currentQuantity - quantitySold, 0);

      // Update quantity in Sanity
      await backendClient
        .patch(result._id)
        .set({ quantity: newQuantity })
        .commit();
    }

    return NextResponse.json({ message: "Stock updated successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update stock" },
      { status: 500 }
    );
  }
}
