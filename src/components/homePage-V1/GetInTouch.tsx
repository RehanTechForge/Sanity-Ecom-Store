import Image from "next/image";
import React from "react";
import { ButtonMedium } from "../buttons/buttons";

const GetInTouch = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="px-4 sm:px-20 flex flex-col space-y-8 pt-10 pb-20">
        <div className="flex-1">
          <h2 className="font-clash text-clash-24">
            From a studio in London to a global brand with over 400 outlets
          </h2>
          <p className="font-satoshi mt-4 text-satoshi-16">
            When we started Avion, the idea was simple. Make high quality
            furniture affordable and available for the mass market. <br />{" "}
            <br />
            Handmade, and lovingly crafted furniture and homeware is what we
            live, breathe and design so our Chelsea boutique become the hotbed
            for the London interior design community.
          </p>
        </div>
        <div className="h-[30%] flex items-end">
          <ButtonMedium text="Get in touch" href="/" />
        </div>
      </div>
      <div>
        <Image
          src={"/Image.png"}
          alt="Image"
          height={600}
          width={750}
          className="w-full h-auto lg:h-[90%] object-cover"
        />
      </div>
    </section>
  );
};

export default GetInTouch;
