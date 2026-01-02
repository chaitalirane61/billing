"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { FAQItem } from "@/app/types/faq";

interface ShopcareContent {
  faq: FAQItem[];
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const INITIAL_DISPLAY_COUNT = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/ShopcareContent.json");
        if (!response.ok) throw new Error("Failed to load FAQ data");
        const data: ShopcareContent = await response.json();
        setFaqs(data.faq);
      } catch (err) {
        console.error(err);
        setError("Unable to load FAQs.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const faqsToShow = showAll ? faqs : faqs.slice(0, INITIAL_DISPLAY_COUNT);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (!element) return;
    const offset = 80;
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (loading) return <div className="text-center py-20">Loading…</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!faqs.length) return <div className="text-center py-20">No FAQs found.</div>;

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-300">
      {/* Heading */}
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-4xl font-extrabold text-black mb-2">Frequently Asked Questions</h2>
        <p className="text-lg text-black">Everything you need to know about Shopcare Billing Software</p>
      </motion.div>

      {/* FAQ + Animated ? */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
        {/* Animated ? */}
        <motion.div className="flex-1 flex justify-center lg:justify-start" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <motion.div
            className="relative flex items-center justify-center w-96 h-96 lg:w-[500px] lg:h-[500px] rounded-full bg-blue-50"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            {/* Gradient ? */}
            <motion.span
              className="font-extrabold text-[150px] lg:text-[200px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              ?
            </motion.span>

            {/* Glow Circle */}
            <motion.div
              className="absolute w-full h-full rounded-full border-8 border-transparent"
              style={{
                background: "conic-gradient(from 0deg, #2687bcff, #2563eb, #1d4ed8, #256fe6ff)",
                WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                maskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        </motion.div>

        {/* FAQ List */}
        <div className="flex-1 flex flex-col gap-4">
          {faqsToShow.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white border-l-4 border-blue-600 shadow-sm overflow-hidden hover:shadow-md transition">
                <motion.button
                  className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-blue-50 transition"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  animate={{ x: openIndex === index ? -10 : 0 }}
                  transition={{ type: "spring", stiffness: 150 }}
                >
                  <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                  <motion.span animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-6 h-6 text-blue-600" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="px-6 pb-5 pt-0 text-gray-700 bg-blue-50"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    >
                      <p className="text-base leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          {faqs.length > INITIAL_DISPLAY_COUNT && (
            <div className="mt-6 text-center">
              <button
                className="text-blue-600 font-semibold hover:text-blue-800 flex items-center justify-center space-x-2"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <span>Show More</span>
                    <ChevronDown className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact CTA */}
     {/* Contact CTA */}
<motion.div
  className="mt-16 text-center flex flex-col items-center gap-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <p className="text-lg text-blue font-medium">Still have questions? </p>
  <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
    <motion.button
      whileHover={{ scale: 1.05 }}
      className="h-11 px-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg shadow flex items-center gap-2"
    >
      Contact Us <ArrowRight className="w-5 h-5" />
    </motion.button>
  </a>
</motion.div>

    </section>
  );
}
