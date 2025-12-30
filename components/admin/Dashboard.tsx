

"use client";
import { useState } from "react";
import soulsoft_logo from "@/public/images/soulsoft_logo.png";
// Import your components
import LeadsTable from "@/components/admin/LeadsTable";
import SubscribersTable from "@/components/admin/SubscribersTable";
// NOTE: LoginForm component is not needed based on the authenticated view screenshot
import Header from "@/components/admin/header";
import Image from "next/image";
export default function Dashboard() {
  const [auth, setAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<"leads" | "subscribers">("leads");
  // localStorage.removeItem('adminToken', data.token);
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...");
    setAuth(false);
  };

  // if (!auth) {
  //   return <div className="text-center p-10">Please log in.</div>;
  // }

  return (

    <div className="min-h-screen bg-gray-100   w-full" id="dashboard">
       <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => setAuth(false)}
      />
        <div className="pt-[4.5rem] p-2 sm:p-4 lg:p-6">


        {/* --- Table Content --- */}

        {/* Leads Table Container */}
        {activeTab === "leads" && (
          <div className="p-2 w-full">
            <LeadsTable />
          </div>
        )}

        {/* Subscribers Table Container */}
        {activeTab === "subscribers" && (
          <div className="p-2  w-full">
            <SubscribersTable />
          </div>
        )}
      </div>
    </div>
  );
}