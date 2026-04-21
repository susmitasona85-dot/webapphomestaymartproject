"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Calendar, Image, Phone, Info } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "Stay", href: "/stay", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: "Gallery", href: "/gallery", icon: <Image className="w-4 h-4 mr-2" /> },
    { name: "About", href: "/about", icon: <Info className="w-4 h-4 mr-2" /> },
    { name: "Contact", href: "/contact", icon: <Phone className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
              Nature<span className="text-earth-brown">Stay</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground/70 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Now
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-primary hover:bg-accent focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground/70 hover:text-primary hover:bg-accent block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
