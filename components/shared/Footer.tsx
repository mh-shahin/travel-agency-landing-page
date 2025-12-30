'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import img from "@/components/home/image/Travels ®1.png";

export default function Footer() {
  return (
    <footer className="bg-blue-100 text-black py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-black">
              <Image src={img} alt="Logo" width={120} height={40} />
            </div>
            <p className="text-black text-sm w-4/6">
              Discover the world one adventure at a time Life is short, book the trip.
            </p>
            <div className="flex gap-3 mt-4 bg-black p-2 rounded-full w-max">
              <a href="#" className="bg-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-black">
              <li><Link href="#" className="hover:text-black">About Us</Link></li>
              <li><Link href="#" className="hover:text-black">Tour Guide</Link></li>
              <li><Link href="#" className="hover:text-black">Packages</Link></li>
              <li><Link href="#" className="hover:text-black">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resource</h3>
            <ul className="space-y-2 text-sm text-black">
              <li><Link href="#" className="hover:text-black">Free Ebooks</Link></li>
              <li><Link href="#" className="hover:text-black">Tutorials</Link></li>
              <li><Link href="#" className="hover:text-black">How To Blogs</Link></li>
              <li><Link href="#" className="hover:text-black">YouTube Playlists</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Extra Links</h3>
            <ul className="space-y-2 text-sm text-black">
              <li><Link href="#" className="hover:text-black">Customer Support</Link></li>
              <li><Link href="#" className="hover:text-black">T&C</Link></li>
              <li><Link href="#" className="hover:text-black">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-sm text-black">
          © 2025 Travelo.com. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}