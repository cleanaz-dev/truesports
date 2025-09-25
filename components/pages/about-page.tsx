import React from "react";
import DynamicHeader from "./ui/dynamic-header";

const features = [
  {
    title: "Tailored Sports Content",
    description:
      "True Sports crafts custom content strategies that resonate with your target audience, ensuring your brand's message stands out.",
  },
  {
    title: "Multimedia Mastery",
    description:
      "Our production team creates stunning visuals and digital campaigns that captivate viewers, boosting your brand's recognition.",
  },
  {
    title: "Sports-Inspired Merchandise",
    description:
      "Expand your brand's reach with True Sports' high-quality sports merchandise, connecting with fans on a whole new level.",
  },
];

function SportsFeatures() {
  return (
    <section className="w-full py-16 px-6 bg-slate-900">
      <div className="md:px-16 grid gap-12 md:grid-cols-3 ">
        {features.map((feature, i) => (
          <div key={i} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-500 uppercase">
              {feature.title}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div>
      <DynamicHeader
        statementText="Elevate Your Brand with True Sports"
        backgroundSrc="/images/image-2.jpeg"
        backgroundType="image"
        overlayOpacity={0.4}
        topicText="ABOUT TRUE SPORTS"
        descriptionText="Discover how True Sports can revolutionize your brand's presence and impact in the sports industry. Partner with us for unparalleled success."
      />
      <SportsFeatures />
    </div>
  );
}
