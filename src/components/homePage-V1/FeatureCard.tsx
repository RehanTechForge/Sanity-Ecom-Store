import { Truck, Box, CreditCard, ShoppingBag } from "lucide-react"; // Add other icons as necessary
import React from "react";

// Define an array of feature items
const features = [
  {
    icon: <Truck className="h-[24px] w-[24px]" />,
    title: "Next day as standard",
    description: "Order before 3pm and get your order the next day as standard",
  },
  {
    icon: <Box className="h-[24px] w-[24px]" />,
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders over $50",
  },
  {
    icon: <CreditCard className="h-[24px] w-[24px]" />,
    title: "Secure Payments",
    description: "Your payments are secured with the latest technology",
  },
  {
    icon: <ShoppingBag className="h-[24px] w-[24px]" />,
    title: "Easy Returns",
    description: "Return any item within 30 days for a full refund",
  },
];

const FeatureCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col space-y-4 items-center xs:items-start p-4"
        >
          <div>{feature.icon}</div>
          <div>
            <h4 className="font-clash text-clash-20">{feature.title}</h4>
            <p className="font-satoshi text-satoshi-16">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCard;
