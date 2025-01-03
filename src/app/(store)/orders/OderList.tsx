import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Order = {
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
};

type OrderListProps = {
  orders: Order[];
};

export default function OrderList({ orders }: OrderListProps) {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order._id}>
          <CardHeader>
            <CardTitle>Order #{order.orderId}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <p>Status: {order.status}</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-4 font-bold">Total: ${order.total.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
