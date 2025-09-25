import DynamicHeader from "./ui/dynamic-header"
import DynamicBanner from "./ui/dynamic-banner"
import SocialCounter from "./ui/social-counter"

export default function AdvertisementPage() {
  return (
    <div>
      <DynamicHeader
        backgroundType="youtube"
        backgroundSrc="https://www.youtube.com/embed/xIlUmUHP9Kw?autoplay=1&mute=1&controls=0&loop=1&playlist=xIlUmUHP9Kw&modestbranding=1"
        topicText="PARTNER WITH US"
        statementText="ADVERTISEMENT OPPORTUNITIES"
        descriptionText="Join the True Sports ecosystem and connect with millions of engaged sports fans across North America and Europe. Partner with us for premium audience access and measurable ROI through targeted campaigns."
        overlayOpacity={0.5}
        textColor="white"
      />
      
      <DynamicBanner
        descriptionText="Driven by data and audience engagement, True Sports leads emerging sports media brands in video views, follower growth, and virality. We partner with athletes, influencers, and creators to amplify reach and impact."
        mainText="A Network Built for Growth"
        subText="True Sports Partnership Opportunities"
      />
      <SocialCounter />
    
    </div>
  )
}