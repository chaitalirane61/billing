

// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react";
// import faqData from "../lib/data/ShopcareContent.json"; // ✅ Import JSON directly
// import { FAQItem } from "@/app/types/faq";

// export default function FAQ() {
//   const [faqs, setFaqs] = useState<FAQItem[]>([]);
//   const [openIndex, setOpenIndex] = useState<number>(-1);
//   const [showAll, setShowAll] = useState<boolean>(false);

//   const INITIAL_DISPLAY_COUNT = 3;

//   useEffect(() => {
//     setFaqs(faqData.faq); // ✅ Load data from JSON
//   }, []);

//   const faqsToShow = showAll ? faqs : faqs.slice(0, INITIAL_DISPLAY_COUNT);

//   // Smooth scroll function
//   const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     e.preventDefault();
//     const element = document.querySelector(href);
//     if (element) {
//       const offset = 80;
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;
//       window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="py-4 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
//       </div>

//       <div className="max-w-5xl mx-auto relative z-10">
//         {/* Header */}
//         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
//           <div className="inline-flex items-center justify-center px-2 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 rounded-full mb-4">
//             <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />
//             <span className="text-blue-600 font-semibold">Got Questions?</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold mb-3">
//             <span className="text-slate-900">Frequently Asked </span>
//             <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Questions</span>
//           </h2>
//           <p className="text-lg text-slate-600">Find answers to common questions about Shopcare Billing Software</p>
//         </motion.div>

//         {/* FAQ Items */}
//         <div className="space-y-4">
//           {faqsToShow.map((faq, index) => (
//             <motion.div key={index} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
//               <div className="relative bg-white rounded-2xl shadow-md border transition-all duration-300 overflow-hidden hover:shadow-lg">
//                 {/* Question */}
//                 <button onClick={() => setOpenIndex(openIndex === index ? -1 : index)} className="w-full px-6 py-5 flex items-center justify-between text-left">
//                   <div className="flex items-center space-x-4">
//                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${openIndex === index ? "bg-gradient-to-br from-blue-500 to-cyan-500" : "bg-gradient-to-br from-slate-100 to-slate-200"}`}>
//                       <MessageCircle className={`w-5 h-5 transition-colors ${openIndex === index ? "text-white" : "text-slate-500"}`} />
//                     </div>
//                     <h3 className={`text-lg font-semibold transition-colors ${openIndex === index ? "text-blue-600" : "text-slate-800"}`}>{faq.question}</h3>
//                   </div>

//                   <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? "bg-gradient-to-br from-blue-500 to-cyan-500" : "bg-slate-100"}`}>
//                     <ChevronDown className={`w-5 h-5 ${openIndex === index ? "text-white" : "text-slate-500"}`} />
//                   </motion.div>
//                 </button>

//                 {/* Answer */}
//                 <AnimatePresence>
//                   {openIndex === index && (
//                     <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
//                       <div className="px-6 pb-5 pt-0">
//                         <div className="pl-14 border-l-2 border-l-blue-400 ml-5">
//                           <p className="text-slate-600 leading-relaxed pl-4">{faq.answer}</p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Show More / Show Less */}
//         {faqs.length > INITIAL_DISPLAY_COUNT && (
//           <div className="flex justify-center mt-6 cursor-pointer" onClick={() => setShowAll(!showAll)}>
//             {showAll ? (
//               <span className="flex items-center space-x-2 text-blue-600 font-semibold">
//                 <span>Show Less</span>
//                 <ChevronUp className="w-6 h-6 text-blue-600 transition-colors" />
//               </span>
//             ) : (
//               <span className="flex items-center space-x-2 text-blue-600 font-semibold">
//                 <span>Show More</span>
//                 <ChevronDown className="w-6 h-6 text-blue-600 transition-colors" />
//               </span>
//             )}
//           </div>
//         )}

//         {/* Contact CTA */}
//         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-5 text-center">
//           <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
//             <p className="text-slate-700 font-medium">Still have questions?</p>
//             <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
//               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
//                 Contact Support
//               </motion.button>
//             </a>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react";
import { FAQItem } from "@/app/types/faq";

// TypeScript interface
interface ShopcareContent {
  faq: FAQItem[];
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const INITIAL_DISPLAY_COUNT = 3;

  // ✅ Fetch FAQ data from public folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ShopcareContent.json');
        
        if (!response.ok) {
          throw new Error('Failed to load FAQ data');
        }
        
        const faqData: ShopcareContent = await response.json();
        setFaqs(faqData.faq);
        setError(null);
      } catch (err) {
        console.error('Error loading FAQ data:', err);
        setError('Failed to load FAQs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const faqsToShow = showAll ? faqs : faqs.slice(0, INITIAL_DISPLAY_COUNT);

  // Smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-4 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading FAQs...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-4 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (faqs.length === 0) {
    return (
      <section className="py-4 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-gray-600">No FAQs available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-2 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-600 font-semibold">Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-slate-900">Frequently Asked </span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-lg text-slate-600">Find answers to common questions about Shopcare Billing Software</p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqsToShow.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <div className="relative bg-white rounded-2xl shadow-md border transition-all duration-300 overflow-hidden hover:shadow-lg">
                {/* Question */}
                <button onClick={() => setOpenIndex(openIndex === index ? -1 : index)} className="w-full px-6 py-5 flex items-center justify-between text-left">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${openIndex === index ? "bg-gradient-to-br from-blue-500 to-cyan-500" : "bg-gradient-to-br from-slate-100 to-slate-200"}`}>
                      <MessageCircle className={`w-5 h-5 transition-colors ${openIndex === index ? "text-white" : "text-slate-500"}`} />
                    </div>
                    <h3 className={`text-lg font-semibold transition-colors ${openIndex === index ? "text-blue-600" : "text-slate-800"}`}>{faq.question}</h3>
                  </div>

                  <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? "bg-gradient-to-br from-blue-500 to-cyan-500" : "bg-slate-100"}`}>
                    <ChevronDown className={`w-5 h-5 ${openIndex === index ? "text-white" : "text-slate-500"}`} />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-6 pb-5 pt-0">
                        <div className="pl-14 border-l-2 border-l-blue-400 ml-5">
                          <p className="text-slate-600 leading-relaxed pl-4">{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More / Show Less */}
        {faqs.length > INITIAL_DISPLAY_COUNT && (
          <div className="flex justify-center mt-6 cursor-pointer" onClick={() => setShowAll(!showAll)}>
            {showAll ? (
              <span className="flex items-center space-x-2 text-blue-600 font-semibold">
                <span>Show Less</span>
                <ChevronUp className="w-6 h-6 text-blue-600 transition-colors" />
              </span>
            ) : (
              <span className="flex items-center space-x-2 text-blue-600 font-semibold">
                <span>Show More</span>
                <ChevronDown className="w-6 h-6 text-blue-600 transition-colors" />
              </span>
            )}
          </div>
        )}

        {/* Contact CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-5 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-slate-700 font-medium">Still have questions?</p>
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
                Contact Support
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}