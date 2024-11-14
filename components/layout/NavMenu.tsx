'use client'
import { menuData } from "@/constants";
import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import ListItem from "../ui/listitem";


export default function NavMenu() {
  return (
    <NavigationMenu className="z-50 sm:block hidden">
      <NavigationMenuList>
        {menuData.map((menu) => (
          <NavigationMenuItem key={menu.title}>
            {menu.items ? (
              <>
                <NavigationMenuTrigger className="bg-transparent text-green-800 font-semibold">
                  {menu.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={`grid gap-3 p-4 ${
                      menu.title === "Compontae"
                        ? "md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
                        : "w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                    }`}
                  >
                    {menu.title === "Compontae" && (
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href={menu.items[0].href}
                          >
                            <Image
                              src={menu.items[0].logo as string}
                              alt="Compontae Logo"
                              width={menu.items[0].logoWidth}
                              height={menu.items[0].logoHeight}
                            />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {menu.items[0].title}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {menu.items[0].description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    )}
                    {menu.items.slice(menu.title === "Compontae" ? 1 : 0).map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={menu.href!} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-transparent`}
                >
                  {menu.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
