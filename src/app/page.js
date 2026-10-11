

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bazaarData = [
      { id: 1, name: "স্বর্ণাঞ্চি চাল", price: "১৪৮", unit: "প্রতি কেজি", emoji: "🍚", category: "চাল", change: 2.1 },
      { id: 2, name: "মিনিকেট চাল", price: "৯৯", unit: "প্রতি কেজি", emoji: "🍚", category: "চাল", change: -1.3 },
      { id: 3, name: "নাজির চাল", price: "৭৪", unit: "প্রতি কেজি", emoji: "🍚", category: "চাল", change: 0.0 },
      { id: 4, name: "বাইলট সাইজ চাল", price: "৬৬", unit: "প্রতি কেজি", emoji: "🍚", category: "চাল", change: 1.5 },
      { id: 5, name: "মসুর ডাল", price: "১৪২", unit: "প্রতি কেজি", emoji: "🫘", category: "ডাল", change: 2.3 },
      { id: 6, name: "মুগ ডাল", price: "১৬৫", unit: "প্রতি কেজি", emoji: "🫘", category: "ডাল", change: 0.0 },
      { id: 7, name: "ছোলা", price: "১২০", unit: "প্রতি কেজি", emoji: "🫘", category: "ডাল", change: -1.4 },
      { id: 8, name: "আমন ডাল (থ্রোসাসিলা)", price: "১৪৬", unit: "প্রতি কেজি", emoji: "🫘", category: "ডাল", change: 2.1 },
      { id: 9, name: "সরিষার তেল", price: "১৯২", unit: "প্রতি লিটার", emoji: "🛢️", category: "তেল", change: 2.6 },
      { id: 10, name: "পাম তেল", price: "১৬৮", unit: "প্রতি লিটার", emoji: "🛢️", category: "তেল", change: -1.2 },
      { id: 11, name: "সয়াবিন তেল", price: "২১৫", unit: "প্রতি লিটার", emoji: "🛢️", category: "তেল", change: 2.5 },
      { id: 12, name: "পেঁয়াজ", price: "৪৮", unit: "প্রতি কেজি", emoji: "🧅", category: "সবজি", change: 12.5 },
      { id: 13, name: "কাঁচামরিচ", price: "৯২", unit: "প্রতি কেজি", emoji: "🌶️", category: "সবজি", change: -12.4 },
      { id: 14, name: "বেগুন", price: "৮৮", unit: "প্রতি কেজি", emoji: "🍆", category: "সবজি", change: 2.6 },
      { id: 15, name: "টেঁটোস", price: "৩৮", unit: "প্রতি কেজি", emoji: "🥔", category: "সবজি", change: 0.0 },
      { id: 16, name: "রুই মাছ", price: "৪৬", unit: "প্রতি কেজি", emoji: "🐟", category: "মাছ", change: 4.0 },
      { id: 17, name: "তেলাপিয়া", price: "৩৬", unit: "প্রতি কেজি", emoji: "🐟", category: "মাছ", change: 0.0 },
      { id: 18, name: "ইলিশ মাছ", price: "১,৮৫০", unit: "প্রতি কেজি", emoji: "🐟", category: "মাছ", change: 9.8 },
      { id: 19, name: "কাতলা মাছ", price: "৪৭", unit: "প্রতি কেজি", emoji: "🐟", category: "মাছ", change: -4.4 },
      { id: 20, name: "চিংড়ি মাছ", price: "৭৩০", unit: "প্রতি কেজি", emoji: "🦐", category: "মাছ", change: 15.6 },
      { id: 21, name: "মুরগির মাংস", price: "২২৫", unit: "প্রতি কেজি", emoji: "🍗", category: "মাংস", change: -4.3 },
      { id: 22, name: "গরুর মাংস", price: "৯৫০", unit: "প্রতি কেজি", emoji: "🥩", category: "মাংস", change: -1.2 },
      { id: 23, name: "খাসির মাংস", price: "১,২৫০", unit: "প্রতি কেজি", emoji: "🥩", category: "মাংস", change: 0.0 },
      { id: 24, name: "হাঁসের মাংস", price: "২৮৫", unit: "প্রতি কেজি", emoji: "🦆", category: "মাংস", change: -0.8 },
      { id: 25, name: "ডিম", price: "১৪৮", unit: "প্রতি ডজন", emoji: "🥚", category: "ডিম-দুধ", change: 3.9 },
      { id: 26, name: "দুধ", price: "১০২", unit: "প্রতি লিটার", emoji: "🥛", category: "ডিম-দুধ", change: 2.0 },
      { id: 27, name: "দই", price: "৯২", unit: "প্রতি লিটার", emoji: "🥛", category: "ডিম-দুধ", change: 0.0 },
      { id: 28, name: "মাখন", price: "১৪৫", unit: "প্রতি পিস", emoji: "🧈", category: "ডিম-দুধ", change: 3.7 },
      { id: 29, name: "আদা", price: "৮৫", unit: "প্রতি কেজি", emoji: "🫚", category: "মসলা", change: 3.0 },
      { id: 30, name: "রসুন", price: "১২৫", unit: "প্রতি কেজি", emoji: "🧄", category: "মসলা", change: -9.8 },
      { id: 31, name: "মরিচ গুঁড়া", price: "২৫৫", unit: "প্রতি কেজি", emoji: "🌶️", category: "মসলা", change: -2.0 },
      { id: 32, name: "ধনেপাতা গুঁড়া", price: "২৬৫", unit: "প্রতি কেজি", emoji: "🌿", category: "মসলা", change: -1.5 },
      { id: 33, name: "আলু", price: "৬০", unit: "প্রতি কেজি", emoji: "🥔", category: "সবজি", change: -3.2 }
    ];

    setProducts(bazaarData);
    setLoading(false);
  }, []);

  const scrollToProducts = (e) => {
    e.preventDefault();
    const section = document.getElementById("সব-পণ্য");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const risers = [...products]
    .filter(item => Number(item.change) > 0)
    .sort((a, b) => Number(b.change) - Number(a.change))
    .slice(0, 6);

  const fallers = [...products]
    .filter(item => Number(item.change) < 0)
    .sort((a, b) => Number(a.change) - Number(b.change))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* 1. Marquee Ticker Section */}
      <div className="bg-blue-50/70 border-y border-blue-100 py-2.5 overflow-hidden whitespace-nowrap relative flex items-center shadow-inner">
        <div className="animate-marquee flex items-center gap-6 text-xs sm:text-sm font-semibold text-gray-700">
          {[...products, ...products, ...products].map((item, idx) => {
            const changeVal = Number(item.change || 0);
            const isUp = changeVal >= 0;
            return (
              <div key={idx} className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm shrink-0">
                <span>{item.emoji}</span>
                <span className="font-medium text-gray-800">{item.name}:</span>
                <span className="font-bold text-gray-900">{item.price} টাকা/{item.unit}</span>
                <span className={`flex items-center gap-0.5 text-xs font-bold ${isUp ? 'text-red-600' : 'text-emerald-600'}`}>
                  {isUp ? "▲" : "▼"} {Math.abs(changeVal)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* 2. Hero Section */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="max-w-xl text-center md:text-left">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">
              শনিবার, ১১ অক্টোবর, ২০২৬
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a
              href="#সব-পণ্য"
              onClick={scrollToProducts}
              className="inline-flex items-center justify-center bg-[#1e4630] hover:bg-[#163524] text-white font-medium text-sm sm:text-base px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-emerald-50 p-6 rounded-3xl border border-amber-100/60 flex items-center justify-center w-full md:w-[320px] lg:w-[360px] h-[260px] shrink-0 shadow-inner overflow-hidden">
            <Image
              src="/bazar-hero.png"
              alt="Bazar Hero"
              width={300}
              height={300}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">বাজারের তথ্য লোড হচ্ছে...</div>
        ) : (
          <>
            {/* Section A — আজ দাম বেড়েছে ▲ */}
            {risers.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>আজ দাম বেড়েছে</span>
                    <span className="text-red-600 text-lg">▲</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {risers.map((product, idx) => (
                    <Link
                      key={product.id || idx}
                      href={`/product/${product.id}`}
                      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-3xl group-hover:scale-110 transition-transform">{product.emoji}</span>
                          <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full flex items-center gap-0.5">
                            ▲ {Math.abs(product.change)}%
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                        <p className="text-xs text-gray-400 mb-4">{product.unit}</p>
                      </div>
                      <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium">আজকের দাম</span>
                        <span className="text-base font-extrabold text-gray-900">{product.price} টাকা</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Section B — আজ দাম কমেছে ▼ */}
            {fallers.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>আজ দাম কমেছে</span>
                    <span className="text-emerald-600 text-lg">▼</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {fallers.map((product, idx) => (
                    <Link
                      key={product.id || idx}
                      href={`/product/${product.id}`}
                      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-3xl group-hover:scale-110 transition-transform">{product.emoji}</span>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-0.5">
                            ▼ {Math.abs(product.change)}%
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                        <p className="text-xs text-gray-400 mb-4">{product.unit}</p>
                      </div>
                      <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium">আজকের দাম</span>
                        <span className="text-base font-extrabold text-gray-900">{product.price} টাকা</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Section C — সব পণ্য */}
            <section id="সব-পণ্য" className="scroll-mt-28">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">সব পণ্য</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">বাজারদর — প্রয়োজনীয় পণ্যের দাম এক নজরে</p>
                </div>
                <span className="text-xs sm:text-sm font-semibold bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl shadow-xs text-gray-700">
                  মোট {products.length} টি পণ্য দেখানো হচ্ছে
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product, idx) => {
                  const changeVal = Number(product.change || 0);
                  const isUp = changeVal > 0;
                  const isFlat = changeVal === 0;

                  return (
                    <Link
                      key={product.id || idx}
                      href={`/product/${product.id}`}
                      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-3xl group-hover:scale-110 transition-transform">{product.emoji}</span>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-0.5 ${
                            isFlat ? 'text-gray-600 bg-gray-100' : isUp ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50'
                          }`}>
                            {isFlat ? "— ০.০%" : isUp ? `▲ ${Math.abs(changeVal)}%` : `▼ ${Math.abs(changeVal)}%`}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-emerald-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-4">{product.unit}</p>
                      </div>
                      <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium">আজকের দাম</span>
                        <span className="text-base font-extrabold text-gray-900">{product.price} টাকা</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
}

