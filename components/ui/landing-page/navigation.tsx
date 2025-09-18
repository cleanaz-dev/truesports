"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import NavLogo from "@/public/images/logo-removebg-preview.png";

const navItems = [
  { label: "Sports", href: "/sports" },
  { label: "TS Originals", href: "/originals" },
  { label: "The Culture", href: "/culture" },
  { label: "E-Sports & Gaming", href: "/esports" },
  { label: "Betting", href: "/betting" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center",
        isScrolled ? "bg-[#1a1f24] h-20 shadow-md" : "bg-transparent h-24"
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
          <Image src={NavLogo} alt="nav-logo" className="w-36" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Menu */}
        {/* Hamburger Menu */}
        <div className="md:hidden w-8 h-6 flex flex-col justify-between cursor-pointer group">
          <span className="block h-[2px] w-full bg-blue-700 transition-transform duration-300 group-hover:-translate-y-1"></span>
          <span className="block h-[2px] w-full bg-blue-700 transition-transform duration-300"></span>
          <span className="block h-[2px] w-full bg-blue-700 transition-transform duration-300 group-hover:translate-y-1"></span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1a1f24] w-full absolute top-full left-0 flex flex-col items-center py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white text-lg hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
