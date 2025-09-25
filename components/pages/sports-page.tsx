import React from "react";

import DynamicHeader from "./ui/dynamic-header";
import DynamicBanner from "./ui/dynamic-banner";
import DynamicBrands from "./ui/dynamic-brands";
import { brandsData } from "@/lib/brand-data";

export default function SportsPage() {
  return (
    <div>
      <DynamicHeader
        backgroundType="youtube"
        backgroundSrc="https://www.youtube.com/embed/xIlUmUHP9Kw?autoplay=1&mute=1&controls=0&loop=1&playlist=xIlUmUHP9Kw&modestbranding=1"
        topicText="TRUE SPORTS"
        statementText="PROFFESSIONAL SPORTS WE COVER!"
        descriptionText="Explore our comprehensive coverage of professional sports, presented through engaging Podcasts, insightful Blogs, and across various Social Media Platforms. Discover the wide range of sports we delve into!"
        overlayOpacity={0.4}
        textColor="white"
      />
      <DynamicBanner
        descriptionText="True Sports brand ecosystem offers a range of genres to connect with audiences worldwide. Explore our specialized divisions below and find the perfect fit for your brand's journey."
        mainText="A Universe of Opportunities"
        subText="True Sports Brand Ecosystem"
      />
      <DynamicBrands brands={brandsData} />
    </div>
  );
}
