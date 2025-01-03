"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface ObjectProps {
  label: string;
  link: string;
}

interface NavItemsProps {
  items: ObjectProps[];
  className?: string; // Optional custom className for styling
}

const NavItems: React.FC<NavItemsProps> = ({ items, className }) => {
  if (!items.length) {
    return <p className="text-red-500">No navigation items available.</p>; // Fallback for empty array
  }

  // Framer Motion variants
  const listVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.ul
      className={` ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariant}
    >
      {items.map((item, index) => (
        <motion.li key={index} variants={listVariant}>
          <Link
            href={item.link}
            className="font-satoshi text-satoshi-12 text-[#726E8D] hover:text-darkPrimary transition-colors"
            aria-label={`Navigate to ${item.label}`}
          >
            {item.label}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default NavItems;
