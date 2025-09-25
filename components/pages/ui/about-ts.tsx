"use client";
import { useEffect, useState } from "react";
import React from "react";

const AboutTS: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Global Parallax Background */}
      <div
        className="fixed inset-0 bg-cover bg-center will-change-transform -z-10"
        style={{
          backgroundImage: "url(/images/image-2.jpeg)",
          transform: `translateY(${scrollY * 0.05}px) scale(1.1)`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      {/* Sections */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-6  text-white p-8">
          {/* Heading */}
          <h2 className="text-5xl font-black uppercase tracking-wider mb-4">
            Mission Statement
          </h2>

          {/* Quote Box */}
          <div className="relative">
            <p className="text-2xl leading-relaxed font-light tracking-wide">
              <span className="font-semibold">True Sports</span> connects and
              empowers sports fans in North America and Europe with real-time
              highlights, exclusive commentary, and engaging content that
              captures the raw emotion of authentic fandom.
              <br />
              We disrupt generic coverage with a{" "}
              <span className="font-semibold">
                fresh, resonant perspective
              </span>{" "}
              that goes beyond commentary.
              <br />
              <span className="font-semibold">
                Multi-Platform Accessibility
              </span>{" "}
              — Available on TikTok, Instagram, YouTube, and more, we deliver an
              always-on fan experience, redefining sports media through{" "}
              <span className="font-semibold">genuine authenticity</span>.
              <br />
              <span className="font-semibold">Commitment to the Future</span> —
              Through True Sports Cares, we support grassroots youth development
              with essential resources like equipment, training, mentorship, and
              camps—uniting communities, celebrating passion, and investing in{" "}
              <span className="font-semibold">tomorrow's champions</span>.
            </p>
          </div>
        </div>
      </section>
      {/* Second Section - Compact Blue Section */}
      <section className="w-full py-16 md:py-24 px-6 bg-blue-700">
        <div className="md:px-16 grid gap-12 md:grid-cols-3">
          {/* Data-Driven Impact */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase">
              Data-Driven Impact
            </h2>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              Leading sports media brands in video views, follower growth, and
              virality through strategic data analysis.
            </p>
          </div>

          {/* Elite Partnerships */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase">
              Elite Partnerships
            </h2>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              Collaborating with top athletes, influencers, and creators to
              amplify reach and maximize brand impact.
            </p>
          </div>

          {/* Proven ROI */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase">
              Proven ROI
            </h2>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              Delivering measurable returns through targeted campaigns and
              authentic community activations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutTS;
