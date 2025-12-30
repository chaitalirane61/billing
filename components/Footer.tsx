



// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   ShoppingCart,
//   Mail,
//   Phone,
//   MapPin,
//   Facebook,
//   Instagram,
//   Linkedin,
//   Youtube,
//   Clock,
//   Home,
//   ChevronRight,
//   Loader2,
// } from "lucide-react";
// import Image from "next/image";
// import shopcare_logo from "@/public/images/shopcare_logo.jpg";
// import { Input } from "@/components/common/input";
// import { Button } from "@/components/common/button";
// import { useSubscribeMutation } from "@/hooks/useSubscribe";

// // Import contact data
// import contactData from "../lib/data/contact.json";

// export default function Footer() {
//   const [email, setEmail] = useState("");
//   const [contactInfo, setContactInfo] = useState<any[]>([]);

//   const subscribe = useSubscribeMutation();

//   // Load contact data
//   useEffect(() => {
//     setContactInfo(contactData.contactInfo);
//   }, []);

//   // Get specific contact info by title
//   const getContactInfo = (title: string) => {
//     return contactInfo.find((item) => item.title === title);
//   };

//   const phoneInfo = getContactInfo("Phone");
//   const emailInfo = getContactInfo("Email");
//   const officeInfo = getContactInfo("Office");

//   const socialLinks = [
//     {
//       icon: Facebook,
//       href: "https://www.facebook.com/soulagronexus/",
//       color: "hover:text-blue-500",
//     },
//     {
//       icon: Instagram,
//       href: "https://www.instagram.com/soulsoft.infotech/",
//       color: "hover:text-pink-500",
//     },
//     {
//       icon: Linkedin,
//       href: "https://www.linkedin.com/company/soulsoftinfotech/posts/?feedView=all",
//       color: "hover:text-blue-600",
//     },
//     {
//       icon: Youtube,
//       href: "https://soulsoft.in/",
//       color: "hover:text-red-500",
//     },
//   ];

//   const companyLinks = ["Home", "About Us", "POS Products", "Services", "Contact"];

//   const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     subscribe.mutate(
//       { email },
//       {
//         onSuccess: (data) => {
//           alert(data.message || "Subscription successful!");
//           setEmail("");
//         },
//         onError: (error: any) => {
//           alert(error.message || "Subscription failed!");
//         },
//       }
//     );
//   };

//   return (
//     <footer className="bg-slate-900 text-white pt-20 pb-10 relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0 opacity-5">
//         <motion.div
//           animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
//           transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
//           className="absolute inset-0"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
//             backgroundSize: "50px 50px",
//           }}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
//           {/* Column 1 - Logo & Social */}
//           <div className="text-center sm:text-left">
//             <div className="mb-6 flex justify-center sm:justify-start">
//               <img
//                 src="https://soulsoft.in/wp-content/uploads/2022/01/logo.png"
//                 alt="SoulSoft Infotech Logo"
//                 className="w-40 sm:w-48 h-auto"
//               />
//             </div>
//             <p className="text-slate-400 leading-relaxed mb-6 max-w-md mx-auto sm:mx-0 text-sm sm:text-base">
//               SoulSoft Infotech aspire to be the global sourcing choice and revolutionize the world market.
//             </p>
//             <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
//               {socialLinks.map((social, i) => (
//                 <motion.a
//                   key={i}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{ scale: 1.1, y: -2 }}
//                   className={`w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-lg flex items-center justify-center ${social.color} transition-colors`}
//                 >
//                   <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//           {/* Column 2 - Get In Touch (Dynamic) */}
//           <div>
//             <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//               Get In Touch
//             </h3>

//             {/* Office Locations */}
            
//             {/* {officeInfo && officeInfo.details1 && (
//               <div className="mb-6">
//                 <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
//                   <MapPin className="w-4 h-4 text-blue-400" />
//                   <span className="text-sm sm:text-base">Office Locations</span>
//                 </h4>
//                 <div className="space-y-3">
//                   {Array.isArray(officeInfo.details1) ? (
//                     officeInfo.details1.map((location: string, index: number) => (
//                       <p key={index} className="text-slate-400 text-xs sm:text-sm pl-6 leading-relaxed">
//                         <span className="text-blue-400 font-semibold block sm:inline">
//                           {index === 0 ? "Main Office:" : index === 1 ? "Pune Branch:" : "Nashik Branch:"}
//                         </span>
//                         {" "}
//                         {location}
//                       </p>
//                     ))
//                   ) : (
//                     <p className="text-slate-400 pl-6 text-xs sm:text-sm">{officeInfo.details1}</p>
//                   )}
//                 </div>
//               </div>
//             )} */}

