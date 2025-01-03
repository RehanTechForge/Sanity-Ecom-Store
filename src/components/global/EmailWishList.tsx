import React from "react";
import { ButtonMediumDark } from "../buttons/buttons";

const EmailWishList = () => {
  return (
    <div className="flex flex-col justify-start items-start xs:flex-row xs:justify-center xs:items-center">
      <input
        type="text"
        className="bg-[#f9f9f9] border border-borderDark text-darkPrimary px-6 font-satoshi text-satoshi-16 opacity-20 md:min-w-[356px] h-[63px] focus-within:outline-none "
        placeholder="your@email.com"
      />
      <ButtonMediumDark text="Sign up" href="/" />
    </div>
  );
};

export default EmailWishList;
