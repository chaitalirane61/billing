"use client";
import { PhoneCall } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import soulsoft_logo from "@/public/images/soulsoft_logo.png";

interface NavLink {
  name: string;
  href: string;
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [mouseX, setMouseX] = useState(0);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track mouse for 3D tilt + reflection glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // 3D Tilt
    const rotateX = ((y - rect.height / 2) / rect.height) * -10;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;

    setTilt({ rotateX, rotateY });

    // Dynamic reflection
    setMouseX((x / rect.width) * 100);
  };

  const navLinks: NavLink[] = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Demo", href: "#demo" },
    { name: "FAQ", href: "#faq" },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top =
        el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
      setMobileMenuOpen(false); // Close mobile menu
    }
  };

  return (
    <motion.nav
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      style={{ transformStyle: "preserve-3d" }}
      className="
        fixed top-0 left-0 right-0 z-50
        border-b border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
      "
    >
      {/* Aurora Glow Background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute inset-0 -z-20
          bg-gradient-to-r from-blue-500/40 via-cyan-300/40 to-purple-400/40
          bg-[length:200%_200%]
          blur-2xl
        "
      />

      {/* Moving Linear Light Sweep */}
      <motion.div
        initial={{ x: "-20%" }}
        animate={{ x: "120%" }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute top-0 h-full w-[15%]
          bg-gradient-to-r from-white/10 via-white/50 to-white/10
          opacity-40
          blur-xl
          -z-10
        "
      />

      {/* Mouse-Driven Reflection Line */}
      <motion.div
        animate={{
          left: `${mouseX}%`,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="
          absolute top-0 h-full w-[90px]
          bg-white/10 blur-xl opacity-40
          pointer-events-none -z-10
        "
      />

      {/* Top Glass Highlight */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40 opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.07 }}
            className="cursor-pointer"
          >
            <Image
              src={soulsoft_logo}
              alt="Soulsoft Logo"
              width={100}
              height={60}
              className="object-contain"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`
                  font-medium relative group transition-all duration-300
                  text-black
                `}
              >
                {link.name}
                <span className="
                  absolute left-0 -bottom-1 h-[2px] w-0
                  transition-all duration-300 group-hover:w-full
                  bg-black
                " />
              </a>
            ))}
          </div>

          {/* Desktop Contact Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block"
          >
            <motion.button
              onClick={() => {
                const section = document.getElementById("contact-us");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                bg-gradient-to-r from-blue-600 to-cyan-500
                text-white px-5 py-3 rounded-xl
                shadow-lg shadow-blue-500/40
                transition-all
                flex items-center gap-2
              "
            >
              Contact Us
              <PhoneCall className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-black p-2"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
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
                className="block text-black px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Contact Button */}
            <motion.button
              onClick={() => {
                const section = document.getElementById("contact-us");
                section?.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="
                bg-gradient-to-r from-blue-600 to-cyan-500
                text-white w-full py-3 rounded-xl mt-2
                flex items-center justify-center gap-2
              "
            >
              Contact Us
              <PhoneCall className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
