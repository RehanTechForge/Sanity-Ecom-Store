import React from "react";
import ListingWrapper from "../layout/ListingWrapper";
import { ButtonMedium } from "../buttons/buttons";
import { getAllProducts } from "@/sanity/products/getAllProducts";
import Card from "../cards/Card";

const CardListing = async () => {
  const products = await getAllProducts();

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <ListingWrapper title="New ceramics">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((card, index) => (
          <Card card={card} key={card._id} />
        ))}
      </div>
      <center>
        <ButtonMedium text="View collection" href="/" />
      </center>
    </ListingWrapper>
  );
};

export default CardListing;
