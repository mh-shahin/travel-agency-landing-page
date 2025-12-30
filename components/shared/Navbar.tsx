// components/shared/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import img from '@/components/home/image/Travels ®.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

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
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src={img} alt="Travelo Logo" width={120} height={40} />
            </Link>
          </div>

          {/* CENTER - Nav Links (Desktop) */}
          <div className="hidden md:flex justify-center items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT - Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition-colors">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-4 space-y-2">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}