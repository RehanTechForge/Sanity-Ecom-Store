"use client";

import { CircleUser, Menu, Search, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import React from "react";
import NavItems from "./NavItems";
import Link from "next/link";
import {
  ClerkLoaded,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const items = [
  { label: "Home V1", link: "/" },
  { label: "Home V2", link: "/home-v1" },
  { label: "About V1", link: "/about" },
  { label: "About V2", link: "/about-v2" },
  { label: "Cart V2", link: "/cart-v2" },
  { label: "Shop V1", link: "/shop" },
  { label: "Shop V2", link: "/shop-v2" },
  { label: "Shop V3", link: "/shop-v3" },
];

const slideIn = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { x: "100%", opacity: 0, transition: { type: "tween" } },
};

const TopHeader = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="border-b-none sm:border-b border-[#e5e5e5] flex justify-between items-center py-2 px-4">
      {/* Search Icon with Dropdown (Desktop Only) */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Search className="w-[16px] h-[16px]" aria-label="Search" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <form onSubmit={(e) => e.preventDefault()} className="p-2">
              <Input type="search" placeholder="Search..." className="mb-2" />
              <Button type="submit" className="w-full">
                Search
              </Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Logo */}
      <div className="capitalize font-clash text-clash-24">
        <Link href="/">avion</Link>
      </div>

      {/* Cart and User Icons (Desktop Only) */}

      <div className="hidden md:flex gap-4 items-center">
        <Link href={"/cart"} aria-label="Cart">
          <ShoppingCart className="w-[16px] h-[16px]" />
        </Link>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserButton afterSignOutUrl="/" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Signed in as {user?.primaryEmailAddress?.emailAddress}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/orders">Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton></SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="outline" size="sm">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="flex gap-4 md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Search className="w-[16px] h-[16px]" aria-label="Search" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <form onSubmit={(e) => e.preventDefault()} className="p-2">
              <Input type="search" placeholder="Search..." className="mb-2" />
              <Button type="submit" className="w-full">
                Search
              </Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-[16px] h-[16px]" aria-label="Menu" />
            </Button>
          </SheetTrigger>
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  <nav>
                    <NavItems
                      items={items}
                      className="flex flex-col justify-center items-center md:hidden space-y-4"
                    />
                  </nav>
                  {isSignedIn ? (
                    <div className="mt-4 flex flex-col items-center">
                      <p>
                        Signed in as {user?.primaryEmailAddress?.emailAddress}
                      </p>
                      <Link href="/profile" className="mt-2">
                        <Button variant="outline">Profile</Button>
                      </Link>
                      <Link href="/orders" className="mt-2">
                        <Button variant="outline">Orders</Button>
                      </Link>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col items-center gap-2">
                      <SignInButton mode="modal">
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button className="w-full">Sign Up</Button>
                      </SignUpButton>
                    </div>
                  )}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </motion.div>
        </Sheet>
      </div>
    </div>
  );
};

export default TopHeader;
