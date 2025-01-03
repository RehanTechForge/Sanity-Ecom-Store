import React from "react";

const ListingWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <section className="px-4 sm:px-20 py-10">
      <h2 className="font-clash  text-clash-20 sm:text-clash-32 my-4">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default ListingWrapper;
