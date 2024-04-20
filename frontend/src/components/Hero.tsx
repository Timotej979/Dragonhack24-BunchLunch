import * as React from "react";
import Button from "./Button"; // Assuming Button is correctly imported from its file location

const Hero: React.FC = () => {
  return (
    <section className="box-border flex relative flex-col shrink-0 self-stretch px-20 mt-5 mb-auto w-auto rounded-xl max-w-[1440px] max-md:grow max-md:mt-12 max-sm:m-auto">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col justify-start items-start my-auto max-w-[750px] max-md:flex max-md:flex-row max-md:flex-wrap max-md:mb-12">
            <div className="flex flex-col justify-start items-start self-stretch max-w-full w-[666px]">
              <h1 className="self-stretch max-w-full text-5xl font-bold tracking-tight text-left text-black leading-[57.6px] w-[666px] max-md:self-stretch max-md:w-auto max-md:text-5xl max-md:text-center max-sm:text-4xl">
                Meet the perfect application for group food ordering
              </h1>
              <p className="self-stretch mt-2 max-w-full text-2xl font-light tracking-normal text-left text-neutral-600 w-[666px] max-md:text-center max-sm:text-base max-sm:tracking-wider">
                Vote for your favourite restaurant and order food together.
              </p>
            </div>
            <div className="flex flex-row gap-4 justify-start items-center mt-9 mr-auto w-full max-w-[444px] max-md:justify-start max-md:items-center max-md:self-stretch max-md:mx-auto max-md:w-full max-md:max-w-[520px]">
              <Button label="Get Started" primary={true} />
              <Button label="Learn More" outline={true} />
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F13725b47a855414e93fd6631495f584e"
            alt="Placeholder image"
            className="box-border object-contain overflow-hidden shrink-0 w-auto rounded-2xl aspect-[0.89] min-h-[20px] min-w-[20px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
