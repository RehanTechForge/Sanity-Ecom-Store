"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const ButtonMedium = ({ text, href }: { text: string; href: string }) => {
  return (
    <>
      <Link
        href={href}
        className="bg-lightGrey text-borderDark font-satoshi text-satoshi-16 px-[32px] py-[16px] my-6 inline-block w-full text-center sm:w-max capitalize"
      >
        {text}
      </Link>
    </>
  );
};
const ButtonMediumDark = ({ text, href }: { text: string; href?: string }) => {
  return (
    <>
      <Link
        href={href || "#"}
        className="bg-darkPrimary text-white font-satoshi text-satoshi-16 px-[32px] py-[16px] my-6 inline-block text-center w-full sm:w-max capitalize"
      >
        {text}
      </Link>
    </>
  );
};
const ButtonMediumLight = ({ text, href }: { text: string; href: string }) => {
  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className="bg-[#494665] text-white font-satoshi text-satoshi-16 px-[32px] py-[16px] my-6 inline-block w-full text-center sm:w-max capitalize"
      >
        {text}
      </Link>
    </motion.button>
  );
};
export { ButtonMedium, ButtonMediumDark, ButtonMediumLight };
