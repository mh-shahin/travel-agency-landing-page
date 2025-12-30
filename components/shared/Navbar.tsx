"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import img from "@/components/home/image/Travels ®.png";
import img2 from "@/components/home/image/Vector.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Package', href: '#package' },
    { name: 'Tour', href: '#tour' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT - Logo */}
          <div className="">
            <Link href="/" className="flex items-center gap-2">
              <Image src={img} alt="Logo" width={120} height={40} />
            </Link>
          </div>

          {/* CENTER - Nav Links */}
          <div className="hidden md:flex  justify-center items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-black hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button className="hidden md:flex  justify-center bg-black text-white py-2 w-32 rounded-2xl">
            <Image src={img2} alt="Icon" width={15} height={0} className="mr-2 " />
            <h2>Book Trip</h2>
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>


        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="#" onClick={() => setIsOpen(false)}>
              <button className="w-full mt-2 bg-gray-900 text-white px-6 py-2 rounded-full flex justify-center items-center">
                <Image src={img2} alt="Icon" width={15} height={0} className="mr-2 " />
                <p>Book Trip</p>
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}