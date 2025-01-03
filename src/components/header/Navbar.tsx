import React from "react";
import NavItems from "./NavItems"; // Import the NavItems component

const items = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  { label: "Shop", link: "/shop" },
];

const Navbar = () => {
  return (
    <nav className="flex justify-center my-2">
      <ul className="hidden md:flex space-x-4">
        {/* Use the NavItems component */}
        <NavItems items={items} className="flex my-2 space-x-4" />
      </ul>
    </nav>
  );
};

export default Navbar;
