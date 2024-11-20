import { menuData } from "@/constants"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

interface Props {
  email: string
  showNavMobile: boolean
  toggleNavMobile: () => void
}

const NavMobile = ({ email,showNavMobile, toggleNavMobile }: Props) => {
  return (
    <div
      className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-slate-100 flex flex-col justify-between ${
        showNavMobile ? "translate-y-0 z-50" : "translate-y-[-120%] -z-10"
      } transition-all duration-200`}
    >
      <div>
        <Image
          src={"/logo.png"}
          alt="Compontae Logo"
          width={150}
          height={150}
          className="mx-auto rounded-full"
        />
        <div className="mt-2 p-4">
          <Accordion type="single" collapsible className="my-2">
            {menuData.map((menu) => (
              <AccordionItem key={menu.title} value={menu.title} className="">
                <AccordionTrigger className="flex mt-2 justify-between w-full p-2 bg-green-100 rounded-lg font-medium text-green-900">
                  {menu.title}
                </AccordionTrigger>
                <AccordionContent className="bg-white rounded-md shadow-lg">
                  {menu.items ? (
                    <div className="space-y-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.title}
                          onClick={()=>toggleNavMobile()}
                          href={item.href}
                          className="block text-sm text-gray-700 hover:text-green-600 pl-4 py-2"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={menu.href}
                      onClick={()=>toggleNavMobile()}
                      className="block text-sm text-gray-700 hover:text-green-600 pl-4 py-2"
                    >
                      {menu.title}
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {email &&(
             <Button variant={'destructive'} onClick={() => signOut()} className="w-full">Sign Out</Button>
          )}
        </div>
      </div>
      <button
        onClick={toggleNavMobile}
        className="block mx-auto p-2 bg-slate-100 rounded-full mb-2"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </div>
  )
}

export default NavMobile
