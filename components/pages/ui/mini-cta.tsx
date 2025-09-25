import React from "react";

export default function MiniCTAComponent() {
  return (
    <section className="w-full bg-blue-700 py-16 px-6 text-center">
      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
        Get in Touch
      </h2>

      {/* Description */}
      <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8">
        Contact us today to explore the endless possibilities with True Sports. 
        Your brand&apos;s sports journey begins here.
      </p>

      {/* Button */}
      <a
        href="/contact"
        className="inline-block bg-white text-blue-700 font-semibold text-lg px-8 py-4 rounded-3xl hover:bg-gray-100 transition"
      >
        Contact Us
      </a>
    </section>
  );
}
