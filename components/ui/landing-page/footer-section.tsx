import React from "react";
import { Button } from "@/components/ui/button";
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="w-full">

      {/* Get Started Now Section */}
      <div className="bg-blue-700 text-white py-12 px-6 sm:py-16 sm:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tighter mb-2">
              Get Started Now
            </h2>
            <p className="text-xs sm:text-sm max-w-2xl">
              Contact us today to explore the endless possibilities with True Sports. Your brand&apos;s sports journey begins here.
            </p>
          </div>

          {/* Button */}
          <div className="w-full md:w-auto">
            <Button className="bg-transparent text-white text-base border-2 rounded-3xl hover:bg-transparent cursor-pointer px-10 py-4 w-full md:w-auto uppercase">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Links & Social Section */}
      <div className="bg-[#1b1c1d] text-gray-300 py-8 px-6 sm:py-10 sm:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm sm:text-base">
            <div className="hover:text-white cursor-pointer">About</div>
            <div className="hover:text-white cursor-pointer">Contact</div>
            <div className="hover:text-white cursor-pointer">Advertise</div>
            <div className="hover:text-white cursor-pointer">Careers</div>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 text-2xl">
            <FaYoutube className="hover:text-white cursor-pointer" />
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaTiktok className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
