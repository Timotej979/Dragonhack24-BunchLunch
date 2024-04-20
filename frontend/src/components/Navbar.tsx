import * as React from "react";
import Button from "./Button"; // Assuming Button is correctly imported from its file location
const Logo: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="h-32 -mr-10 w-auto object-contain shrink-0 self-center" // Aligning SVG with the center of flex items
  />
);



const Navbar: React.FC = () => (
  <header className="flex items-center justify-between p-4 bg-white w-full h-20 shadow-md"> {/* Fixed height to Navbar */}
    <div className="flex items-center"> {/* Flex container for logo and text */}
      <Logo src="/logo_maxsize.svg" alt="LunchBunch logo" />
      <h1 className="ml-2 text-3xl font-righteous text-black">BunchLunch</h1> {/* Using custom font class */}
    </div>
    <nav className="flex gap-4">
      <Button label="Pricing" />
      <Button label="Get BunchLunch" outline />
      <Button label="Login" primary />
    </nav>
  </header>
);

export default Navbar;
