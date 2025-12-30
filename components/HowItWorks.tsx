"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Package, ShoppingBag } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

const features: Feature[] = [
  {
    id: "1",
    title: "Customer Point System with Redeem Facilities",
    description:
      "Enables a customer points system with redeemable rewards for enhanced loyalty and engagement",
    icon: "FileText",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  {
    id: "2",
    title: "GST & Non-GST Purchase and Sales on Single Interfaces",
    description:
      "Supports both GST and non-GST purchase and sales transactions within a single interface",
    icon: "Package",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    id: "3",
    title: "Single Interface for Outstanding (Supplier and Customer)",
    description:
      "Consolidates outstanding balances for both suppliers and customers into a single interface",
    icon: "ShoppingBag",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
  },
];

const iconMap = {
  FileText: FileText,
  Package: Package,
  ShoppingBag: ShoppingBag,
};

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-100 via-gray-200 to-blue-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-gray-700 via-blue-600 to-blue-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Simple and efficient workflow that powers your business
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-16 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || FileText;

            return (
              <motion.div
                key={feature.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center text-center group hover:shadow-2xl border border-gray-300 hover:border-blue-400"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-4 text-white shadow-xl group-hover:shadow-blue-300 transition-all">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6">{feature.description}</p>

                {/* Image */}
                <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
