import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SocialIcons from "./social-icons";

export default function ContactForm() {
  return (
    <section className="w-full">
      {/* Full Width Map */}
      <div className="relative w-full h-72 md:h-96">
        <Image
          src="/images/map-image-01.jpg"
          alt="Map location"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto py-12 md:py-16 px-6 flex flex-col md:flex-row gap-12">
        {/* Left Side - Text */}
        <div className="flex-1 md:mt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 uppercase">
            Contact True Sports
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Have a question or want to explore partnership opportunities? Fill
            out the form, and our team will get back to you shortly. We can’t
            wait to hear from you!
          </p>
          <p className="text-sm text-gray-500">
            By clicking “Submit”, you grant True Sports Live permission to
            communicate with you electronically about products, services, news,
            and promotions via the contact information provided.
          </p>

          <div className="pt-12 md:pt-16">
            <SocialIcons />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1">
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-blue-700 text-white font-semibold py-3 rounded-md hover:bg-blue-800 transition"
            >
              <span className="text-lg">Submit</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
