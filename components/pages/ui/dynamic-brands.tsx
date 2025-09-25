import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BrandItem {
  id: string;
  image: string;
  imageAlt: string;
  bigText: string;
  smallText: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface DynamicBrandsProps {
  brands: BrandItem[];
}

const DynamicBrands: React.FC<DynamicBrandsProps> = ({ brands }) => {
  return (
    <div className="w-full py-16 px-4 bg-[#1b1c1d]">
      <div className="max-w-6xl mx-auto space-y-16">
        {brands.map((brand, index) => (
          <div
            key={brand.id}
            className={`flex flex-col lg:flex-row items-center gap-8 ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2 h-80 relative">
              <Image
                src={brand.image}
                alt={brand.imageAlt}
                width={600}
                height={320} // pick a standard aspect ratio, e.g. 16:9
                className="w-full h-80 rounded-lg object-contain"
              />
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-4">
              {/* Big Blue Text */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-700">
                {brand.bigText}
              </h2>

              {/* Small Blue Text */}
              <h3 className="text-lg md:text-xl font-semibold text-blue-700">
                {brand.smallText}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {brand.description}
              </p>

              {/* Button */}
              <div className="pt-4">
                <Link href={brand.buttonLink}>
                  <Button
                    size="lg"
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                  >
                    {brand.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicBrands;
