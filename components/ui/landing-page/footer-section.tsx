import React from "react";
import { Button } from "@/components/ui/button";
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="w-full">

      {/* Get Started Now Section */}
      <div className="bg-blue-700 text-white py-16 px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-3xl font-bold uppercase tracking-tighter">
              Get Started Now
            </h2>
            <p className="text-xs  max-w-2xl">
              Contact us today to explore the endless possibilities with True Sports. Your brand&apos;s sports journey begins here.
            </p>
          </div>

          {/* Button */}
          <div>
            <Button className="bg-transparent text-white text-base border-2 rounded-3xl hover:bg-transparent cursor-pointer px-10 py-5 uppercase">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Links & Social Section */}
      <div className="bg-[#1b1c1d] text-gray-300 py-10 px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Footer Links */}
          <div className="flex flex-wrap gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold mb-2">About</h4>
             
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              
            </div>
            <div>
              <h4 className="font-semibold mb-2">Advertise</h4>
             
            </div>
            <div>
              <h4 className="font-semibold mb-2">Careers</h4>
              
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 text-2xl">
            <FaYoutube />
            <FaFacebookF />
            <FaInstagram />
            <FaTiktok />
          </div>
        </div>
      </div>
    </footer>
  );
}
