import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-darkPrimary text-white pt-12 pb-5 px-4 sm:px-10 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        {/* Menu Section */}
        <div className="col-span-1">
          <h4 className="font-clash text-clash-16 mb-4">Menu</h4>
          <ul className="space-y-2">
            <li className="font-satoshi text-satoshi-16">
              <Link href="/new-arrivals">New arrivals</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/best-sellers">Best sellers</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/recently-viewed">Recently viewed</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/popular-this-week">Popular this week</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/all-products">All products</Link>
            </li>
          </ul>
        </div>

        {/* Categories Section */}
        <div className="col-span-1">
          <h4 className="font-clash text-clash-16 mb-4">Categories</h4>
          <ul className="space-y-2">
            <li className="font-satoshi text-satoshi-16">
              <Link href="/crockery">Crockery</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/furniture">Furniture</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/homeware">Homeware</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/plant-pots">Plant pots</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/chairs">Chairs</Link>
            </li>
          </ul>
        </div>

        {/* Our Company Section */}
        <div className="col-span-1">
          <h4 className="font-clash text-clash-16 mb-4">Our company</h4>
          <ul className="space-y-2">
            <li className="font-satoshi text-satoshi-16">
              <Link href="/about-us">About us</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/vacancies">Vacancies</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/contact-us">Contact us</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/privacy">Privacy</Link>
            </li>
            <li className="font-satoshi text-satoshi-16">
              <Link href="/returns-policy">Returns policy</Link>
            </li>
          </ul>
        </div>

        {/* Mailing List Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h4 className="font-clash text-clash-16 mb-4">
            Join our mailing list
          </h4>
          <div className="flex  sm:flex-row items-start sm:items-center  sm:space-y-0 sm:space-x-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-4 bg-[#4a4766] text-white text-satoshi-16 font-satoshi focus:outline-none"
            />
            <button className="px-8 py-4 bg-white text-[#2A254B] font-satoshi text-satoshi-16 min-w-max">
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-primary mt-8 pt-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="font-satoshi text-base text-center md:text-left">
          Copyright © 2022 Avion LTD
        </p>
        <div className="hidden md:flex justify-center space-x-4">
          <Link href="#">
            <Linkedin className="text-white hover:text-indigo-400" size={24} />
          </Link>
          <Link href="#">
            <Facebook className="text-white hover:text-indigo-400" size={24} />
          </Link>
          <Link href="#">
            <Instagram className="text-white hover:text-indigo-400" size={24} />
          </Link>
          <Link href="#">
            <Twitter className="text-white hover:text-indigo-400" size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
