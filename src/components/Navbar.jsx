

"use client"
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [banglaDate, setBanglaDate] = useState("");
    const dropdownRef = useRef(null);
    const router = useRouter();

    const { data: session } = authClient.useSession();

   
    useEffect(() => {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        setBanglaDate(now.toLocaleDateString('bn-BD', options));
    }, []);




    

    // Dropdown-er baire click korle seta bondho hoye jabe
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    setIsDropdownOpen(false);
                    router.push("/sign-in");
                },
            },
        });
    };

    const categories = [
        { name: "চাল", slug: "chal", icon: "🌾" },
        { name: "ডাল", slug: "dal", icon: "🫘" },
        { name: "তেল", slug: "oil", icon: "🌻" },
        { name: "সবজি", slug: "vegetables", icon: "🥬" },
        { name: "মাছ", slug: "fish", icon: "🐟" },
        { name: "মাংস", slug: "meat", icon: "🥩" },
        { name: "ডিম-দুধ", slug: "eggs", icon: "🥚" },
        { name: "মসলা", slug: "spices", icon: "🧄" }
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-xs">
            {/* Main Navbar Row */}
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                
                {/* Left: Mobile Hamburger Icon + Public Logo & Dynamic Date */}
                <div className="flex items-center gap-3">
                    <button
                        className="md:hidden text-gray-700 p-1.5 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                    
                    <div className="flex items-center gap-3">
                        {/* Public Folder theke Logo Image */}
                        <Link href="/" className="flex items-center justify-center shrink-0">
                            <Image 
                                src="/logo-icon.png" 
                                alt="Bazar Dor Logo" 
                                width={44} 
                                height={44} 
                                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-xl"
                            />
                        </Link>

                        <div>
                            <Link href="/" className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight hover:text-emerald-700 transition">
                                বাজার দর
                            </Link>
                            {/* Dynamic Bangla Date */}
                            <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                                {banglaDate || "লোড হচ্ছে..."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: User Profile Section with Desktop Public Image */}
                <div className="relative" ref={dropdownRef}>
                    <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-lg hover:bg-gray-50 transition select-none"
                    >
                        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-gray-200 shrink-0">
                            <Image
                                src={session?.user?.image || "/user.jfif"}
                                alt="User Picture"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-800 hidden sm:inline-block">
                            {session?.user?.name || "Takiya Jahan"}
                        </span>
                        <span className={`text-[10px] text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </div>

                    {/* Profile Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 flex flex-col">
                            {session?.user ? (
                                <>
                                    <Link 
                                        href="/profile" 
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"
                                    >
                                        👤 আমার প্রোফাইল
                                    </Link>
                                    <button 
                                        onClick={handleSignOut}
                                        className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                                    >
                                        🚪 সাইন আউট
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        href="/sign-in" 
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"
                                    >
                                        🔑 সাইন ইন (Sign In)
                                    </Link>
                                    <Link 
                                        href="/sign-up" 
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="px-4 py-2.5 text-xs text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 font-bold"
                                    >
                                        ✨ সাইন আপ (Sign Up)
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>

            </div>

            {/* Categories Ribbon */}
            <div className="border-t border-gray-100 bg-gray-50/70 py-2.5 overflow-x-auto scrollbar-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {categories.map((cat, index) => (
                        <Link 
                            key={index} 
                            href={`/categories/${cat.slug}`} 
                            className="flex items-center gap-1.5 hover:text-emerald-600 hover:bg-white px-3 py-1 rounded-lg transition"
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Drawer Navigation */}
            {isMenuOpen && (
                <div className="border-t border-gray-100 md:hidden bg-white px-6 py-4 shadow-lg transition-all">
                    <ul className="flex flex-col gap-3 text-sm font-medium text-gray-700">
                        <li>
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block py-1 font-semibold text-emerald-700">
                                হোম
                            </Link>
                        </li>
                        {categories.map((cat, index) => (
                            <li key={index}>
                                <Link 
                                    href={`/categories/${cat.slug}`} 
                                    onClick={() => setIsMenuOpen(false)} 
                                    className="block py-1 text-gray-600 hover:text-emerald-600"
                                >
                                    {cat.icon} {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}