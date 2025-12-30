
// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Star, Quote } from "lucide-react";
// import Card from "./common/Card";
// import mockData from "../lib/data/ShopcareContent.json";

// // Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// export default function CustomerReviews() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // Directly get testimonials from JSON
//   const testimonials = mockData.testimonials;

//   const scrollToSection = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     href: string
//   ) => {
//     e.preventDefault();

//     const element = document.querySelector(href);
//     if (element) {
//       const offset = 80;
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });

//       setMobileMenuOpen(false);
//     }
//   };

//   return (
//     <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl lg:text-5xl font-bold mb-3">
//             <span className="text-slate-900">What Our</span>
//             <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
//               &nbsp;Customers Say
//             </span>
//           </h2>

//           <p className="text-lg text-slate-600">
//             Real feedback from businesses using Shopcare.
//           </p>
//         </motion.div>

//         {/* Testimonials Swiper */}
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={30}
//           slidesPerView={1}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           breakpoints={{
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//         >
//           {testimonials.map((testimonial, index) => (
//             <SwiperSlide key={index} className="pb-10">
//               <Card gradient="from-blue-500 to-cyan-400" delay={index * 0.1}>
//                 <div className="flex flex-col h-[240px] relative">
//                   {/* Quote Icon */}
//                   <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center opacity-50">
//                     <Quote className="w-10 h-10 text-blue-600" />
//                   </div>

//                   {/* Stars */}
//                   <div className="flex items-center space-x-1 mb-3 mt-2">
//                     {[...Array(testimonial.rating || 5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className="w-5 h-5 text-yellow-400"
//                         fill="currentColor"
//                       />
//                     ))}
//                   </div>

//                   {/* Business Name */}
//                   <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 relative z-10">
//                     {testimonial.business_name}
//                   </h3>

//                   {/* Customer Info */}
//                   <div className="flex items-center space-x-4 pt-4 border-t border-slate-200 mt-auto">
//                     <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center shadow-lg flex-shrink-0">
//                       {testimonial.image_url ? (
//                         <img
//                           src={testimonial.image_url}
//                           alt={testimonial.customer_name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-white font-bold text-xl">
//                           {testimonial.customer_name[0]}
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-bold text-slate-900 truncate">
//                         {testimonial.customer_name}
//                       </p>
//                       <p className="text-sm text-slate-600 line-clamp-2">
//                         {testimonial.address}
//                       </p>
//                       <p className="text-sm text-blue-600 font-medium mt-1">
//                         {testimonial.contact_no}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-6 text-center"
//         >
//           <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-600 rounded-3xl p-7 relative overflow-hidden">
//             <div className="absolute inset-0 opacity-20">
//               <div
//                 className="absolute inset-0"
//                 style={{
//                   backgroundImage:
//                     "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
//                   backgroundSize: "40px 40px",
//                 }}
//               />
//             </div>

//             <div className="relative z-10">
//               <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">
//                 We can help you in Your Business!
//               </h3>
//               <p className="text-xl text-blue-100 mb-8">
//                 Join 1500+ satisfied customers and transform your business
//                 operations today
//               </p>
//               <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
//                 >
//                   Contact Us
//                 </motion.button>
//               </a>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Card from "./common/Card";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// TypeScript interfaces
interface Testimonial {
  business_name: string;
  customer_name: string;
  address: string;
  contact_no: string;
  image_url?: string;
  rating?: number;
}

interface ShopcareContent {
  testimonials: Testimonial[];
}

export default function CustomerReviews() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State management
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch testimonials data from public folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ShopcareContent.json');
        
        if (!response.ok) {
          throw new Error('Failed to load testimonials data');
        }
        
        const mockData: ShopcareContent = await response.json();
        setTestimonials(mockData.testimonials);
        setError(null);
      } catch (err) {
        console.error('Error loading testimonials data:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setMobileMenuOpen(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto">
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
  if (testimonials.length === 0) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-gray-600">No testimonials available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-slate-900">What Our</span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              &nbsp;Customers Say
            </span>
          </h2>

          <p className="text-lg text-slate-600">
            Real feedback from businesses using Shopcare.
          </p>
        </motion.div>

        {/* Testimonials Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="pb-10">
              <Card gradient="from-blue-500 to-cyan-400" delay={index * 0.1}>
                <div className="flex flex-col h-[240px] relative">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center opacity-50">
                    <Quote className="w-10 h-10 text-blue-600" />
                  </div>

                  {/* Stars */}
                  <div className="flex items-center space-x-1 mb-3 mt-2">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  {/* Business Name */}
                  <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 relative z-10">
                    {testimonial.business_name}
                  </h3>

                  {/* Customer Info */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-200 mt-auto">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center shadow-lg flex-shrink-0">
                      {testimonial.image_url ? (
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.customer_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-xl">
                          {testimonial.customer_name[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 truncate">
                        {testimonial.customer_name}
                      </p>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {testimonial.address}
                      </p>
                      <p className="text-sm text-blue-600 font-medium mt-1">
                        {testimonial.contact_no}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-600 rounded-3xl p-7 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">
                We can help you in Your Business!
              </h3>
              <p className="text-xl text-blue-100 mb-8">
                Join 1500+ satisfied customers and transform your business
                operations today
              </p>
              <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
                >
                  Contact Us
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}