 
// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { Play, CheckCircle2 } from "lucide-react";
// // import Card from "./common/Card";

// // interface Video {
// //   id: string;
// //   title: string;
// //   description: string;
// // }

// // interface Feature {
// //   title: string;
// //   description?: string;
// //   category?: string;
// //   icon?: string;
// //   order?: number;
// // }

// // interface ShopcareContent {
// //   videos: Video[];
// //   features?: Feature[];
// //   [key: string]: any;
// // }

// // export default function ProductDemo() {
// //   const [mounted, setMounted] = useState(false);
// //   const [activeVideo, setActiveVideo] = useState<Video | null>(null);
// //   const [videos, setVideos] = useState<Video[]>([]);
// //   const [features, setFeatures] = useState<string[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     setMounted(true);

// //     const fetchData = async () => {
// //       try {
// //         const res = await fetch("/ShopcareContent.json");
// //         const data: ShopcareContent = await res.json();
// //         setVideos(data.videos || []);

// //         // Map features titles safely
// //         if (data.features) {
// //           setFeatures(data.features.map((f) => f.title));
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch Shopcare content:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   if (!mounted) return null;
// //   if (loading)
// //     return (
// //       <div className="text-center py-20 text-slate-600">Loading...</div>
// //     );

// //   const featuredVideo = videos[0];

// //   return (
// //     <section className="py-16 pb-8 px-6 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-lg">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Title */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 30 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.7 }}
// //           className="text-center mb-12"
// //         >
// //           <h2 className="text-4xl lg:text-5xl font-bold mb-3">
// //             <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
// //               Product Demo
// //             </span>
// //           </h2>
// //           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
// //             A sophisticated and easy-to-use billing software for every business!
// //           </p>
// //         </motion.div>

// //         {featuredVideo ? (
// //           <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
// //             {/* Left: Video Card */}
// //             <motion.div
// //               initial={{ opacity: 0, x: -30 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.7 }}
// //             >
// //               <Card gradient="from-blue-500 to-cyan-400">
// //                 <div className="relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer">
// //                   <img
// //                     src={`https://img.youtube.com/vi/${featuredVideo.id}/maxresdefault.jpg`}
// //                     alt={featuredVideo.title}
// //                     className="w-full h-full object-cover rounded-2xl"
// //                   />
// //                   <div className="absolute inset-0 bg-black/30 rounded-2xl transition-all group-hover:bg-black/40" />
// //                   <motion.button
// //                     onClick={() => setActiveVideo(featuredVideo)}
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     className="absolute inset-0 m-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl z-10 transition-transform"
// //                   >
// //                     <Play
// //                       className="w-10 h-10 text-blue-600 ml-1"
// //                       fill="currentColor"
// //                     />
// //                   </motion.button>
// //                 </div>
// //                 <div className="p-6">
// //                   <h3 className="font-bold text-xl text-slate-900 mb-2">
// //                     {featuredVideo.title}
// //                   </h3>
// //                   <p className="text-slate-600">{featuredVideo.description}</p>
// //                 </div>
// //               </Card>
// //             </motion.div>

// //             {/* Right: Preview Information */}
// //             <motion.div
// //               initial={{ opacity: 0, x: 30 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.7, delay: 0.2 }}
// //               className="space-y-6"
// //             >
// //               <div>
// //                 <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
// //                   Why Choose Our Software?
// //                 </h3>
// //                 <p className="text-slate-600 text-lg leading-relaxed">
// //                   Streamline your business operations with our comprehensive
// //                   billing solution. Designed for efficiency and built for growth.
// //                 </p>
// //               </div>

// //               {/* Features List */}
// //               <div className="space-y-4">
// //                 {features.map((feature, index) => (
// //                   <motion.div
// //                     key={index}
// //                     initial={{ opacity: 0, x: 20 }}
// //                     whileInView={{ opacity: 1, x: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 0.5, delay: index * 0.1 }}
// //                     className="flex items-start gap-3"
// //                   >
// //                     <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
// //                     <p className="text-slate-700 text-base">{feature}</p>
// //                   </motion.div>
// //                 ))}
// //               </div>

