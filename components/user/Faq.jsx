"use client";

import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
  return (
    <div className="container mx-auto xl:px-0 !p-0 mb-9" id="faq">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
      <h1 className= "text-3xl font-semibold text-gray-900 dark:text-white text-center mb-4">FAQ's</h1>
       
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
};

const faqdata = [
  {
    question: "Can I edit my order?",
    answer:
      "Yes, you can edit your order before it reaches the restaurant by contacting customer support. Once the restaurant starts preparing your food, editing is not possible.",
  },
  {
    question: "I want to cancel my order?",
    answer:
      "You can cancel your order if it hasn't been placed with the restaurant yet by contacting customer service at 080-67466729. A cancellation fee may apply if the order has been confirmed.",
  },
  {
    question: "How long do you take to deliver?",
    answer:
      "Delivery times vary by location. Once you select your location, the expected delivery time will be shown.",
  },
  {
    question: "What are your delivery hours?",
    answer:
      "Delivery hours depend on the location and the availability of restaurant partners",
  },
  {
    question: "Can I order from any location?",
    answer:
      "Yes, you can order from any restaurant listed in your location's search results. It's recommended to enable GPS for accurate location detection.",
  },
    
];

export default Faq;
