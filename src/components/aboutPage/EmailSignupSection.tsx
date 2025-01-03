"use client";
import React from "react";
import Image from "next/image";
import { ButtonMediumDark } from "../buttons/buttons";
const EmailSignupSection = () => {
  return (
    <section className="email-background px-4 sm:px-20 py-20 text-center text-white">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-white text-left sm:text-center text-clash-32 font-clash">
          Join the club and get the benefits
        </h2>
        <p className="font-satoshi text-left sm:text-center text-satoshi-18">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-10 space-y-4 my-4">
          <div className="flex gap-2 items-center">
            <Image src={"/Vector.png"} alt="check" height={16} width={16} />
            <span>Exclusive offers</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={"/Vector.png"} alt="check" height={16} width={16} />
            <span>Free events</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={"/Vector.png"} alt="check" height={16} width={16} />
            <span>Large discounts</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start sm:justify-center sm:items-center">
          <input
            type="text"
            className="bg-lightGrey border border-borderDark text-darkPrimary px-6 font-satoshi text-satoshi-16 md:min-w-[356px] h-[63px] focus-within:outline-none "
            placeholder="your@email.com"
          />
          <ButtonMediumDark text="Sign up" href="/" />
        </div>
      </div>
    </section>
  );
};

export default EmailSignupSection;
