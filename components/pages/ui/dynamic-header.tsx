import React from 'react';

interface DynamicHeaderProps {
  backgroundType?: 'image' | 'video' | 'youtube';
  backgroundSrc: string;
  topicText?: string;
  statementText?: string;
  descriptionText?: string;
  overlayOpacity?: number;
  textColor?: string;
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({ 
  backgroundType = 'image',
  backgroundSrc,
  topicText,
  statementText,
  descriptionText,
  overlayOpacity = 0.4,
  textColor = 'white'
}) => {
  return (
    <div className="relative w-full h-[55vh] sm:h-[92vh] flex items-center justify-center overflow-hidden" style={{ marginTop: 0, paddingTop: 0 }}>
      {/* Background Media */}
      {backgroundType === 'youtube' ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ top: 0, left: 0 }}>
          <iframe
            className="absolute top-1/2 left-1/2 
                 md:w-[150%] md:h-[150%] 
                 w-[300%] h-[300%] 
                 -translate-x-1/2 -translate-y-1/2 
                 pointer-events-none"
            src={backgroundSrc}
            title="YouTube video background"
            allow="autoplay; fullscreen"
            frameBorder="0"
            style={{ minWidth: '100vw', minHeight: '100vh' }}
          />
        </div>
      ) : backgroundType === 'video' ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{ minWidth: '100vw', minHeight: '100vh' }}
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundSrc})`, minHeight: '60vh' }}
        />
      )}
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-blue-700/50"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4  mx-auto">
        {/* Topic Text - Small */}
        {topicText && (
          <p 
            className="text-lg font-medium tracking-wider uppercase mb-2 "
            style={{ color: textColor }}
          >
            {topicText}
          </p>
        )}
        
        {/* Statement Text - Large */}
        {statementText && (
          <h1 
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
            style={{ color: textColor }}
          >
            {statementText}
          </h1>
        )}
        
        {/* Description Text - Light */}
        {descriptionText && (
          <p 
            className="text-base md:text-lg lg:text-xl  leading-6 max-w-3xl mx-auto"
            style={{ color: textColor }}
          >
            {descriptionText}
          </p>
        )}
      </div>
    </div>
  );
};

export default DynamicHeader;