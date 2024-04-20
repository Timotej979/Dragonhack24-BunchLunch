import * as React from "react";

type BenefitCardProps = {
    imageSrc: string;
    title: string;
    description: React.ReactNode;
    bgColor: string; // Color for the background circle
    key: number;
};

const BenefitCard: React.FC<BenefitCardProps> = ({ imageSrc, title, description, bgColor }) => {
  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div
        className="box-border flex relative flex-col shrink-0 gap-4 max-md:gap-2 max-md:py-5 max-md:my-auto"
      >
        <div className={`relative flex justify-center items-center h-[180px] w-[180px] rounded-full mx-auto ${bgColor}`}>
          <img
            loading="lazy"
            src={imageSrc}
            alt=""
            className="object-contain max-w-[80px] max-h-[80px]" // Use max-width and max-height to control the image size
          />
        </div>
        <div className="box-border relative shrink-0 mx-auto mt-5 h-auto text-3xl text-center">
          {title}
        </div>
        <div className="box-border relative shrink-0 mx-auto mt-5 h-auto">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const benefitsData = [
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets%2F6bea3e57ba1346ae85f98b6d430428c4%2F28d598c0cadd4328a356adcc691acb5a",
    title: "Vote for your favourite spot",
    description: (
      <>
        Tired of the same old lunch options? With our SaaS platform, you can easily vote for your
        favorite restaurant to order food from. No more debates or indecision - let the majority
        rule!
      </>
    ),
    bgColor: "bg-blue-300",
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets%2F6bea3e57ba1346ae85f98b6d430428c4%2F357d4ee43e364f4bb27e7470b0caf990",
    title: "Order Delicious Food",
    description: (
      <>
        Once the votes are in, it's time to order! Browse through the menu options, customize your
        meal, and place your order hassle-free. Say goodbye to long wait times and mixed-up orders.
      </>
    ),
    bgColor: "bg-amber-200",
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets%2F6bea3e57ba1346ae85f98b6d430428c4%2F75745168f3fb41348876d9264a9bcfec",
    title: "Save the Environment",
    description: (
      <>
        Not only does group ordering save time, but it also reduces waste. By ordering in bulk, we
        help minimize packaging and cut down on delivery trips. It's a win-win for your team and
        the environment!
      </>
    ),
    bgColor: "bg-lime-300",
  },
];

function Benefits() {
  return (
    <div className="box-border flex relative flex-col shrink-0 px-12 py-5 min-h-[100px]" style={{ maxWidth: 1440 }}>
      <section className="box-border flex relative flex-col grow shrink-0 self-stretch px-12 py-5 mx-auto w-full max-w-[1440px] min-h-[100px]">
        <div className="box-border relative shrink-0 mt-5 h-auto text-center">
          <h1><span className="text-4xl text-black">Why you should choose LunchBunch:</span></h1>
        </div>
        <div className="box-border flex relative flex-col shrink-0 pr-10 mt-14">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 text-black">
            {benefitsData.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Benefits;
