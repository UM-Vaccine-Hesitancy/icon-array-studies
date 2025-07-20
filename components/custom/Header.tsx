import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

function Header() {
  return (
    <header className="bg-secondary/60 flex items-center justify-between gap-4 p-4">
      <h1 className="text-2xl">Icon Array Studies</h1>
      <nav className="pr-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="w-32">
                Archive
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink
                  href="/archive/iconarray"
                  className="w-28"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Generator v0
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/archive/first"
                  className="w-28"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Virtual First
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/archive/mid"
                  className="w-28"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Virtual Mid
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/archive/last"
                  className="w-28"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Virtual Last
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/archive/zoom"
                  className="w-28"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zoom
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}

export default Header;
