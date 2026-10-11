

"use client";
import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Spinner } from "@heroui/react";
import MarqueeTicker from "../../../components/MarqueeTicker";

function CategoryContent() {
    const params = useParams();
    const slug = params?.slug;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("default");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const categoryNames = {
        chal: { name: "চাল", icon: "🌾" },
        dal: { name: "ডাল", icon: "🫘" },
        oil: { name: "তেল", icon: "🌻" },
        vegetables: { name: "সবজি", icon: "🥬" },
        fish: { name: "মাছ", icon: "🐟" },
        meat: { name: "মাংস", icon: "🥩" },
        eggs: { name: "ডিম-দুধ", icon: "🥚" },
        spices: { name: "মসলা", icon: "🧄" }
    };

    const currentCategory = categoryNames[slug] || { name: slug, icon: "📦" };

    useEffect(() => {
        let isMounted = true;
        if (!slug) return;

        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products?category=${slug}`);
                if (!res.ok) throw new Error("Fetch failed");
                
                const data = await res.json();
                if (isMounted) {
                    setProducts(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                if (isMounted) setProducts([]);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchCategoryProducts();

        return () => {
            isMounted = false;
        };
    }, [slug]);

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        const cleanStr = priceStr.toString().replace(/[^\d.]/g, "");
        return parseFloat(cleanStr) || 0;
    };

    const formatChange = (change) => {
        if (!change) return "— ০.০%";
        if (typeof change === "object") {
            const dirSymbol = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";
            return `${dirSymbol} ${change.pct || "০.০%"}`;
        }
        return change.toString();
    };

    const sortedProducts = [...products].sort((a, b) => {
        const priceA = parsePrice(a.price || a.currentPrice);
        const priceB = parsePrice(b.price || b.currentPrice);

        if (sortOrder === "low-high") return priceA - priceB;
        if (sortOrder === "high-low") return priceB - priceA;
        return 0;
    });

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Spinner size="lg" color="success" />
                <p className="text-sm font-medium text-gray-500">লোড হচ্ছে...</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-6xl font-black text-gray-800 mb-2">404</h1>
                <p className="text-lg font-semibold text-gray-700 mb-1">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি বা পেজটি খুঁজে পাওয়া যায়নি।</p>
                <p className="text-xs text-gray-400 mb-6">দুঃখিত, আপনি যে ক্যাটাগরি খুঁজছেন তা বিদ্যমান নয়।</p>
                <Link 
                    href="/" 
                    className="bg-[#1e4630] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#163524] transition shadow-xs"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    return (
        <div>
            <MarqueeTicker />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-xs mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl bg-emerald-50/60 p-3 rounded-2xl">
                            {currentCategory.icon}
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{currentCategory.name}</h1>
                            <p className="text-xs sm:text-sm text-gray-500">প্রতি পণ্যের আজকের দাম ও পরিবর্তন</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                            <span className="text-gray-500 font-medium">সাজান</span>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-medium text-gray-700 flex items-center gap-2 shadow-2xs hover:bg-gray-50 transition"
                            >
                                {sortOrder === "low-high" ? "দাম: কম থেকে বেশি" : sortOrder === "high-low" ? "দাম: বেশি থেকে কম" : "ডিফল্ট"}
                                <span className="text-xs">▼</span>
                            </button>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-35 flex flex-col">
                                <button 
                                    onClick={() => { setSortOrder("default"); setIsDropdownOpen(false); }}
                                    className={`text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 ${sortOrder === "default" ? "text-emerald-700 font-bold bg-emerald-50/50" : "text-gray-700"}`}
                                >
                                    ডিফল্ট
                                </button>
                                <button 
                                    onClick={() => { setSortOrder("low-high"); setIsDropdownOpen(false); }}
                                    className={`text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 ${sortOrder === "low-high" ? "text-emerald-700 font-bold bg-emerald-50/50" : "text-gray-700"}`}
                                >
                                    দাম: কম থেকে বেশি
                                </button>
                                <button 
                                    onClick={() => { setSortOrder("high-low"); setIsDropdownOpen(false); }}
                                    className={`text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 ${sortOrder === "high-low" ? "text-emerald-700 font-bold bg-emerald-50/50" : "text-gray-700"}`}
                                >
                                    দাম: বেশি থেকে কম
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-xs font-medium text-gray-500 mb-4">মোট {sortedProducts.length} টি পণ্য দেখানো হচ্ছে</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedProducts.map((product) => {
                        const formattedChange = formatChange(product.change);
                        const isUp = formattedChange.includes("▲");
                        const isDown = formattedChange.includes("▼");

                        return (
                            <Link 
                                key={product.id || product._id}
                                href={`/product/${product.id || product._id}`}
                                className="bg-white border border-gray-100/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4 group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3.5">
                                        <span className="text-3xl bg-emerald-50/60 p-3 rounded-2xl group-hover:scale-105 transition">
                                            {product.emoji || currentCategory.icon}
                                        </span>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-700 transition">
                                                {product.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 mt-0.5">{product.unit || "প্রতি কেজি"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between border-t border-gray-100 pt-3.5 mt-1">
                                    <div>
                                        <span className="text-[11px] text-gray-400 font-medium block mb-0.5">আজকের দাম</span>
                                        <span className="font-extrabold text-gray-900 text-base sm:text-lg">
                                            {product.price || product.currentPrice}
                                        </span>
                                    </div>
                                    
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                                        isUp ? "text-red-600 bg-red-50" :
                                        isDown ? "text-emerald-600 bg-emerald-50" :
                                        "text-gray-500 bg-gray-50"
                                    }`}>
                                        {formattedChange}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function CategoryPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[70vh] flex items-center justify-center">
                <Spinner size="lg" color="success" />
            </div>
        }>
            <CategoryContent />
        </Suspense>
    );
}