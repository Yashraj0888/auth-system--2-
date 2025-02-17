
import React, { useState } from 'react';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo-icon";
import { Home, Users, Settings, Bell, Search } from 'lucide-react';
import { ArrowUpRight, Clock, Target } from 'lucide-react';
import Image from 'next/image';
import { GeneEssentialityChart } from "gene-essentiality-chart"
import Geneessentilaity from '@/components/Geneessentilaity';


export default function Dashboard() {

  const session = cookies().get("session");

  if (!session) {
    redirect("/");
  }

  const email = session.value;
  const name = email.split("@")[0].toUpperCase();

  const handleLogout = async () => {
    // "use server";
    cookies().delete("session");
    redirect("/");
  };
  const startDate = new Date('2025-02-03T11:00:00'); // Start date and time: 3rd Feb 2025, 11:00 AM
  const currentDate = new Date(); // Current date and time

  // Calculate the difference in milliseconds
  const timeDiff = currentDate.getTime() - startDate.getTime();

  // Convert milliseconds to days (including fractional days for time)
  const totalDays = timeDiff / (1000 * 60 * 60 * 24);

  // Navigation Item Component with underline animation

  const NavItem = ({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) => {
    return (
      <a href="#" className="group flex flex-col items-center">
        <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white transition-colors">
          {icon}
          <span>{text}</span>
        </div>
        <div className={`h-0.5 transition-all duration-300 ease-out 
          ${active ? 'w-full bg-white' : 'w-0 bg-transparent'} 
          group-hover:w-full group-hover:bg-white mt-1`}
        />
      </a>
    );
  };

  // Stats Card Component

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Navigation */}
      <header className="bg-primary text-primary-foreground shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Image src="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png" alt="Logo" width={50} height={100} className='w-32 h-8' />
            </div>
  
            {/* Navigation Items */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavItem icon={<Home size={18} />} text="Dashboard" active />
              <NavItem icon={<Users size={18} />} text="Team" />
              <NavItem icon={<Bell size={18} />} text="Notifications" />
              <NavItem icon={<Settings size={18} />} text="Settings" />
            </nav>
  
            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="h-5 w-5 text-black absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white text-black placeholder:text-black pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring w-48"
                />
              </div>
              <form action={handleLogout}>
                <Button variant="outline" type="submit" 
                  className="border-foreground text-foreground bg-button hover:bg-pink-600 transition-colors">
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>
  
      {/* Main Content */}
      <main className="pt-24 container mx-auto px-6">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative p-8">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-full opacity-50" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gray-50 to-gray-100 rounded-tr-full opacity-50" />
          
          {/* Main Content */}
          <div className="relative">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome home {name}</h2>
                <p className="text-xl text-gray-600">Your email address: <span className='font-bold text-gray-900 hover:underline cursor-grab'>{email}</span></p>
              </div>
              <div className="bg-gray-50 p-2 rounded-full">
                <ArrowUpRight className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total working days</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900 mr-2">{totalDays.toFixed(0)}</span>
                    <span className="text-green-500 text-sm flex items-center">
                      <ArrowUpRight className="w-4 h-4" />
                      {(totalDays/28)*100} %
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Clock className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total working hours</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900 mr-2">{(totalDays * 8).toFixed(2)}</span>
                    <span className="text-green-500 text-sm flex items-center">
                      <ArrowUpRight className="w-4 h-4" />
                      100 %
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Target className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Average Attendance</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900 mr-2">100%</span>
                    <span className="text-green-500 text-sm flex items-center">
                      <ArrowUpRight className="w-4 h-4" />
                      100%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900">Session Status</h3>
                  <p className="text-gray-600">
                    You have successfully authenticated with Aganitha.
                    Your session is active and secure.
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">Active Session</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
    </div>
  );
}