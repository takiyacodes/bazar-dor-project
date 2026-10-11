"use client";
import React from 'react';

export default function MarqueeTicker({ products }) {
  const displayList = products && products.length > 0 ? products : [
    { id: 1, name: "স্বর্ণাচল চাল", price: "৫৮", unit: "কেজি", emoji: "🌾", change: 2.5 },
    { id: 2, name: "মিনিকেট চাল", price: "৯৯", unit: "কেজি", emoji: "🌾", change: -1.9 },
    { id: 3, name: "বাটিম সাইজ চাল", price: "৬৬", unit: "কেজি", emoji: "🌾", change: 3.1 },
    { id: 4, name: "মসুর ডাল", price: "১৪২", unit: "কেজি", emoji: "🫘", change: 1.9 }
  ];

  return (
    <div className="bg-blue-50/70 border-y border-blue-100 py-2.5 overflow-hidden whitespace-nowrap relative flex items-center shadow-inner">
      <div className="animate-marquee flex items-center gap-6 text-xs sm:text-sm font-semibold text-gray-700">
        {[...displayList, ...displayList, ...displayList].map((item, idx) => {
          const changeVal = Number(item.change || 1.5);
          const isUp = changeVal >= 0;
          return (
            <div key={idx} className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm shrink-0">
              <span>{item.emoji || "🛒"}</span>
              <span className="font-medium text-gray-800">{item.name || item.title}:</span>
              <span className="font-bold text-gray-900">{item.price || item.currentPrice} টাকা/{item.unit || "কেজি"}</span>
              <span className={`flex items-center gap-0.5 text-xs font-bold ${isUp ? 'text-red-600' : 'text-emerald-600'}`}>
                {isUp ? "▲" : "▼"} {Math.abs(changeVal)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}