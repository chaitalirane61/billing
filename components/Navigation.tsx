"use client";
import { PhoneCall } from "lucide-react";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/common/button";
import Image from "next/image";
import soulsoft_logo from "@/public/images/soulsoft_logo.png";

interface NavLink {
  name: string;
  href: string;
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navLinks: NavLink[] = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Demo", href: "#demo" },
    { name: "FAQ", href: "#faq" },
  ];

  // Smooth scroll
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const top =
        element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ backgroundColor: "rgba(30,58,138,0.35)" }} // blue-800 tint
      animate={{
        backgroundColor: scrolled
          ? "rgba(30,58,138,0.65)" // darker blue on scroll
          : "rgba(30,58,138,0.35)", // lighter blue
      }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 backdrop-blur-xl shadow-md z-50 border-b border-blue-400/30"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center cursor-pointer"
          >
            <Image
              src={soulsoft_logo}
              alt="Soulsoft Logo"
              width={100}
              height={60}
              className="object-contain"
              priority
            />
          </motion.div>

         {/* Desktop Menu */}
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  className="hidden lg:flex items-center space-x-8"
>
  {navLinks.map((link, index) => (
    <a
      key={index}
      href={link.href}
      onClick={(e) => scrollToSection(e, link.href)}
      className={`
        relative inline-block font-medium group 
        transition-colors duration-300
        ${scrolled ? "text-white" : "text-black"}
      `}
    >
      <span className="inline-block transition-all duration-300 group-hover:font-semibold group-hover:-translate-y-1">
        {link.name}
      </span>

      {/* underline also adapts to color */}
      <span
        className={`
          absolute left-0 -bottom-1 h-[2px] w-0 
          transition-all duration-300 
          ${scrolled ? "bg-blue-200" : "bg-gray-800"}
          group-hover:w-full
        `}
      />
    </a>
  ))}
</motion.div>


          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block"
          >
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
              <motion.button
                initial={{ width: 120 }}
                whileHover={{ width: 160 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="flex items-center justify-center overflow-hidden
                  bg-gradient-to-r from-blue-600 to-cyan-500
                  hover:from-blue-500 hover:to-cyan-400
                  text-white rounded-xl px-3 py-3 shadow-lg shadow-blue-500/40
                  hover:shadow-xl hover:shadow-cyan-300/50 transition-all"
              >
                <span className="whitespace-nowrap text-sm font-medium">
                  Contact Us
                </span>

                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 5 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2 flex items-center"
                >
                  <PhoneCall className="w-5 h-5 text-white" />
                </motion.span>
              </motion.button>
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-700/40 transition-colors text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="lg:hidden pt-4 pb-2 space-y-2"
          >
            {navLinks.map((link, index) => (
              <a
  key={index}
  href={link.href}
  onClick={(e) => scrollToSection(e, link.href)}
  className={`
    block px-4 py-2 rounded-lg transition-colors cursor-pointer
    ${scrolled ? "text-white hover:bg-blue-700/40" : "text-black hover:bg-blue-100"}
  `}
>
  {link.name}
</a>

            ))}

            {/* Mobile Contact Button */}
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center 
                  bg-gradient-to-r from-blue-600 to-cyan-500 
                  hover:from-blue-500 hover:to-cyan-400
                  text-white rounded-xl px-5 py-3 shadow-lg shadow-blue-400/30
                  hover:shadow-xl hover:shadow-blue-300/40 transition-all gap-2 text-base font-medium"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
