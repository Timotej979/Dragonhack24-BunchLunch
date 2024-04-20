import * as React from "react";

interface SocialMediaIconProps {
  src: string;
  alt: string;
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ src, alt }) => {
  return <li className="mx-4">
    <img loading="lazy" alt={alt} src={src} className="object-cover w-full" />
  </li>;
};


const Footer: React.FC = () => {
  return (
    <footer className="box-border flex relative flex-col shrink-0 items-center p-5 bg-stone-50">
      
      <p className="mt-5 text-xs text-center text-neutral-600">
        Copyright © 2024 ByteSized, thanks to Wolt.
      </p>
    </footer>
  );
};

export default Footer;