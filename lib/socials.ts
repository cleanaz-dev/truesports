import { IconType } from "react-icons";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

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
    name: "Twitter",
    url: "https://x.com/truesportsceo",
    icon: FaTwitter,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@truesportslive",
    icon: FaYoutube,
  },
];