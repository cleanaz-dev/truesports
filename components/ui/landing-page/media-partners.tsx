import React from "react";

const partners = [
  "/images/partners-1.jpg",
  "/images/partners-1.jpg",
  "/images/partners-1.jpg",
  "/images/partners-1.jpg",
  "/images/partners-1.jpg",
  "/images/partners-1.jpg",
];

export default function MediaPartners() {
  return (
    <section className="py-16 bg-white">
      <h1 className="text-3xl font-bold text-gray-500 text-center mb-12">
        MEDIA PARTNERS
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
        {partners.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Partner ${index + 1}`}
            className="max-h-24 object-contain"
          />
        ))}
      </div>
    </section>
  );
}
