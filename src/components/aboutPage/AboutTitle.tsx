"use client";
import { motion } from "framer-motion";
import React from "react";

const AboutTitle = () => {
  return (
    <section className="px-4 sm:px-20 py-10">
      <motion.h1
        whileHover={{ scale: 1.3 }}
        className="font-clash text-clash-32 sm:text-clash-36  text-left sm:text-center "
      >
        A brand built on the love of craftmanship,
        <br /> quality and outstanding customer service
      </motion.h1>
    </section>
  );
};

export default AboutTitle;
