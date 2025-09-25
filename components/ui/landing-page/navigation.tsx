"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // shadcn Sheet
import NavLogo from "@/public/images/logo-removebg-preview.png";

const navItems = [
  { label: "Sports", href: "/sports" },
  { label: "TS Originals", href: "/ts-originals" },
  { label: "Betting", href: "/betting" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center",
        isScrolled
          ? "bg-[#1a1f24] h-16 sm:h-20 shadow-md"
          : "bg-transparent h-14 sm:h-24"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 w-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={clsx(
            "transition-transform duration-500",
            isScrolled ? "scale-90" : "scale-100"
          )}
        >
          <Image
            src={NavLogo}
            alt="nav-logo"
            className="w-20 sm:w-36"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative pb-1 text-white hover:text-gray-300 transition-colors",
                  isActive &&
                    "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-700 after:rounded"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Sheet Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-6 h-5 flex flex-col justify-between cursor-pointer">
                <span className="block h-[2px] w-full bg-blue-700 transition-transform duration-300"></span>
                <span className="block h-[2px] w-full bg-blue-700 transition-transform duration-300"></span>
                <span className="block h-[2px] w-full bg-blue-700 transition-transform duration-300"></span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="bg-[#1a1f24] h-screen flex flex-col items-center justify-center space-y-6"
            >
              <SheetTitle>
                <span className="text-white">Menu</span>
              </SheetTitle>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "text-white text-2xl hover:text-gray-300 transition-colors relative pb-1",
                      isActive &&
                        "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-700 after:rounded"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
