'use client'

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does this platform work?",
    answer:
      "Our platform allows individuals to create campaigns, attract investors, and raise funds efficiently. You can start by setting up a campaign and sharing it with potential supporters.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Absolutely! We use advanced encryption and trusted payment gateways like Stripe to ensure your transactions are safe and secure.",
  },
  {
    question: "Can I withdraw my funds anytime?",
    answer:
      "Withdrawals depend on the campaign type. Some require meeting a funding goal, while others allow partial withdrawals. Check your campaign settings for details.",
  },
  {
    question: "Are there any fees involved?",
    answer:
      "We charge a small percentage fee to cover transaction costs and platform maintenance. The exact fees are displayed before you finalize your campaign.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team via email, live chat, or our contact form. We’re available 24/7 to assist you.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen mt-20 bg-gray-100 py-16 px-6 flex flex-col items-center">
      <motion.h1
        className="text-4xl font-bold text-blue-600 text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked Questions
      </motion.h1>

      <motion.div
        className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {faqs.map((faq, index) => (
          <div key={index} className="border-b last:border-none">
            <button
              className="w-full flex justify-between items-center py-4 text-lg font-medium text-gray-800 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <FaMinus className="text-blue-500 transition-transform transform rotate-180" />
              ) : (
                <FaPlus className="text-gray-500 transition-transform transform rotate-0" />
              )}
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-gray-600 pb-4">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </main>
  );
}
