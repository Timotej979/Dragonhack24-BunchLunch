import * as React from "react";
import Button from "./Button"; 

interface PricingPlanProps {
    name: string;
    price: string | number;
    features: string[];
    isHighlighted?: boolean;
    billingCycle?: string; // New optional prop for billing cycle text
  }
  
  const PricingPlan: React.FC<PricingPlanProps> = ({
    name,
    price,
    features,
    isHighlighted = false,
    billingCycle = "/month", // Default value set to "/month"
  }) => {
    const borderColor = isHighlighted ? "border-green-400" : "border-green-400";
    const bgColor = isHighlighted ? "bg-green-600" : "bg-gray-100";
    const textColor = isHighlighted ? "text-white" : "text-green-600";
    const buttonBgColor = isHighlighted ? "bg-white" : "";
    const buttonTextColor = isHighlighted ? "text-green-600" : "text-green-600";
  
    return (
      <div
        className={`box-border flex relative flex-col shrink-0 pb-8 mt-6 rounded-md ${borderColor} border-solid border-[3px] ${bgColor}`}
      >
        <div
          className={`relative shrink-0 mt-8 h-auto text-center ${
            isHighlighted ? "text-white opacity-[0.73]" : "text-zinc-500"
          }`}
        >
          <p>{name}</p>
        </div>
        <div
          className={`relative shrink-0 mt-4 h-auto text-6xl text-center ${
            isHighlighted ? "text-white" : "text-green-700"
          }`}
        >
          <p>{price}€</p>
        </div>
        <div
          className={`relative shrink-0 mt-2.5 h-auto text-center ${
            isHighlighted ? "text-white opacity-[0.73]" : "text-zinc-500"
          }`}
        >
          <p>{billingCycle}</p> {/* Use the billingCycle prop */}
        </div>
        <ul className="mt-5 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className={`text-center ${textColor}`}>
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-8">
          <Button label="Get Started"/>
        </div>
      </div>
    );
  };
  

const pricingPlans: PricingPlanProps[] = [
  {
    name: "YUM",
    price: 15,
    features: [
      "10 users per order",
      "Standard Customer Support Email",
      "Simple Majority Voting",
      "Basic Order History",
      "List of Expenses per User",
    ],
    billingCycle : "/month",
  },
  {
    name: "MORE YUM",
    price: 40,
    features: [
      "Unlimited Users per Order",
      "24/7 Customer Support",
      "Multiple Voting Systems",
      "Advanced Order History Dashboard",
      "Integrated Expense Management",
    ],
    isHighlighted: true,
    billingCycle : "/month",
  },
  {
    name: "EVENT YUM",
    price: 0.40,
    features: [
      "Unlimited Users per Order",
      "24/7 event customer support",
      "Simple Majority Voting",
      "Basic Order History",
      "List of Expenses per User",
    ],
    billingCycle : "/attendee",
  },
];

export default function PricingSection() {
    return (
      <section className="box-border flex relative flex-col shrink-0 mt-5 pb-12 pt-12">
        <div className="box-border flex relative flex-col shrink-0 mt-5 mr-28 ml-28">
          <div className="flex gap-5 justify-center items-center max-sm:flex-col max-sm:gap-0 max-sm:justify-center">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="flex flex-col w-6/12 max-sm:ml-0 max-sm:w-full"
              >
                <PricingPlan {...plan} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  