//             {/* Contact Info */}
//             <div>
//               <h4 className="font-semibold text-white mb-3 text-sm sm:text-base">Contact</h4>
//               <ul className="space-y-3 text-slate-400">
//                 {phoneInfo && (
//                   <li className="flex items-start space-x-2">
//                     <Phone className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
//                     <div className="text-xs sm:text-sm">
//                       <p className="break-words">{phoneInfo.details1}</p>
//                       {phoneInfo.details2 && (
//                         <p className="text-xs text-slate-500 mt-1">{phoneInfo.details2}</p>
//                       )}
//                     </div>
//                   </li>
//                 )}
//                 {emailInfo && (
//                   <li className="flex items-start space-x-2">
//                     <Mail className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
//                     <div className="text-xs sm:text-sm">
//                       <p className="break-all">{emailInfo.details1}</p>
//                       {emailInfo.details2 && (
//                         <p className="text-xs text-slate-500 mt-1">{emailInfo.details2}</p>
//                       )}
//                     </div>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>

//           {/* Column 3 - Company & Business Hours */}
//           <div>
//             <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//               Company
//             </h3>

//             <ul className="space-y-3 mb-8 sm:mb-10">
//               {companyLinks.map((link, i) => (
//                 <li key={i}>
//                   <a
//                     href={`/${link.toLowerCase().replace(/\s/g, "-")}`}
//                     className="text-slate-400 hover:text-white transition-colors inline-flex items-center group text-sm sm:text-base"
//                   >
//                     <span className="group-hover:translate-x-2 transition-transform duration-300">
//                       {link}
//                     </span>
//                   </a>
//                 </li>
//               ))}
//             </ul>

//             <h3 className="text-base sm:text-lg font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//               Business Hours
//             </h3>
//             <div className="space-y-2 text-slate-400 text-xs sm:text-sm">
//               <div className="flex justify-between items-center gap-2">
//                 <span className="flex items-center space-x-2 flex-shrink-0">
//                   <Clock className="w-4 h-4 text-blue-400" />
//                   <span>Mon – Sat:</span>
//                 </span>
//                 <span className="font-semibold text-white">8 am to 8 pm</span>
//               </div>
//               <div className="flex justify-between items-center gap-2">
//                 <span className="flex items-center space-x-2 flex-shrink-0">
//                   <Home className="w-4 h-4 text-blue-400" />
//                   <span>Sunday:</span>
//                 </span>
//                 <span className="font-semibold text-red-400">Closed</span>
//               </div>
//             </div>
//           </div>

//           {/* Column 4 - Newsletter */}
//           <div>
//             <h3 className="text-base sm:text-lg font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//               Join Our Mailing List
//             </h3>

//             <p className="text-xs sm:text-sm text-blue-200 mb-4">
//               Receive our latest news & updates directly in your inbox.
//             </p>

//             <form onSubmit={handleNewsletterSubmit} className="space-y-4">
//               <Input
//                 type="email"
//                 placeholder="Enter your email address"
//                 value={email}
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full h-11 sm:h-12 px-4 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 rounded-lg focus:bg-slate-700 text-sm sm:text-base"
//               />

//               <Button
//                 type="submit"
//                 disabled={subscribe.isPending}
//                 className="w-full h-11 sm:h-12 px-6 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold shadow-md flex items-center justify-center transition-colors text-sm sm:text-base"
//               >
//                 {subscribe.isPending ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <>
//                     Subscribe
//                     <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
//                   </>
//                 )}
//               </Button>
//             </form>
//           </div>
//         </div>

//         {/* Footer Copy */}
//         <div className="border-t border-slate-800 pt-6 sm:pt-8">
//           <p className="text-slate-400 text-xs sm:text-sm text-center px-4">
//             ©2023 Soulsoft Infotech Pvt Ltd. All Rights Reserved.
//           </p>
//         </div>
//       </div>

