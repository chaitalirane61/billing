"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Card from "./common/Card";
import Image from "next/image";

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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch testimonials JSON from public folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/ShopcareContent.json");
        if (!response.ok) throw new Error("Failed to load testimonials data");

        const data: ShopcareContent = await response.json();
        setTestimonials(data.testimonials);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // header offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
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
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <p className="text-gray-600">No testimonials available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
          <p className="text-lg text-slate-600">Real feedback from businesses using Shopcare.</p>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={t.customer_name + i} className="pb-10">
              <Card gradient="from-blue-500 to-cyan-400" delay={i * 0.1}>
                <div className="flex flex-col h-[240px] relative">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center opacity-50">
                    <Quote className="w-10 h-10 text-blue-600" />
                  </div>

                  <div className="flex items-center space-x-1 mb-3 mt-2">
                    {[...Array(t.rating || 5)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 relative z-10">
                    {t.business_name}
                  </h3>

                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-200 mt-auto">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center shadow-lg flex-shrink-0">
                      {t.image_url ? (
                        <Image
                          src={t.image_url}
                          alt={t.customer_name}
                          width={56}
                          height={56}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-white font-bold text-xl">{t.customer_name[0]}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 truncate">{t.customer_name}</p>
                      <p className="text-sm text-slate-600 line-clamp-2">{t.address}</p>
                      <p className="text-sm text-blue-600 font-medium mt-1">{t.contact_no}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
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
                  backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">
                We can help you in Your Business!
              </h3>
              <p className="text-xl text-blue-100 mb-8">
                Join 1500+ satisfied customers and transform your business operations today
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
