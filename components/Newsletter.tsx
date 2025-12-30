"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ChevronRight, Loader2 } from "lucide-react";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";

export default function Newsletter() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Thank you for subscribing to our mailing list!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Mailing List
          </h2>

          <p className="text-xl text-blue-100 mb-8">
            For receiving our news and updates in your inbox directly
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 px-6 bg-white/10 border-white/30 text-white placeholder:text-blue-200 rounded-xl backdrop-blur-sm focus:bg-white/20"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Subscribe
                  <ChevronRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
