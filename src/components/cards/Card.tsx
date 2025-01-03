"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Product } from "../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";

const Card = ({ card }: { card: Product }) => {
  // Framer Motion Variants
  const hoverEffect = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  const fadeInEffect = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={fadeInEffect}
      className="cursor-pointer"
    >
      <Link href={`/shop/${card.slug?.current}`}>
        <motion.div variants={hoverEffect} className="p-2 rounded-lg">
          {card.mainImage?.asset && (
            <Image
              src={urlFor(card.mainImage?.asset).url() || ""}
              alt={card.title || "Product image"}
              height={375}
              width={305}
              className="w-full"
            />
          )}
          <div className="flex flex-col gap-1 mt-4">
            <span className="font-clash text-clash-20 text-darkPrimary">
              {card.title}
            </span>
            <span className="font-satoshi text-satoshi-18 text-darkPrimary">
              ${card.price}
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Card;
