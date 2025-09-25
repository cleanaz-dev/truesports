import React from "react";
import { socialLinks } from "@/lib/social-data";

const SocialIcons: React.FC = () => {
  return (
    <div className="flex gap-4 justify-center md:justify-start">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="bg-blue-700 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-800 transition"
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
