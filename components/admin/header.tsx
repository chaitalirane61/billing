"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import soulsoft_logo from "@/public/images/soulsoft_logo.png";

interface HeaderProps {
  activeTab: "leads" | "subscribers";
  setActiveTab: (tab: "leads" | "subscribers") => void;
  onLogout?: () => void; // optional
}

export default function Header({
  activeTab,
  setActiveTab,
  onLogout,
}: HeaderProps) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  // Load token when page loads
  useEffect(() => {
  const savedToken = localStorage.getItem("adminToken");
  if (!savedToken) {
    router.push("/admin");
  }
}, [router]);


  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);

    if (onLogout) onLogout(); // optional callback from parent

    router.push("/admin");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between 
                         px-4 sm:px-6 py-1 bg-white shadow-md w-full"> 
    
      {/* LEFT — LOGO */}
      <div className="flex items-center gap-2">
         <Image
              src={soulsoft_logo}
              alt="Shopcare Logo"
              className="w-30 h-18 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent"
              priority
            />
      </div>

      {/* RIGHT — TABS + LOGOUT */}
      <div className="flex items-center gap-6 ml-auto">
        <button
          onClick={() => setActiveTab("leads")}
          className={`text-sm md:text-base font-medium pb-1 ${
            activeTab === "leads"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Leads
        </button>

        <button
          onClick={() => setActiveTab("subscribers")}
          className={`text-sm md:text-base font-medium pb-1 ${
            activeTab === "subscribers"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Subscribers
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm md:text-base"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
