

// // ----------------------------
// // IMPORT TYPES
// // ----------------------------
// import { Feature } from "@/app/types/features";
// import { Testimonial } from "@/app/types/testimonials";
// import { ContactData } from "@/app/types/contactdata";
// import { FAQItem } from "@/app/types/faq";
// import { Phone, Mail, Clock, MapPin } from "lucide-react";

// // ----------------------------
// // MOCK FAQ DATA
// // ----------------------------
// export const MOCK_FAQS: FAQItem[] = [
//   {
//     question: "What is Shopcare Billing Software?",
//     answer:
//       "Shopcare is a comprehensive POS (Point of Sale) billing software designed for retail businesses. It offers GST-compliant billing, inventory management, barcode support, and detailed business reports - all in one easy-to-use platform.",
//   },
//   {
//     question: "Is Shopcare GST compliant?",
//     answer:
//       "Yes, Shopcare is 100% GST compliant. It automatically calculates GST for all transactions, generates GST-ready invoices, and provides reports that help you file your GST returns easily.",
//   },
//   {
//     question: "Can I use Shopcare on multiple devices?",
//     answer:
//       "Absolutely! Shopcare supports multi-device usage. You can access your business data from desktop computers, laptops, and even mobile devices, keeping your business connected at all times.",
//   },
//   {
//     question: "Do you provide customer support?",
//     answer:
//       "Yes, we provide 24/7 customer support. Our dedicated team is always ready to assist you with any queries, technical issues, or training needs. We also offer video tutorials and documentation.",
//   },
//   {
//     question: "How secure is my business data?",
//     answer:
//       "Your data security is our top priority. Shopcare uses advanced encryption, regular backups, and secure cloud storage to ensure your business data is always protected and accessible.",
//   },
//   {
//     question: "Can I try Shopcare before purchasing?",
//     answer:
//       "Yes! We offer a free demo so you can explore all features before making a decision. Contact our sales team to schedule a personalized demo for your business.",
//   },
// ];

// // CONTACT US DATA
// export const MOCK_CONTACT: ContactData[] = [
//   {
//     Id: 1,
//     Title: "Phone",
//     Icon: Phone,
//     Details1: "+91 7798798679",
//     Details2: "Mon–Fri 9AM–6PM",
//   },
//   {
//     Id: 2,
//     Title: "Email",
//     Icon: Mail,
//     Details1: "soulsoftinfotech@gmail.com",
//     Details2: "We respond within 2 hours",
//   },
//   {
//     Id: 3,
//     Title: "Support Hours",
//     Icon: Clock,
//     Details1: "24/7 Online Support",
//     Details2: "Mon–Fri 9AM–6PM",
//   },
//   {
//     Id: 4,
//     Title: "Office",
//     Icon: MapPin,
//     Details1: JSON.stringify([
//       "S 10-B, 2nd Floor, Top-Ten Imperial, Sangamner, 422605, A.Nagar",
//       "1003, A4, Aishwaryam Hamara, Dehu Alandi Road, Moshi Pune, 411062",
//       "Satpur, Behind Jogging Track, Near D-Mart & Reliance Petrol Pump, Nashik, 422007",
//     ]),
//     Details2: "",
//   },
// ];

// // ----------------------------
// // MOCK FEATURES
// // ----------------------------
// export const MOCK_FEATURES: Feature[] = [
//   {
//     title: "Outstanding View of all Customers & Supplier in single interface",
//     description:
//       "The software provides a unified interface to view all outstanding balances for customers & suppliers, making it easy to manage receivables and payables efficiently.",
//     category: "special",
//     icon: "Users",
//     order: 1,
//   },
//   {
//     title: "Smart Customer Engagement",
//     description: "Automated customer engagement with personalized SMS & Email.",
//     category: "special",
//     icon: "Mail",
//     order: 2,
//   },
//   {
//     title: "Stock Statement with Valuation & Supplier-wise Stock Statement",
//     description:
//       "Offers detailed stock statements with valuation & supplier-wise breakdowns, allowing businesses to monitor inventory levels & assess stock value effectively.",
//     category: "special",
//     icon: "Users",
//     order: 3,
//   },
//   {
//     title: "POS (Point of sales system with Inventory & Barcode)",
//     description:
//       "Complete POS with Inventory & Barcode management for retail operations.",
//     category: "main",
//     icon: "ShoppingCart",
//     order: 1,
//   },
//   {
//     title: "Quotation, Purchase, Sales, Delivery Challan",
//     description: "Easy-to-use interfaces for all business operations.",
//     category: "main",
//     icon: "FileText",
//     order: 2,
//   },
//   {
//     title: "Very easy purchase, sale & return facility",
//     description: "Simplified purchase, sale, and return handling.",
//     category: "benefit",
//     icon: "RefreshCw",
//   },
//   {
//     title: "Quotation - GST, Non-GST Formats",
//     description:
//       "Allows businesses to generate quotations with formats for GST and Non-GST transactions.",
//     icon: "FileText",
//     category: "workflow",
//     order: 1,
//   },
//   {
//     title:
//       "Purchase Order (Only Inward Stock) Delivery challan & Challan Return",
//     description:
//       "Streamlines inventory management by handling purchase orders exclusively for inward stock.",
//     icon: "Package",
//     category: "workflow",
//     order: 2,
//   },
//   {
//     title: "Sales from Quotation & Delivery Challan",
//     description:
//       "Seamless conversion of quotations and delivery challans into sales invoices, simplifying the sales process and ensuring accurate billing.",
//     icon: "ShoppingBag",
//     category: "workflow",
//     order: 3,
//   },
// ];

