import React from "react";
import { Button } from "@/components/ui/button";

export default function CloutSection() {
  return (
    <div className="w-full">
      {/* Clout Section - Blue Background */}
      <section className="bg-blue-700 text-white py-24 px-6 text-center">
        <h2 className="text-3xl md:text-6xl font-extrabold mb-2 leading-12.5">
          PARTNER WITH TRUE SPORTS
        </h2>
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          TAILORED SPORTS EXCELLENCE
        </h3>
        <p className="max-w-3xl mx-auto text-md md:text-lg">
          True Sports is your gateway to unparalleled sports content and engaged
          audiences. Collaborate with us to customize your brand&apos;s sports
          journey and achieve unmatched visibility.
        </p>
      </section>

      {/* 20 Million Strong Section - Background Image */}
      <section
        className="py-20 px-6 text-white text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/your-bg-image.jpg')" }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          20 Million Strong
        </h2>
        <p className="max-w-3xl mx-auto text-md md:text-lg">
          Join True Sports to tap into our vast audience of over 20 million
          passionate sports fans. Your brand&apos;s potential is limitless.
        </p>
      </section>

      {/* Slate 800 Section - Text Left, Image Right */}
      <section className="bg-[#1b1c1d] text-white py-20 ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left Side Text */}
          <div className="md:w-1/2 px-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-2 uppercase text-blue-600 leading-10.5">
              Be a Sports Industry Leader
            </h2>
            <h3 className="text-lg font-semibold mb-6">
              Elevate Your Brand
            </h3>
            <p className="mb-6 text-md md:text-xl font-light">
              Step into the spotlight and lead the way in the sports industry
              with True Sports. Harness our expertise to create captivating
              narratives for your brand.
            </p>
   <Button className="bg-transparent text-white text-sm border-2 border-blue-700 rounded-3xl hover:bg-transparent cursor-pointer px-10 py-5 uppercase">
              Learn More
            </Button>
          </div>

          {/* Right Side Image */}
          <div className="md:w-1/2">
            <img
              src="/images/your-right-image.jpg"
              alt="Sports Leadership"
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* YouTube Image Section */}
      <section
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/yt-image.jpg')" }}
      >
        {/* Overlay for text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 bg-black/30">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            Your Next Section Title
          </h2>
          <p className="text-lg md:text-2xl max-w-3xl">
            Add supporting text or call to action here if needed.
          </p>
        </div>
      </section>
    </div>
  );
}
