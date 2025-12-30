import React from "react";

import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import AmazingFeatures from "../components/AmazingFeatures";
import HowItWorks from "../components/HowItWorks";
import SpecialFeatures from "../components/SpecialFeatures";
import ImportantBenefits from "../components/ImportantBenefits";
import ProductDemo from "../components/ProductDemo";
// import AppScreenshots from "../components/AppScreenshots";
import CustomerReviews from "../components/CustomerReviews";
// import Newsletter from "../components/Newsletter";
import { ContactForm } from "@/components/ContactForm";
import Footer from "../components/Footer";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <div id="home">
        <HeroSection />
      </div>

<div id="features">
  <SpecialFeatures />
      </div>
      
       <div id="how-it-works">
        <HowItWorks />
      </div>

       

      
       

      <div id="benefits">
        <ImportantBenefits />
      </div>

      <div id="demo">
        <ProductDemo />
      </div>

      {/* <div id="app"><AppScreenshots /></div> */}

      <div id="reviews">
        <CustomerReviews />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="contact">
        <ContactForm />
      </div>

      {/* Client-side newsletter */}
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}