// //               {/* CTA Button */}
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={() => setActiveVideo(featuredVideo)}
// //                 className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
// //               >
// //                 Watch Full Demo
// //               </motion.button>
// //             </motion.div>
// //           </div>
// //         ) : (
// //           <div className="text-center py-20 text-slate-600">No video available</div>
// //         )}

// //         {/* Video Popup */}
// //         {activeVideo && (
// //           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
// //             <motion.div
// //               initial={{ scale: 0.8, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.8, opacity: 0 }}
// //               className="w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl relative"
// //             >
// //               <iframe
// //                 src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
// //                 title={activeVideo.title}
// //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                 allowFullScreen
// //                 className="w-full aspect-video"
// //               ></iframe>

// //               <button
// //                 onClick={() => setActiveVideo(null)}
// //                 className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:bg-slate-100 transition-colors"
// //               >
// //                 ✕
// //               </button>
// //             </motion.div>
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // }
// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, Variants } from "framer-motion";
// import { Play, CheckCircle2 } from "lucide-react";
// import Card from "./common/Card";

// const staggerContainer: Variants = {
//   hidden: { opacity: 1 },
//   visible: {
//     opacity: 1,
//     transition: {
//       delayChildren: 0.15,
//       staggerChildren: 0.18,
//     },
//   },
// };

// const staggerItem : Variants = {
//   hidden: { opacity: 0, x: 25 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.45, ease: "easeOut" },
//   },
// };


// interface Video {
//   id: string;
//   title: string;
//   description: string;
// }

// interface Feature {
//   title: string;
// }

// interface ShopcareContent {
//   videos: Video[];
//   features: Feature[];
// }

// // Animation Variants
// const fadeSlideUp: Variants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
// };

// const fadeSlideLeft: Variants = {
//   hidden: { opacity: 0, x: 40 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
// } ;

 

// export default function ProductDemo() {
//   const [mounted, setMounted] = useState(false);
//   const [activeVideo, setActiveVideo] = useState<Video | null>(null);
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [features, setFeatures] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setMounted(true);

//     const fetchData = async () => {
//       try {
//         const res = await fetch("/ShopcareContent.json");
//         const data: ShopcareContent = await res.json();

//         setVideos(data.videos || []);
//         setFeatures(data.features?.map((f) => f.title) || []);
//       } catch (err) {
//         console.error("Failed to load Shopcare content:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!mounted) return null;
//   if (loading) return <div className="text-center py-20">Loading...</div>;

//   const featuredVideo = videos[0];

//   return (
//     <section id="product-demo" className="py-16 pb-8 px-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-lg">
//   <div className="max-w-7xl mx-auto">

//     {/* Title */}
//     <motion.div
//       variants={fadeSlideUp}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       className="text-center mb-12"
//     >
//       <h2 className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-700 to-gray-400 bg-clip-text text-transparent">
//         Product Demo
//       </h2>

//       <motion.p
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ delay: 0.3, duration: 0.6 }}
//         className="text-lg text-gray-700 max-w-2xl mx-auto"
//       >
//         A complete demonstration of K Bazaar billing software.
//       </motion.p>
//     </motion.div>

//     {/* Video Display */}
//     {featuredVideo ? (
//       <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

//         {/* Left — Video Thumbnail */}
//         <motion.div
//           variants={fadeSlideLeft}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <Card gradient="from-gray-800 to-gray-500">
//             <div className="relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer">
//               <motion.img
//                 whileHover={{ scale: 1.07 }}
//                 transition={{ duration: 0.4 }}
//                 src={`https://img.youtube.com/vi/${featuredVideo.id}/maxresdefault.jpg`}
//                 alt={featuredVideo.title}
//                 className="w-full h-full object-cover rounded-2xl"
//               />

