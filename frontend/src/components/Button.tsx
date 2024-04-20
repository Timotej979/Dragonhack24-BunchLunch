//src/components/Button.tsx
import * as React from "react";

interface ButtonProps {
  label: string;
  primary?: boolean;
  outline?: boolean;
  yarMoney?: boolean;
}

const Button: React.FC<ButtonProps & { onClick?: () => void }> = ({ label, primary, outline, yarMoney, onClick }) => {
  // Base classes for button styling
  const baseClasses = "px-6 py-3 rounded text-sm font-semibold shrink-0 transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden";
  // Classes for primary button style
  const primaryClasses = "bg-green-500 text-white hover:bg-green-600";
  // Classes for outline button style
  const outlineClasses = "text-black border border-black hover:bg-gray-200";
  // Default button style with custom hover underline effect
  const defaultClasses = "text-black before:content-[''] before:absolute before:left-1/2 before:bottom-0 before:w-0 before:h-0.5 before:bg-black before:transition-all before:duration-300 hover:before:w-full hover:before:left-0";

  const getYarMoneyClasses = "bg-white text-black hover:bg-gray-300";

  let className = baseClasses;
  if (primary) {
    className += ` ${primaryClasses}`;
  } else if (outline) {
    className += ` ${outlineClasses}`;
  } else if (yarMoney) {
    className += ` ${getYarMoneyClasses}`;
  }
  else {
    className += ` ${defaultClasses}`;
  }

  return (
    <>
      <style>
        {`
          .button-underline-hover:before {
            animation: underline-animation 0.3s forwards;
          }

          @keyframes underline-animation {
            0% { width: 0; left: 50%; }
            50% { width: 100%; left: 0; }
            100% { width: 100%; left: 0; }
          }
        `}
      </style>
      <button className={className} onClick={onClick}>
        {label}
      </button>
    </>
  );
};

export default Button;
