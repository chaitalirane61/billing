 
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import { useAdminLogin } from "@/hooks/useAdminLogin"
import { useRouter } from "next/navigation";

import {
  Lock,
  User,
  ArrowRight,
  Users,
  TrendingUp,
  CheckCircle,
  Headphones,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import soulsoft_logo from "@/public/images/soulsoft_logo.png";
// export default function AdminLogin(): JSX.Element {
export default function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const router = useRouter();
  const loginMutation = useAdminLogin();

  // const handleLogin = () => {
  //   loginMutation.mutate(
  //     { username: user, password: pass },
  //     {
  //       onSuccess: (data) => {
  //         console.log("LOGIN SUCCESS", data);
  //         router.push("/admin/panel");
  //       },
  //       onError: (err: unknown) => {
  //         if (err instanceof Error) {
  //           alert(err.message);
  //         } else {
  //           alert("Invalid credentials!");
  //         }
  //       },
  //     }
  //   );
  // };

  // Removed the 'stats' array

  const handleLogin = () => {
  loginMutation.mutate(
    { username: user, password: pass },
    {
      onSuccess: (data) => {
        console.log("LOGIN SUCCESS", data);
        
        // Store token in localStorage
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
        }
        
        router.replace("/admin/panel");
      },
      onError: (err: unknown) => {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("Invalid credentials!");
        }
      },
    }
  );
};
  return (
    // The main container background and animation are unchanged
    <div className="min-h-[80vh] relative overflow-hidden bg-gradient-to-br from-[#0A1C2F] via-[#0D2740] to-[#0A1C2F]">
      <div className="absolute inset-0">
      
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-2xl">
            {/* LEFT SIDE: Modified for white background and simplified content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              // Changed background to white
              className="relative p-8 md:p-10 flex flex-col justify-center bg-white"
            >
              {/* Animation elements are kept */}
              <div className="absolute top-0 right-0 w-40 h-40 border border-black/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border border-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                  // Adjusted classes to center only the logo image
                  className="flex items-center gap-3 mb-10 justify-center"
                >
                  <Image
                    src={soulsoft_logo}
                    alt="Shopcare Logo"
                    // Logo styling
                    className="w-30 h-18"
                    priority
                  />
                  {/* REMOVED: Shopcare Billing Software text section */}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Welcome Back,
                    <br />
                    <span className="bg-gradient-to-r from-cyan-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                      Admin!
                    </span>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-4 text-base text-gray-600 leading-relaxed max-w-md mx-auto"
                >
                  Manage your platform efficiently and securely.
                </motion.p>
              </div>
            </motion.div>

            {/* RIGHT SIDE: Login form remains the same */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-8 md:p-4 flex flex-col justify-center bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-l border-white/5"
            >
              <div className="max-w-sm mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-center mb-10"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                    <Lock className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Admin Login
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Enter your credentials to access the dashboard
                  </p>
                </motion.div>

                <div className="space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-500" /> Username
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-500" />
                      <Input
                        type="text"
                        placeholder="Enter username"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="h-10 text-sm relative w-full px-3 py-3 bg-white/5 border-white/10 
             rounded-xl text-white placeholder:text-slate-500 
             focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 
             transition-all duration-300"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-slate-500" /> Password
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-500" />
                      <Input
                        type="password"
                        placeholder="Enter password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className="h-10 text-sm relative w-full px-3 py-3 bg-white/5 border-white/10 
             rounded-xl text-white placeholder:text-slate-500 
             focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 
             transition-all duration-300"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex justify-end"
                  >
                    {/* Empty div for Forgot password link removed */}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <Button
                      onClick={handleLogin}
                      disabled={loginMutation.isPending}
                      className="h-10 text-sm w-full px-3 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 
             hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl 
             shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 
             transition-all duration-300 group"
                    >
                      {loginMutation.isPending ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Login to Dashboard
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="mt-8 pt-6 border-t border-white/5"
                >
                  <p className="text-center text-slate-500 text-xs">
                    © 2012-{new Date().getFullYear()} Soulsoft Infotech Pvt Ltd.
                  </p>
                  <p className="text-center text-slate-600 text-xs mt-2">
                    Need help? Contact: +91 7798798679
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