//               <div className="absolute inset-0 bg-black/30 rounded-2xl group-hover:bg-black/40 transition-all" />

//               <motion.button
//                 onClick={() => setActiveVideo(featuredVideo)}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="absolute inset-0 m-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl z-10"
//               >
//                 <Play className="w-10 h-10 text-gray-700 ml-1" fill="currentColor" />
//               </motion.button>
//             </div>

//             <div className="p-6">
//               <h3 className="font-bold text-xl text-gray-900 mb-2">
//                 {featuredVideo.title}
//               </h3>
//               <p className="text-gray-600">{featuredVideo.description}</p>
//             </div>
//           </Card>
//         </motion.div>

//         {/* Right — Features Info */}
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ amount: 0.2 }}
//           className="space-y-4"
//         >
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               variants={staggerItem}
//               className="flex items-start gap-3"
//             >
//               <CheckCircle2 className="w-6 h-6 text-gray-700 mt-0.5" />
//               <p className="text-gray-800">{feature}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//       </div>
//     ) : (
//       <div className="text-center py-16 text-gray-600">No video found</div>
//     )}

//     {/* Video Popup */}
//     {activeVideo && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
//       >
//         <motion.div
//           initial={{ scale: 0.75, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ type: 'spring', stiffness: 130, damping: 12 }}
//           className="max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl relative"
//         >
//           <iframe
//             src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
//             className="w-full aspect-video"
//             allowFullScreen
//           ></iframe>

//           <button
//             onClick={() => setActiveVideo(null)}
//             className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
//           >
//             ✕
//           </button>
//         </motion.div>
//       </motion.div>
//     )}

//   </div>
// </section>

//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Play, CheckCircle2 } from "lucide-react";
import Card from "./common/Card";

interface Video {
  id: string;
  title: string;
  description: string;
}

interface Feature {
  title: string;
}

interface ShopcareContent {
  videos: Video[];
  features: Feature[];
}

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.15, staggerChildren: 0.18 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ProductDemo() {
  const [mounted, setMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const res = await fetch("/ShopcareContent.json");
        const data: ShopcareContent = await res.json();
        setVideos(data.videos || []);
        setFeatures(data.features?.map((f) => f.title) || []);
      } catch (err) {
        console.error("Failed to load Shopcare content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!mounted) return null;
  if (loading) return <div className="text-center py-20">Loading...</div>;

  const featuredVideo = videos[0];

  return (
    <section
      id="product-demo"
      className="py-16 px-6 bg-gradient-to-br from-blue-50 via-white to-cyan-50"
    >
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Product Demo
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            A complete demonstration of K Bazaar billing software.
          </p>
        </motion.div>

        {/* Video */}
        {featuredVideo ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card gradient="from-blue-600 to-cyan-400">
              <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition">
                <img
                  src={`https://img.youtube.com/vi/${featuredVideo.id}/maxresdefault.jpg`}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/25 rounded-2xl group-hover:bg-black/35 transition" />
                <motion.button
                  onClick={() => setActiveVideo(featuredVideo)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute inset-0 m-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl z-10"
                >
                  <Play className="w-10 h-10 text-blue-600" />
                </motion.button>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-2xl text-gray-900 mb-2">
                  {featuredVideo.title}
                </h3>
                <p className="text-gray-700">{featuredVideo.description}</p>
              </div>
            </Card>
          </motion.div>
        ) : (
          <div className="text-center py-16 text-gray-600">No video found</div>
        )}

        {/* Feature Points */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          className="mt-8 flex flex-col gap-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="flex items-center gap-3 p-3 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p className="text-gray-800 font-medium text-sm sm:text-base">{feature}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Popup */}
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 130, damping: 12 }}
              className="max-w-3xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                className="w-full aspect-video"
                allowFullScreen
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
