"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { ButtonMediumLight } from "../buttons/buttons";
import Link from "next/link";

const MainSection = () => {
  return (
    <>
      <section className="hidden sm:px-20 py-10 sm:grid grid-cols-6 lg:grid-cols-12">
        <div className="col-span-6 lg:col-span-7 bg-darkPrimary p-10 text-white flex flex-col">
          <div className="flex-1 pb-32">
            <h2 className="font-clash text-clash-32">
              The furniture brand for the future, with timeless designs
            </h2>
            <Link href="/shop">
              <motion.button
                className="bg-[#494665] w-full sm:w-max px-[32px] py-[16px] text-white mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Collection
              </motion.button>
            </Link>
          </div>
          <div className="h-[30%] flex items-end">
            <p className="font-satoshi text-satoshi-18">
              A new era in eco-friendly furniture with Avelon, the French luxury
              retail brand with nice fonts, tasteful colors, and a beautiful way
              to display things digitally using modern web technologies.
            </p>
          </div>
        </div>
        <div className="hidden sm:block sm:col-span-6 lg:col-span-5">
          <Image
            src={"/main.png"}
            alt="Main Image"
            height={584}
            width={520}
            className="object-cover h-full w-full"
          />
        </div>
      </section>
      <section className="sm:hidden">
        <div className="bg-darkPrimary px-4 py-10 text-white flex flex-col">
          <div className="flex-1 pb-32">
            <h2 className="font-clash text-clash-32">
              The furniture brand for the future, with timeless designs
            </h2>
            <ButtonMediumLight text="view collection" href="/shop" />
          </div>
          <div className="h-[30%] flex items-end">
            <p className="font-satoshi text-satoshi-18">
              A new era in eco-friendly furniture with Avelon, the French luxury
              retail brand with nice fonts, tasteful colors, and a beautiful way
              to display things digitally using modern web technologies.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
