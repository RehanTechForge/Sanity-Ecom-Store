// import { redirect } from "next/navigation";
// import { backendClient } from "@/sanity/lib/backendClient";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import OrderList from "./OderList";

// async function getOrders(userEmail: string) {
//   const orders = await backendClient.fetch<
//     Array<{
//       _id: string;
//       orderId: string;
//       date: string;
//       total: number;
//       status: string;
//       items: Array<{
//         product: string;
//         quantity: number;
//         price: number;
//       }>;
//     }>
//   >(
//     `
//     *[_type == "sale" && customer.email == $userEmail] | order(date desc) {
//       _id,
//       orderId,
//       date,
//       total,
//       status,
//       items[] {
//         "product": productId->title,
//         quantity,
//         price
//       }
//     }
//   `,
//     { userEmail }
//   );

//   // Deduplicate orders based on orderId
//   const uniqueOrders = Array.from(
//     new Map(orders.map((order) => [order.orderId, order])).values()
//   );

//   return uniqueOrders;
// }

// export default async function OrdersPage() {
//   const { userId } = await auth();

//   if (!userId) {
//     redirect("/sign-in");
//   }

//   const user = await currentUser();

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const userEmail = user.emailAddresses[0].emailAddress;
//   console.log("User Email:", userEmail);

//   const orders = await getOrders(userEmail);
//   console.log("Orders fetched:", orders);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
//       {orders.length > 0 ? (
//         <OrderList orders={orders} />
//       ) : (
//         <p className="text-lg text-gray-600">
//           You haven't placed any orders yet.
//         </p>
//       )}
//     </div>
//   );
// }
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { backendClient } from "@/sanity/lib/backendClient";
import { auth, currentUser } from "@clerk/nextjs/server";
import OrderList from "./OderList";
import OrdersLoading from "./loading";

async function getOrders(userEmail: string) {
  const orders = await backendClient.fetch<
    Array<{
      _id: string;
      orderId: string;
      date: string;
      total: number;
      status: string;
      items: Array<{
        product: string;
        quantity: number;
        price: number;
      }>;
    }>
  >(
    `
    *[_type == "sale" && customer.email == $userEmail] | order(date desc) {
      _id,
      orderId,
      date,
      total,
      status,
      items[] {
        "product": productId->title,
        quantity,
        price
      }
    }
  `,
    { userEmail }
  );

  // Deduplicate orders based on orderId
  const uniqueOrders = Array.from(
    new Map(orders.map((order) => [order.orderId, order])).values()
  );

  return uniqueOrders;
}

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const userEmail = user.emailAddresses[0].emailAddress;
  // console.log("User Email:", userEmail);

  return (
    <Suspense fallback={<OrdersLoading />}>
      <OrdersContent userEmail={userEmail} />
    </Suspense>
  );
}

async function OrdersContent({ userEmail }: { userEmail: string }) {
  const orders = await getOrders(userEmail);
  console.log("Orders fetched:", orders);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <p className="text-lg text-gray-600">
          You haven't placed any orders yet.
        </p>
      )}
    </div>
  );
}
