import React from 'react';

interface DynamicBannerProps {
  mainText?: string;
  subText?: string;
  descriptionText?: string;
  textColor?: string;
  backgroundColor?: string;
}

const DynamicBanner: React.FC<DynamicBannerProps> = ({
  mainText,
  subText,
  descriptionText,
  textColor = 'white',
}) => {
  return (
    <div 
      className="w-full py-20 px-4 bg-blue-700 "
    >
      <div className="max-w-4xl mx-auto">
        {/* Large Bold Text */}
        {mainText && (
          <h1 
            className="text-4xl md:text-6xl font-extrabold mb-4 leading-7 uppercase md:leading-12 tracking-tighter text-balance max-w-2xl"
            style={{ color: textColor }}
          >
            {mainText}
          </h1>
        )}
        
        {/* Smaller Bold Text */}
        {subText && (
          <h2 
            className="text-xl font-bold mb-2"
            style={{ color: textColor }}
          >
            {subText}
          </h2>
        )}
        
        {/* Description Text - Light with padding top */}
        {descriptionText && (
          <p 
            className="text-base md:text-lg lg:text-xl font-light leading-relaxed mx-auto"
            style={{ color: textColor }}
          >
            {descriptionText}
          </p>
        )}
      </div>
    </div>
  );
};

export default DynamicBanner;