
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allProducts = [
      { id: 1, name: "স্বর্ণমাছি চাল", price: "১৪৮", unit: "প্রতি কেজি", emoji: "🍚", category: "চাল", change: 2.1, minPrice: "১৪৫", maxPrice: "১৫৫", avgPrice: "১৪৮" },
      { id: 2, name: "মিনিকেট চাল", price: "৯৯", unit: "প্রতি কেজি", emoji: "🍚", category: "চাল", change: -1.3, minPrice: "৯৫", maxPrice: "১০৫", avgPrice: "৯৯" },
      { id: 3, name: "নাজির চাল", price: "৭৪", unit: "প্রতি কেজি", emoji: "🍚", category: "চাল", change: 0.0, minPrice: "৭০", maxPrice: "৭৮", avgPrice: "৭৪" },
      { id: 4, name: "বাইলট সাইজ চাল", price: "৬৬", unit: "প্রতি কেজি", emoji: "🍚", category: "চাল", change: 1.5, minPrice: "৬৫", maxPrice: "৭৩", avgPrice: "৬৬" },
      { id: 5, name: "মসুর ডাল", price: "১৪২", unit: "প্রতি কেজি", emoji: "🫘", category: "ডাল", change: 2.3, minPrice: "১৩৮", maxPrice: "১৪৮", avgPrice: "১৪২" },
      { id: 6, name: "মুগ ডাল", price: "১৬৫", unit: "প্রতি কেজি", emoji: "🫘", category: "ডাল", change: 0.0, minPrice: "১৬০", maxPrice: "১৭০", avgPrice: "১৬৫" },
      { id: 7, name: "ছোলা", price: "১২০", unit: "প্রতি কেজি", emoji: "🫘", category: "ডাল", change: -1.4, minPrice: "১১৫", maxPrice: "১২৫", avgPrice: "১২০" },
      { id: 8, name: "আমন ডাল (থ্রোসাসিলা)", price: "১৪৬", unit: "প্রতি কেজি", emoji: "🫘", category: "ডাল", change: 2.1, minPrice: "১৪০", maxPrice: "১৫০", avgPrice: "১৪৬" },
      { id: 9, name: "সরিষার তেল", price: "১৯২", unit: "প্রতি লিটার", emoji: "🛢️", category: "তেল", change: 2.6, minPrice: "১৮৫", maxPrice: "২০৫", avgPrice: "১৯২" },
      { id: 10, name: "পাম তেল", price: "১৬৮", unit: "প্রতি লিটার", emoji: "🛢️", category: "তেল", change: -1.2, minPrice: "১৬০", maxPrice: "১৭৫", avgPrice: "১৬৮" },
      { id: 11, name: "সয়াবিন তেল", price: "২১৫", unit: "প্রতি লিটার", emoji: "🛢️", category: "তেল", change: 2.5, minPrice: "২০৮", maxPrice: "২২৫", avgPrice: "২১৫" },
      { id: 12, name: "পেঁয়াজ", price: "৪৮", unit: "প্রতি কেজি", emoji: "🧅", category: "সবজি", change: 12.5, minPrice: "৪৫", maxPrice: "৫৫", avgPrice: "৪৮" },
      { id: 13, name: "কাঁচামরিচ", price: "৯২", unit: "প্রতি কেজি", emoji: "🌶️", category: "সবজি", change: -12.4, minPrice: "৯০", maxPrice: "১১০", avgPrice: "৯২" },
      { id: 14, name: "বেগুন", price: "৮৮", unit: "প্রতি কেজি", emoji: "🍆", category: "সবজি", change: 2.6, minPrice: "৮০", maxPrice: "৯৫", avgPrice: "৮৮" },
      { id: 15, name: "টেঁটোস", price: "৩৮", unit: "প্রতি কেজি", emoji: "🥔", category: "সবজি", change: 0.0, minPrice: "৩৫", maxPrice: "৪২", avgPrice: "৩৮" },
      { id: 16, name: "রুই মাছ", price: "৪৬", unit: "প্রতি কেজি", emoji: "🐟", category: "মাছ", change: 4.0, minPrice: "৩৫০", maxPrice: "৪৫০", avgPrice: "৪০০" },
      { id: 17, name: "তেলাপিয়া", price: "৩৬", unit: "প্রতি কেজি", emoji: "🐟", category: "মাছ", change: 0.0, minPrice: "২২০", maxPrice: "২৬০", avgPrice: "২৪০" },
      { id: 18, name: "ইলিশ মাছ", price: "১,৮৫০", unit: "প্রতি কেজি", emoji: "🐟", category: "মাছ", change: 9.8, minPrice: "১,৬০০", maxPrice: "২,১০০", avgPrice: "১,৮৫০" },
      { id: 19, name: "কাতলা মাছ", price: "৪৭", unit: "প্রতি কেজি", emoji: "🐟", category: "মাছ", change: -4.4, minPrice: "৩৭০", maxPrice: "৪৬০", avgPrice: "৪১৫" },
      { id: 20, name: "চিংড়ি মাছ", price: "৭৩০", unit: "প্রতি কেজি", emoji: "🦐", category: "মাছ", change: 15.6, minPrice: "৬৫০", maxPrice: "৮৫০", avgPrice: "৭৩০" },
      { id: 21, name: "মুরগির মাংস", price: "২২৫", unit: "প্রতি কেজি", emoji: "🍗", category: "মাংস", change: -4.3, minPrice: "২১০", maxPrice: "২৪০", avgPrice: "২২৫" },
      { id: 22, name: "গরুর মাংস", price: "৯৫০", unit: "প্রতি কেজি", emoji: "🥩", category: "মাংস", change: -1.2, minPrice: "৯০০", maxPrice: "৯৮০", avgPrice: "৯৫০" },
      { id: 23, name: "খাসির মাংস", price: "১,২৫০", unit: "প্রতি কেজি", emoji: "🥩", category: "মাংস", change: 0.0, minPrice: "১,২০০", maxPrice: "১,৩০০", avgPrice: "১,২৫০" },
      { id: 24, name: "হাঁসের মাংস", price: "২৮৫", unit: "প্রতি কেজি", emoji: "🦆", category: "মাংস", change: -0.8, minPrice: "২৭০", maxPrice: "৩১০", avgPrice: "২৮৫" },
      { id: 25, name: "ডিম", price: "১৪৮", unit: "প্রতি ডজন", emoji: "🥚", category: "ডিম-দুধ", change: 3.9, minPrice: "১৪০", maxPrice: "১৫৫", avgPrice: "১৪৮" },
      { id: 26, name: "দুধ", price: "১০২", unit: "প্রতি লিটার", emoji: "🥛", category: "ডিম-দুধ", change: 2.0, minPrice: "৯৫", maxPrice: "১১০", avgPrice: "১০২" },
      { id: 27, name: "দই", price: "৯২", unit: "প্রতি লিটার", emoji: "🥛", category: "ডিম-দুধ", change: 0.0, minPrice: "৮৫", maxPrice: "১০০", avgPrice: "৯২" },
      { id: 28, name: "মাখন", price: "১৪৫", unit: "প্রতি পিস", emoji: "🧈", category: "ডিম-দুধ", change: 3.7, minPrice: "১৩৫", maxPrice: "১৫৫", avgPrice: "১৪৫" },
      { id: 29, name: "আদা", price: "৮৫", unit: "প্রতি কেজি", emoji: "🫚", category: "মসলা", change: 3.0, minPrice: "৮০", maxPrice: "৯৫", avgPrice: "৮৫" },
      { id: 30, name: "রসুন", price: "১২৫", unit: "প্রতি কেজি", emoji: "🧄", category: "মসলা", change: -9.8, minPrice: "১২০", maxPrice: "১৪০", avgPrice: "১২৫" },
      { id: 31, name: "মরিচ গুঁড়া", price: "২৫৫", unit: "প্রতি কেজি", emoji: "🌶️", category: "মসলা", change: -2.0, minPrice: "২৪০", maxPrice: "২৭০", avgPrice: "২৫৫" },
      { id: 32, name: "ধনেপাতা গুঁড়া", price: "২৬৫", unit: "প্রতি কেজি", emoji: "🌿", category: "মসলা", change: -1.5, minPrice: "২৫০", maxPrice: "২৮০", avgPrice: "২৬৫" },
      { id: 33, name: "আলু", price: "৬০", unit: "প্রতি কেজি", emoji: "🥔", category: "সবজি", change: -3.2, minPrice: "৫৫", maxPrice: "৬৫", avgPrice: "৬০" }
    ];

    setProductsList(allProducts);
    const matchedProduct = allProducts.find((item) => String(item.id) === String(productId));
    if (matchedProduct) {
      setProduct(matchedProduct);
    }
    setLoading(false);
  }, [productId]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500 font-medium">লোড হচ্ছে...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">পণ্যটি খুঁজে পাওয়া যায়নি</h2>
        <Link href="/" className="text-emerald-600 underline font-medium">হোমপেজে ফিরে যান</Link>
      </div>
    );
  }

  const changeVal = Number(product.change || 0);
  const isUp = changeVal >= 0;

  const marketList = [
    { name: "কারওয়ান বাজার", region: "ময়মনসিংহ", min: "৫১ টাকা", max: "৫৯ টাকা", avg: "৫২ টাকা" },
    { name: "নিউ বাজার", region: "রাজশাহী", min: "৬০ টাকা", max: "৬৯ টাকা", avg: "৬৪ টাকা" },
    { name: "কাপ্তানবাজার", region: "খুলনা", min: "৫০ টাকা", max: "৬৭ টাকা", avg: "৫৬.৫০ টাকা" },
    { name: "বাজারহাট", region: "রাজশাহী", min: "৬০ টাকা", max: "৬৮ টাকা", avg: "৬৪ টাকা" },
    { name: "ৌর বাজার", region: "ময়মনসিংহ", min: "৬০ টাকা", max: "৬৯ টাকা", avg: "৬৪.৫০ টাকা" },
    { name: "আমতলী বাজার", region: "চট্টগ্রাম", min: "৫২ টাকা", max: "৬৯ টাকা", avg: "৫২ টাকা" },
    { name: "তবলছড়ি বাজার", region: "খুলনা", min: "৫২ টাকা", max: "৬৯ টাকা", avg: "৬২.৫০ টাকা" },
    { name: "চৌরাস্তা বাজার", region: "সিলেট", min: "৬০ টাকা", max: "৭১ টাকা", avg: "৫৭ টাকা" },
    { name: "গ্রীন মার্কেট, মিরপুর", region: "ঢাকা", min: "৫৮ টাকা", max: "৭২ টাকা", avg: "৬৩.৫০ টাকা" },
    { name: "এলসিগ্রাম বাজার", region: "চট্টগ্রাম", min: "৬০ টাকা", max: "৭০ টাকা", avg: "৬২ টাকা" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. Marquee Ticker Only */}
      <div className="bg-blue-50/70 border-y border-blue-100 py-2 overflow-hidden whitespace-nowrap relative flex items-center shadow-inner">
        <div className="animate-marquee flex items-center gap-5 text-xs font-semibold text-gray-700">
          {[...productsList, ...productsList].map((item, idx) => {
            const ch = Number(item.change || 0);
            const up = ch >= 0;
            return (
              <div key={idx} className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-blue-200/60 shadow-2xs shrink-0">
                <span>{item.emoji}</span>
                <span className="text-gray-800">{item.name}</span>
                <span className="font-bold">{item.price} টাকা/কেজি</span>
                <span className={`flex items-center gap-0.5 text-xs font-bold ${up ? 'text-red-600' : 'text-emerald-600'}`}>
                  {up ? "▲" : "▼"} {Math.abs(ch)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>&gt;</span>
          <span className="hover:underline">{product.category}</span>
          <span>&gt;</span>
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </div>

        {/* Product Info Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="text-6xl sm:text-7xl bg-gray-50 p-4 rounded-2xl border border-gray-100">{product.emoji}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{product.name}</h1>
              <p className="text-xs font-medium text-gray-500 mb-2">{product.unit} — {product.category}</p>
              <p className="text-xs text-gray-400">গতকালকের তুলনায় আজ দাম পরিবর্তন হয়েছে</p>
            </div>
          </div>

          <div className="bg-gray-50/80 border border-gray-200/60 p-4 rounded-2xl text-right min-w-[180px]">
            <p className="text-[11px] font-semibold text-gray-500 mb-0.5">আজকের দাম</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{product.price} <span className="text-xs font-normal text-gray-500">টাকা/কেজি</span></p>
            <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${isUp ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50'}`}>
              {isUp ? "▲" : "▼"} {Math.abs(changeVal)}%
            </span>
          </div>
        </div>

        {/* Price Summary */}
        <div className="mb-10">
          <h2 className="text-base font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
              <p className="text-xs font-semibold text-gray-500 mb-1">সর্বনিম্ন দাম</p>
              <p className="text-xl font-extrabold text-emerald-600 mb-1">{product.minPrice} টাকা</p>
              <p className="text-[11px] text-gray-400">সবচেয়ে কম মূল্যের বাজার</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
              <p className="text-xs font-semibold text-gray-500 mb-1">সর্বাধিক দাম</p>
              <p className="text-xl font-extrabold text-red-600 mb-1">{product.maxPrice} টাকা</p>
              <p className="text-[11px] text-gray-400">সবচেয়ে বেশি মূল্যের বাজার</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
              <p className="text-xs font-semibold text-gray-500 mb-1">গড় বাজার দর</p>
              <p className="text-xl font-extrabold text-gray-900 mb-1">{product.avgPrice} টাকা</p>
              <p className="text-[11px] text-gray-400">প্রতি কেজি-এর হিসাব</p>
            </div>
          </div>
        </div>

        {/* Market Price Table */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
            <p className="text-xs text-gray-500 mt-0.5">বিভিন্ন স্থানীয় বাজারের বর্তমান পণ্যের মূল্য তালিকা</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-semibold text-gray-600">
                  <th className="py-3.5 px-6">বাজার</th>
                  <th className="py-3.5 px-6">বিভাগ</th>
                  <th className="py-3.5 px-6">সর্বনিম্ন</th>
                  <th className="py-3.5 px-6">সর্বাধিক</th>
                  <th className="py-3.5 px-6">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {marketList.map((m, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6 font-medium text-gray-900">{m.name}</td>
                    <td className="py-4 px-6 text-gray-500">{m.region}</td>
                    <td className="py-4 px-6 text-emerald-600 font-semibold">{m.min}</td>
                    <td className="py-4 px-6 text-red-600 font-semibold">{m.max}</td>
                    <td className="py-4 px-6 font-bold text-gray-900">{m.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
