import React from 'react'
import DynamicHeader from './ui/dynamic-header'
import DynamicBanner from './ui/dynamic-banner'
import DynamicBrands from './ui/dynamic-brands'
import { tsBrands } from '@/lib/ts-data'

export default function TSOriginalsPage() {
  return (
    <div>
      <DynamicHeader 
        backgroundType="youtube"
        backgroundSrc="https://www.youtube.com/embed/otyt9N0-uI0?autoplay=1&mute=1&controls=0&loop=1&playlist=otyt9N0-uI0&modestbranding=1"
        topicText="EXPLORE OUR BRANDS"
        statementText="TRUE SPORTS BRANDS: UNITING AUDIENCES"
        descriptionText="Discover the dynamic world of True Sports diverse brands/divisions. Elevate your brand by joining our unique and engaged audiences."
        overlayOpacity={0.6}
        textColor="white"
      />
      <DynamicBanner
        descriptionText="True Sports brand ecosystem offers a range of genres to connect with audiences worldwide. Explore our specialized divisions below and find the perfect fit for your brand's journey."
        mainText='A Universe of Opportunities'
        subText='True Sports Brand Ecosystem'
      
      />
      <DynamicBrands brands={tsBrands} />
    </div>
  )
}