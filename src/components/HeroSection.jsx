// "use client";
// import React from 'react';

// export default function HeroSection() {
//   const scrollToProducts = (e) => {
//     e.preventDefault();
//     const section = document.getElementById("সব-পণ্য");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
//       <div className="max-w-xl text-center md:text-left">
//         <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">
//           শনিবার, ১০ অক্টোবর, ২০২৬
//         </p>
        
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
//           আজকের বাজারের দাম এক নজরে
//         </h1>
        
//         <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
//           চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
//         </p>
        
//         <a 
//           href="#সব-পণ্য" 
//           onClick={scrollToProducts}
//           className="inline-flex items-center justify-center bg-[#1e4630] hover:bg-[#163524] text-white font-medium text-sm sm:text-base px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
//         >
//           সব পণ্য দেখুন
//         </a>
//       </div>

//       <div className="bg-gradient-to-br from-amber-50 to-emerald-50 p-8 rounded-3xl border border-amber-100/60 flex items-center justify-center w-full md:w-auto min-w-[240px] md:min-w-[280px] shadow-inner">
//         <span className="text-6xl md:text-7xl">🛒🍅</span>
//       </div>
//     </div>
//   );
// }



// "use client";
// import React from 'react';

// export default function HeroSection() {
//   const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
//   const months = [
//     "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", 
//     "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
//   ];

//   const today = new Date();
//   const dayName = days[today.getDay()];
  
//   const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
//   const toBengaliNumber = (num) => {
//     return num.toString().split("").map(digit => bengaliDigits[digit] !== undefined ? bengaliDigits[digit] : digit).join("");
//   };

//   const dayOfMonth = toBengaliNumber(today.getDate());
//   const monthName = months[today.getMonth()];
//   const yearNum = toBengaliNumber(today.getFullYear());

//   const currentDate = `${dayName}, ${dayOfMonth} ${monthName}, ${yearNum}`;

//   const scrollToProducts = (e) => {
//     e.preventDefault();
//     const section = document.getElementById("সব-পণ্য");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
//       <div className="max-w-xl text-center md:text-left">
//         <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">
//           {currentDate}
//         </p>
        
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
//           আজকের বাজারের দাম এক নজরে
//         </h1>
        
//         <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
//           চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
//         </p>
        
//         <a 
//           href="#সব-পণ্য" 
//           onClick={scrollToProducts}
//           className="inline-flex items-center justify-center bg-[#1e4630] hover:bg-[#163524] text-white font-medium text-sm sm:text-base px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
//         >
//           সব পণ্য দেখুন
//         </a>
//       </div>

//       <div className="bg-gradient-to-br from-amber-50 to-emerald-50 p-8 rounded-3xl border border-amber-100/60 flex items-center justify-center w-full md:w-auto min-w-[240px] md:min-w-[280px] shadow-inner">
//         <span className="text-6xl md:text-7xl">🛒🍅</span>
//       </div>
//     </div>
//   );
// }



"use client";
import React from 'react';

export default function HeroSection() {
  const currentDate = "রবিবার, ১১ অক্টোবর, ২০২৬";

  const scrollToProducts = (e) => {
    e.preventDefault();
    const section = document.getElementById("সব-পণ্য");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
      <div className="max-w-xl text-center md:text-left">
        <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">
          {currentDate}
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

      <div className="bg-gradient-to-br from-amber-50 to-emerald-50 p-8 rounded-3xl border border-amber-100/60 flex items-center justify-center w-full md:w-auto min-w-[240px] md:min-w-[280px] shadow-inner">
        <span className="text-6xl md:text-7xl">🛒🍅</span>
      </div>
    </div>
  );
}