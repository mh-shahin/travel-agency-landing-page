'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, MapPin, MessageSquare, LogOut, Home } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const menuItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Destinations', href: '/dashboard/destinations', icon: MapPin },
        { name: 'Testimonials', href: '/dashboard/testimonials', icon: MessageSquare },
    ];

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="font-bold text-xl">Travelo Admin</span>
            </Link>

            {/* User Info */}
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Logged in as</p>
                <p className="font-semibold text-white truncate">{user?.email || 'Admin'}</p>
                <p className="text-xs text-gray-500 mt-1">{user?.role || 'Administrator'}</p>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto space-y-2">
                {/* Back to Home */}
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200"
                >
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Back to Home</span>
                </Link>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}