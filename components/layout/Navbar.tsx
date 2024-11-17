"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LogIn, Menu, UserPlus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavMenu from "./NavMenu";
import { signOut, useSession } from "next-auth/react";
import NavMobile from "./NavMobile";
import User from "./User";

const Navbar = () => {
  const { data } = useSession();
  const pathName = usePathname();
  const [showNavMobile, setShowNavMobile] = useState<boolean>(false);

  const handleToggleNavMobile = () => {
    setShowNavMobile(!showNavMobile);
  }


  const renderComponents = data?.user ? (
    <div className="space-x-4 flex items-center relative">
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
    <div className="space-x-2 flex items-center">
      <Link
        href={"/register"}
        className="md:px-4 md:py-2 px-2 py-1 md:text-md text-sm rounded bg-green-500 text-slate-100 font-bold hover:bg-green-600 flex items-center gap-2 shadow-lg shadow-slate-700/40"
      >
        <UserPlus className="group-hover:translate-x-0.5 transition-all duration-75 size-4" />
        <span>Join Us</span>
      </Link>
      <Link
        href={"/login"}
        className="md:px-4 md:py-2 px-2 py-1 md:text-md text-sm rounded bg-white border border-slate-300 text-slate-900 font-bold hover:bg-slate-100 flex items-center gap-2 group shadow-lg shadow-slate-700/40"
      >
        <LogIn className="group-hover:translate-x-0.5 transition-all duration-75 size-4" />
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
          <div className="flex items-center gap-2">
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