//       {/* WhatsApp Button - Responsive positioning */}
//       {/* <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
//         <a
//           href="https://wa.me/917798798679"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-colors hover:scale-110 duration-300"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="text-white w-6 h-6 sm:w-7 sm:h-7"
//           >
//             <path d="M12 2a10 10 0 0 0-8.9 14.8l-1.1 4.2 4.4-1.2A10 10 0 1 0 12 2z" />
//             <path d="M16.5 13.5c-.3-.2-.5-.3-.7-.5-.2-.2-.4-.3-.7-.3s-.6.1-.8.3c-.2.2-.4.4-.6.6-.2.2-.4.4-.6.6s-.4.3-.7.3-.6-.1-1-.4-1.6-1.1-2.4-2.2c-.8-1.2-1.3-2.5-1.5-3.8-.1-.6 0-1.1.3-1.4.2-.2.4-.3.7-.4s.6-.1.8-.1.5.1.7.3c.2.2.4.4.6.6.2.2.4.4.6.6s.4.4.7.4.5-.1.7-.3.4-.4.6-.6.4-.4.6-.6.4-.3.7-.3c.3 0 .6 0 .9.2.3.2.5.4.7.7.2.3.3.6.3.9 0 .4 0 .7-.2 1s-.5.6-1.1 1.2z" />
//           </svg>
//         </a>
//       </div> */}
//       <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
//     <a
//     href="https://wa.me/81497 98679"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-colors hover:scale-110 duration-300"
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="white"
//       className="w-7 h-7 sm:w-8 sm:h-8"
//     >
//       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
//     </svg>
//   </a>
// </div>
//     </footer>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Clock,
  Home,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import { useSubscribeMutation } from "@/hooks/useSubscribe";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [contactInfo, setContactInfo] = useState<any[]>([]);

  const subscribe = useSubscribeMutation();

  // ✅ Fetch contact data from public folder
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch("/contact.json");
        if (!response.ok) throw new Error("Failed to load contact data");

        const data = await response.json();
        setContactInfo(data.contactInfo || []);
      } catch (err) {
        console.error("Error loading contact data:", err);
      }
    };

    fetchContactData();
  }, []);

  // Get specific contact info by title
  const getContactInfo = (title: string) => {
    return contactInfo.find((item) => item.title === title);
  };

  const phoneInfo = getContactInfo("Phone");
  const emailInfo = getContactInfo("Email");
  const officeInfo = getContactInfo("Office");

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/soulagronexus/",
      color: "hover:text-blue-500",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/soulsoft.infotech/",
      color: "hover:text-pink-500",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/soulsoftinfotech/posts/?feedView=all",
      color: "hover:text-blue-600",
    },
    {
      icon: Youtube,
      href: "https://soulsoft.in/",
      color: "hover:text-red-500",
    },
  ];

  const companyLinks = ["Home", "About Us", "POS Products", "Services", "Contact"];

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    subscribe.mutate(
      { email },
      {
        onSuccess: (data) => {
          alert(data.message || "Subscription successful!");
          setEmail("");
        },
        onError: (error: any) => {
          alert(error.message || "Subscription failed!");
        },
      }
    );
  };

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Column 1 - Logo & Social */}
          <div className="text-center sm:text-left">
            <div className="mb-6 flex justify-center sm:justify-start">
              <img
                src="https://soulsoft.in/wp-content/uploads/2022/01/logo.png"
                alt="SoulSoft Infotech Logo"
                className="w-40 sm:w-48 h-auto"
              />
            </div>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-md mx-auto sm:mx-0 text-sm sm:text-base">
              SoulSoft Infotech aspire to be the global sourcing choice and revolutionize the world market.
            </p>
            <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-lg flex items-center justify-center ${social.color} transition-colors`}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2 - Get In Touch (Dynamic) */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </h3>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm sm:text-base">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                {phoneInfo && (
                  <li className="flex items-start space-x-2">
                    <Phone className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <div className="text-xs sm:text-sm">
                      <p className="break-words">{phoneInfo.details1}</p>
                      {phoneInfo.details2 && (
                        <p className="text-xs text-slate-500 mt-1">{phoneInfo.details2}</p>
                      )}
                    </div>
                  </li>
                )}
                {emailInfo && (
                  <li className="flex items-start space-x-2">
                    <Mail className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <div className="text-xs sm:text-sm">
                      <p className="break-all">{emailInfo.details1}</p>
                      {emailInfo.details2 && (
                        <p className="text-xs text-slate-500 mt-1">{emailInfo.details2}</p>
                      )}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Column 3 - Company & Business Hours */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Company
            </h3>

            <ul className="space-y-3 mb-8 sm:mb-10">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={`/${link.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center group text-sm sm:text-base"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-base sm:text-lg font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Business Hours
            </h3>
            <div className="space-y-2 text-slate-400 text-xs sm:text-sm">
              <div className="flex justify-between items-center gap-2">
                <span className="flex items-center space-x-2 flex-shrink-0">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Mon – Sat:</span>
                </span>
                <span className="font-semibold text-white">8 am to 8 pm</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="flex items-center space-x-2 flex-shrink-0">
                  <Home className="w-4 h-4 text-blue-400" />
                  <span>Sunday:</span>
                </span>
                <span className="font-semibold text-red-400">Closed</span>
              </div>
            </div>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Join Our Mailing List
            </h3>

            <p className="text-xs sm:text-sm text-blue-200 mb-4">
              Receive our latest news & updates directly in your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 sm:h-12 px-4 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 rounded-lg focus:bg-slate-700 text-sm sm:text-base"
              />

              <Button
                type="submit"
                disabled={subscribe.isPending}
                className="w-full h-11 sm:h-12 px-6 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold shadow-md flex items-center justify-center transition-colors text-sm sm:text-base"
              >
                {subscribe.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Copy */}
        <div className="border-t border-slate-800 pt-6 sm:pt-8">
          <p className="text-slate-400 text-xs sm:text-sm text-center px-4">
            ©2023 Soulsoft Infotech Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <a
          href="https://wa.me/917798798679"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-colors hover:scale-110 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-7 h-7 sm:w-8 sm:h-8"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
