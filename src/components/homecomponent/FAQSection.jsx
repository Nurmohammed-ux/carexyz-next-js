"use client";

import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const FAQSection = () => {
  // কোন আকর্ডিয়নটি ওপেন আছে তা ট্র্যাক করার জন্য (একসাথে একটি খোলা রাখার সুবিধা)
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Care.xyz থেকে কীভাবে কেয়ারগিভার বা নার্স বুক করব?",
      answer:
        "প্রথমে আমাদের 'সকল সার্ভিস' পেজ থেকে আপনার প্রয়োজনীয় সেবাটি বেছে নিন। এরপর 'কেয়ার বুক করুন' বাটনে ক্লিক করে সময়কাল (ঘণ্টা বা দিন) এবং আপনার সঠিক ঠিকানা প্রদান করে বুকিং কনফার্ম করতে পারবেন। বুকিং সফল হওয়ার পর এটি 'Pending' অবস্থায় থাকবে এবং আমাদের টিম আপনার সাথে যোগাযোগ করবে।",
    },
    {
      question: "কেয়ারগিভার বা সেবাকারীদের ব্যাকগ্রাউন্ড কি যাচাইকৃত?",
      answer:
        "হ্যাঁ, শতভাগ নিশ্চিত থাকুন। Care.xyz-এর প্রতিটি কেয়ারগিভার, নার্স ও সেবাকারীকে নিয়োগ দেওয়ার আগে তাদের জাতীয় পরিচয়পত্র, পুলিশ ভেরিফিকেশন এবং পূর্বের অভিজ্ঞতার সনদ কঠোরভাবে যাচাই করা হয়।",
    },
    {
      question: "বুকিং কনফার্ম করার পর কি তা বাতিল করা যাবে?",
      answer:
        "হ্যাঁ, আপনার বুকিংটি যদি 'Pending' অথবা 'Confirmed' স্টেটে থাকে, তবে আপনি আপনার 'আমার বুকিং' ড্যাশবোর্ড থেকে খুব সহজেই সেটি বাতিল (Cancel) করতে পারবেন।",
    },
    {
      question: "পেমেন্ট বা মূল্য পরিশোধের পদ্ধতি কী?",
      answer:
        "আমরা বর্তমানে ক্যাশ অন ডেলিভারি (Cash on Delivery) এবং অনলাইন পেমেন্ট সুবিধা দিয়ে থাকি। সেবা পাওয়ার পর আপনি সন্তুষ্ট হয়ে নিয়মানুযায়ী মূল্য পরিশোধ করতে পারবেন।",
    },
    {
      question: "সেবা পাওয়ার ক্ষেত্রে সময়ের কি কোনো নির্দিষ্ট নিয়ম আছে?",
      answer:
        "আপনার প্রয়োজন অনুযায়ী সেবা নিতে পারেন। আমাদের প্ল্যাটফর্মে ঘণ্টাভিত্তিক (Hourly) এবং দিনভিত্তিক (Daily)—উভয় প্রকার নমনীয় বুকিংয়ের সুব্যবস্থা রয়েছে।",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pb-16 px-4 lg:px-8 bg-base-100">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
          <span>
            সচরাচর জিজ্ঞাসিত <span className="text-primary">প্রশ্নাবলী</span>
          </span>
          <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl">
            <FaQuestionCircle />
          </span>
        </h2>
        <p className="text-base-content/70 mt-4">
          Care.xyz এর সেবা, বুকিং প্রক্রিয়া এবং নিরাপত্তা নিয়ে আপনার মনে থাকা
          প্রশ্নগুলোর উত্তর এখানে দেখে নিতে পারেন।
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border border-base-300 rounded-xl transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-base-200/60 shadow-sm border-primary/40"
                  : "bg-base-100 hover:bg-base-200/30"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left font-semibold text-lg focus:outline-none gap-4"
              >
                <span className="font-medium">{faq.question}</span>
                <span
                  className={`w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-primary text-gray-400" : ""
                  }`}
                >
                  <FaChevronDown className="text-xs" />
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-base-content/75 leading-relaxed border-t border-base-300/50 pt-4">
                  {faq.parse ? faq.answer : <p>{faq.answer}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
