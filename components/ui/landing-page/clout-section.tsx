import React from "react";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";

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
        className="relative w-full text-white text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/image1.png')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center min-h-[500px] md:min-h-[700px] px-6 py-40">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg px-6 py-8 max-w-3xl">
            <h2 className="text-4xl md:text-7xl font-extrabold mb-4 uppercase">
              20 Million Strong
            </h2>
            <p className="text-md md:text-lg">
              Join True Sports to tap into our vast audience of over 20 million
              passionate sports fans. Your brand&apos;s potential is limitless.
            </p>
          </div>
        </div>
      </section>

      {/* Slate 800 Section - Text Left, Image Right */}
      <section className="bg-[#1b1c1d] text-white py-14 md:py-20 ">
        <div className=" flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left Side Text */}
          <div className="md:w-1/2 px-8 md:pr-0 md:pl-16 pt-0 md:pt-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-2 uppercase text-blue-600 leading-6 md:leading-10.5">
              Be a Sports Industry Leader
            </h2>
            <h3 className="text-lg font-semibold mb-6">Elevate Your Brand</h3>
            <p className="mb-6 md:mb-12 text-md md:text-xl font-light">
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
              src="/images/image-2.jpeg"
              alt="Sports Leadership"
              className="w-full object-cover"
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 bg-black/40 space-y-6">
          {/* Play Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl transition-transform transform hover:scale-110">
            <FaPlay />
          </button>

          <h2 className="text-3xl md:text-7xl font-extrabold mb-4 uppercase leading-6 md:leading-14 px-6 md:px-16">
            Watch True Sports in Action
          </h2>
          <p className="text-lg md:text-2xl max-w-3xl leading-6 text-balance">
            Watch how we&apos;ve grown into a sport industry powerhouse.
            Let&apos;s take your brand to the next level together.
          </p>
        </div>
      </section>
    </div>
  );
}