// export const MOCK_TESTIMONIALS: Testimonial[] = [
//   {
//     customer_name: "Santosh",
//     business_name: "Santosh Automobiles",
//     // review:
//     //   "Shopcare has transformed how we manage our auto parts inventory. Billing is incredibly fast and we always stay on top of stock levels!",
//     rating: 5,
//     image_url:
//       "https://ui-avatars.com/api/?name=Santosh&background=4F46E5&color=fff&size=200",
//     address: "45, Esteem Park, Takili Phata, Dwarka, Nashik",
//     contact_no: "9422271072",
//   },
//   {
//     customer_name: "Rajendra Borde",
//     business_name: "Borde Hardware and Electronics",
//     // review:
//     //   "Managing both hardware and electronics was challenging before Shopcare. Now our inventory is perfectly organized and billing is effortless!",
//     rating: 5,
//     image_url:
//       "https://ui-avatars.com/api/?name=Rajendra+Borde&background=7C3AED&color=fff&size=200",
//     address:
//       "Lakshsing Road, Nearby Dudhad Branch Post Office, Tal. Dudhad, Dist. Chhatrapati Sambhaji Nagar",
//     contact_no: "9604907698",
//   },
//   {
//     customer_name: "Shreenath Jadhav",
//     business_name: "Shreenath Sanitary Ware Machinery & Electrical",
//     // review:
//     //   "The GST billing system is outstanding! Shopcare handles our diverse product range with ease and accuracy.",
//     rating: 5,
//     image_url:
//       "https://ui-avatars.com/api/?name=Shreenath+Jadhav&background=2563EB&color=fff&size=200",
//     address: "Old Court, Pusad Road, Umarkhed, Dist. Yavatmal",
//     contact_no: "9850863211",
//   },
//   {
//     customer_name: "Nilesh",
//     business_name: "Nilesh Hardware",
//     // review:
//     // "Simple, efficient, and reliable! Shopcare has everything we need to run our hardware store smoothly every day.",
//     rating: 5,
//     image_url:
//       "https://ui-avatars.com/api/?name=Nilesh&background=DC2626&color=fff&size=200",
//     address: "Sakuri, Tal - Rahata, Dist - Ahilyanagar, 423107",
//     contact_no: "9011117474",
//   },
//   {
//     customer_name: "Saptashrungi",
//     business_name: "Saptashrungi Mudranalaya & Stationery",
//     // review:
//     // "Perfect solution for our stationery shop! The quick billing and inventory tracking features save us so much time daily.",
//     rating: 5,
//     image_url:
//       "https://ui-avatars.com/api/?name=Saptashrungi&background=EA580C&color=fff&size=200",
//     address:
//       "Murli Shakuntal Complex, Gala No. 30, Near Central Bank of India, Nashik Road, Sangamner-422605, Dist. A'Nagar",
//     contact_no: "8446147269",
//   },
//   {
//     customer_name: "Krushidhan",
//     business_name: "Krushidhan Irrigation and Hardware",
//     // review:
//     // "Excellent for our agricultural hardware business! Managing hundreds of irrigation products is now incredibly simple with Shopcare.",
//     rating: 4,
//     image_url:
//       "https://ui-avatars.com/api/?name=Krushidhan&background=059669&color=fff&size=200",
//     address: "Chinoda Chofuli, Chinoda Road, Taloda, Dist. Nandurbar",
//     contact_no: "8830665838",
//   },
//   {
//     customer_name: "Trimurti",
//     business_name: "Trimurti Sales",
//     // review:
//     // "Outstanding software! The reporting features help us make better business decisions. Highly recommend Shopcare to all retailers.",
//     rating: 5,
//     image_url:
//       "https://ui-avatars.com/api/?name=Trimurti&background=8B5CF6&color=fff&size=200",
//     address:
//       "Rayatewadi Phata, Nashik Pune Highway, Tal-Sangamner, Ahmednagar - 422605",
//     contact_no: "9657627356",
//   },
// ];

// // ----------------------------
// // MOCK VIDEOS
// // ----------------------------

// export interface Video {
//   id: string;
//   title: string;
//   description: string;
// }

// // export const MOCK_VIDEOS: Video[] = [
// //   {
// //     id: "b-vLaye6f_I",
// //     title: "Shopcare Billing Demo",
// //     description: "Complete walkthrough of Shopcare billing software.",
// //   },
  
// // ];

// // ----------------------------
// // GENERIC FETCH FUNCTION
// // ----------------------------
// export const fetchMockData = <
//   T extends "features" | "testimonials" | "videos" | "contact" | "faqs"
// >(
//   endpoint: T
// ): Promise<
//   T extends "features"
//     ? Feature[]
//     : T extends "testimonials"
//     ? Testimonial[]
//     : T extends "contact"
//     ? ContactData[]
//     : T extends "faqs"
//     ? FAQItem[]
//     : Video[]
// > => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       switch (endpoint) {
//         case "features":
//           resolve(MOCK_FEATURES as any);
//           break;
//         case "testimonials":
//           resolve(MOCK_TESTIMONIALS as any);
//           break;
//         case "contact":
//           resolve(MOCK_CONTACT as any);
//           break;
//         case "faqs":
//           resolve(MOCK_FAQS as any);
//           break;
//         default:
//           resolve(MOCK_VIDEOS as any);
//       }
//     }, 500);
//   });
// };
