import React from "react";
import EmailWishList from "../global/EmailWishList";
import CursorFollowEffect from "../global/CursorFollowEffect";

const WishList = () => {
  return (
    <>
      <section className="bg-[#f9f9f9] px-4 py-0 sm:px-20 sm:py-10">
        <div className="bg-white flex sm:items-center py-10 px-4 sm:px-10 space-y-3 flex-col">
          <div className="w-full sm:w-[80%] mx-auto text-left sm:text-center">
            <h2 className="font-clash text-clash-20 md:text-clash-36 my-4">
              Join the club and get the benefits
            </h2>
            <p className="font-satoshi text-satoshi-16 md:text-satoshi-16 text-left md:text-center mb-20">
              Sign up for our newsletter and receive exclusive offers on new
              ranges, sales, pop up stores and more
            </p>
            <EmailWishList />
          </div>
        </div>
      </section>
    </>
  );
};

export default WishList;
