import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: React.ComponentType<{ size?: number }>;
}

export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    url: "https://facebook.com/truesports",
    icon: FaFacebookF,
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://instagram.com/truesports",
    icon: FaInstagram,
  },
  {
    id: "tiktok",
    label: "TikTok",
    url: "https://tiktok.com/@truesports",
    icon: FaTiktok,
  },
  {
    id: "youtube",
    label: "YouTube",
    url: "https://youtube.com/truesports",
    icon: FaYoutube,
  },
];
