import React from "react";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="px-10">
      <TopHeader />
      <Navbar />
    </header>
  );
};

export default Header;
