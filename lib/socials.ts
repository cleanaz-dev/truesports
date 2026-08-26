import { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

export interface Social {
  name: string;
  url: string;
  icon: IconType;
}

export const SOCIALS: Social[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/truesportslive",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/19Xj3jQb2b/?mibextid=wwXIfr",
    icon: FaFacebook

  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/true-sports-official",
    icon: FaLinkedin
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@truesportstv?_r=1&_t=ZS-99C71A1gYkL",
    icon: FaTiktok
  },
  // {
  //   name: "Twitter",
  //   url: "https://x.com/truesportsceo",
  //   icon: FaTwitter,
  // },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@truesportslive",
    icon: FaYoutube,
  },
];