//src/components/Navbar
import * as React from "react";
import Button from "./Button"; // Assuming Button is correctly imported from its file location
const Logo: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    onClick={() => window.location.reload()} // Add onClick event to refresh the page
    className="h-32 -mr-10 w-auto object-contain shrink-0 self-center" // Aligning SVG with the center of flex items
  />
);

const Navbar: React.FC = () => (
  <header className="flex items-center justify-between p-4 bg-white w-full h-20 shadow-md"> {/* Fixed height to Navbar */}
    <div className="flex items-center cursor-pointer"> {/* Flex container for logo and text */}
      <Logo src="/logo_maxsize.svg" alt="LunchBunch logo" />
      <h1 className="ml-2 text-3xl font-righteous text-black" onClick={() => window.location.reload()}>BunchLunch</h1>
      </div>
    <nav className="flex gap-4">
      <Button label="Get BunchLunch" outline />
      <Button label="Login" primary />
    </nav>
  </header>
);

export default Navbar;
