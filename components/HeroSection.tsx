 "use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/common/button";

export default function KiranaHero3D() {
  return (
    <section
      className="relative w-full pt-32 pb-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F5F5F7, #D8D8DD)", // Whitish grey gradient
      }}
    >
      {/* Soft Metallic Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C7C8CC] rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-6 mt-6 max-w-lg"
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A2A2A] leading-tight">
            K-Bazzar Billing Software
          </h2>

          <p className="text-lg text-[#4A4A4A] leading-relaxed">
            Solid solution to solve various problems in your grocery business –{" "}
            <strong className="text-[#1A1A1A] font-semibold">‘Kirana Bazaar’ software!</strong>
          </p>

          <p className="text-base text-[#555] leading-relaxed">
            Now your focus will be fully on customer service and business growth because this software handles everything smoothly.
          </p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
             

            {/* Demo Button */}
            <motion.a href="#demo" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="h-12 px-6 border-2 border-[#A8A8A8] text-[#2A2A2A] hover:bg-[#E5E5E5] rounded-xl text-base font-semibold flex items-center">
                <Play className="mr-2 w-4 h-4" />
                Watch Demo
              </Button>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D FLIP CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* FLIP CARD CONTAINER */}
            <div
              className="relative w-full h-[420px] rounded-3xl cursor-pointer"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative w-full h-full rounded-3xl"
                initial={{ rotateY: 0 }}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT SIDE */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
                  style={{
                    backfaceVisibility: "hidden",
                    background:
                      "linear-gradient(135deg, rgba(240,240,240,0.8), rgba(220,220,220,0.8))",
                  }}
                >
                  <img
                    src="https://soulsoft.in/wp-content/uploads/2025/04/Pending-stock-report-1536x1249.png"
                    className="w-full h-full object-cover rounded-3xl"
                    alt="Dashboard"
                  />
                </div>

                {/* BACK SIDE */}
                <div
  className="absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-center"
  style={{
    transform: "rotateY(180deg)",
    backfaceVisibility: "hidden",
    background: "linear-gradient(145deg, #f8f8f8, #e6e6e6)",
    border: "1px solid rgba(200,200,200,0.8)",
    boxShadow:
      "inset 0 0 20px rgba(255,255,255,0.5), inset 0 0 25px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.2)",
  }}
>

                  <h3 className="text-3xl font-extrabold mb-5 text-[#2A2A2A] text-center">
                    Kirana Bazaar Features
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    {[
                      { icon: "📊", label: "Smart GST Billing" },
                      { icon: "📦", label: "Inventory Management" },
                      { icon: "🔍", label: "Barcode / QR Support" },
                      { icon: "👥", label: "Customer Tracking" },
                      { icon: "⚡", label: "Fast Billing Interface", span: 2 },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className={`rounded-xl p-3 flex flex-col items-center justify-center shadow-md bg-white/40 hover:scale-105 transition-transform ${
                          feature.span ? "col-span-2" : ""
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-2xl">{feature.icon}</span>
                        <p className="mt-2 font-medium text-[#2A2A2A]">
                          {feature.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating metallic shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-10 bg-[#BFC0C2]/40 blur-3xl rounded-full" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
