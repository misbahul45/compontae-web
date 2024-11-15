"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BellIcon, LogIn, Menu, UserPlus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavMenu from "./NavMenu";
import { signOut, useSession } from "next-auth/react";
import { deletAllNotification, getLengthNotification } from "@/actions/notification-action";
import ShowNotif from "./ShowNotif";
import NavMobile from "./NavMobile";
import User from "./User";

const Navbar = () => {
  const { data } = useSession();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showNavMobile, setShowNavMobile] = useState<boolean>(false);

  const handleToggleNavMobile = () => {
    setShowNavMobile(!showNavMobile);
  }

  const [lengthNotification, setLengthNotification] = useState<number | null>(null);


  useEffect(() => {
    const fetchNotificationLength = async () => {
      try {
        const length = await getLengthNotification();
        setLengthNotification(length);
      } catch (error) {
        console.error("Failed to fetch notification length:", error);
      }
    };
    fetchNotificationLength();
  }, []);

  const toggleNotification = async() =>{
    setIsOpen(!isOpen);
    if(isOpen){
      setLengthNotification(null)
      await deletAllNotification()
    }
  }

  const renderComponents = data?.user ? (
    <div className="space-x-4 flex items-center relative">
      <button
        className="p-2 rounded-full bg-gray-100 hover:bg-slate-100 transition-all duration-100 relative"
        onClick={toggleNotification}
      >
        <BellIcon />
        {lengthNotification !== null && lengthNotification > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
            {lengthNotification}
          </span>
        )}
      </button>
      {isOpen && <ShowNotif />}
      <Button variant={"destructive"} onClick={() => signOut()} className="sm:block hidden">
        Sign Out
      </Button>
      {data?.user.role === "ADMIN" && (
        <Link href={"/blog/create"} className="sm:block hidden">
          <Button variant={"outline"}>Write Post</Button>
        </Link>
      )}
      <User email={data.user.email as string} />
    </div>
  ) : (
    <div className="space-x-4 flex items-center">
      <Link
        href={"/register"}
        className="md:px-4 md:py-2 px-2 py-1 md:text-md text-sm rounded bg-green-500 text-slate-100 font-bold hover:bg-green-600 flex items-center gap-2 shadow-lg shadow-slate-700/40"
      >
        <UserPlus />
        <span>Join Us</span>
      </Link>
      <Link
        href={"/login"}
        className="md:px-4 md:py-2 px-2 py-1 md:text-md text-sm rounded bg-white border border-slate-300 text-slate-900 font-bold hover:bg-slate-100 flex items-center gap-2 group shadow-lg shadow-slate-700/40"
      >
        <LogIn className="group-hover:translate-x-0.5 transition-all duration-75" />
        <span>Login</span>
      </Link>
    </div>
  );

  if (pathName === "/login" || pathName === "/register") {
    return null;
  } else {
    return (
      <header className="fixed top-0 left-0 w-full h-16 bg-white z-50 transition-all">
        <div className="w-full lg:px-10 md:px-8 px-4 mx-auto h-full flex justify-between items-center">
          <div className="flex gap-4">
            <Link
              href={"/"}
              className="bg-gradient-to-r from-cyan-400 to-green-500 shadow-xl shadow-blue-500/10 w-max px-4 py-2 rounded font-semibold text-white"
            >
              Compotae
            </Link>
            <NavMenu />
          </div>
          <div className="flex items-center gap-4">
            {renderComponents}
            <button onClick={handleToggleNavMobile} className="sm:hidden block p-1 rounded-full bg-slate-100">
              {showNavMobile ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <NavMobile showNavMobile={showNavMobile} toggleNavMobile={handleToggleNavMobile} />
      </header>
    );
  }
};

export default Navbar;
