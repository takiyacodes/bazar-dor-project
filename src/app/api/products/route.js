



import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // সম্পূর্ণ এবং নিখুঁত ফলব্যাক ডেটা
    const products = [
        // চাল (chal)
        { id: 1, name: "স্বর্ণাদ্ধি চাল", category: "চাল", category_slug: "chal", price: "১৪৮ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "২.১%" }, emoji: "🌾" },
        { id: 2, name: "মিনিকেট চাল", category: "চাল", category_slug: "chal", price: "৯৯ টাকা", unit: "প্রতি কেজি", change: { dir: "down", pct: "২.৯%" }, emoji: "🌾" },
        { id: 3, name: "নাজির চাল", category: "চাল", category_slug: "chal", price: "৭৪ টাকা", unit: "প্রতি কেজি", change: { dir: "flat", pct: "০.০%" }, emoji: "🌾" },
        { id: 4, name: "বাসমতি চাল", category: "চাল", category_slug: "chal", price: "১৩০ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "১.৫%" }, emoji: "🌾" },
        
        // ডাল (dal)
        { id: 5, name: "মসুর ডাল (বড়)", category: "ডাল", category_slug: "dal", price: "১৩২ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "২.১%" }, emoji: "🫘" },
        { id: 6, name: "মসুর ডাল (চিকন)", category: "ডাল", category_slug: "dal", price: "১৪৫ টাকা", unit: "প্রতি কেজি", change: { dir: "down", pct: "০.৮%" }, emoji: "🫘" },
        { id: 7, name: "মুগ ডাল", category: "ডাল", category_slug: "dal", price: "১৬০ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "১.০%" }, emoji: "🫘" },

        // তেল (oil)
        { id: 8, name: "সয়াবিন তেল", category: "তেল", category_slug: "oil", price: "১৯২ টাকা", unit: "প্রতি লিটার", change: { dir: "up", pct: "২.১%" }, emoji: "🌻" },
        { id: 9, name: "পাম তেল", category: "তেল", category_slug: "oil", price: "১৬৮ টাকা", unit: "প্রতি লিটার", change: { dir: "up", pct: "২.৩%" }, emoji: "🌻" },
        { id: 10, name: "সরিষার তেল", category: "তেল", category_slug: "oil", price: "২২০ টাকা", unit: "প্রতি লিটার", change: { dir: "flat", pct: "০.০%" }, emoji: "🌻" },

        // সবজি (vegetables)
        { id: 11, name: "আলু (দেশি)", category: "সবজি", category_slug: "vegetables", price: "৫০ টাকা", unit: "প্রতি কেজি", change: { dir: "down", pct: "১.৫%" }, emoji: "🥬" },
        { id: 12, name: "পেঁয়াজ (দেশি)", category: "সবজি", category_slug: "vegetables", price: "১২০ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "৩.২%" }, emoji: "🥬" },
        { id: 13, name: "টমেটো", category: "সবজি", category_slug: "vegetables", price: "৯০ টাকা", unit: "প্রতি কেজি", change: { dir: "down", pct: "২.০%" }, emoji: "🥬" },
        { id: 14, name: "পটল", category: "সবজি", category_slug: "vegetables", price: "৬০ টাকা", unit: "প্রতি কেজি", change: { dir: "flat", pct: "০.০%" }, emoji: "🥬" },

        // মাছ (fish)
        { id: 15, name: "রুই মাছ", category: "মাছ", category_slug: "fish", price: "৩৫০ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "৩.০%" }, emoji: "🐟" },
        { id: 16, name: "কাতলা মাছ", category: "মাছ", category_slug: "fish", price: "৩৮০ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "১.২%" }, emoji: "🐟" },
        { id: 17, name: "তেলাপিয়া মাছ", category: "মাছ", category_slug: "fish", price: "২২০ টাকা", unit: "প্রতি কেজি", change: { dir: "down", pct: "১.০%" }, emoji: "🐟" },

        // মাংস (meat)
        { id: 18, name: "গরুর মাংস", category: "মাংস", category_slug: "meat", price: "৭৮০ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "১.০%" }, emoji: "🥩" },
        { id: 19, name: "খাসির মাংস", category: "মাংস", category_slug: "meat", price: "১১৫০ টাকা", unit: "প্রতি কেজি", change: { dir: "flat", pct: "০.০%" }, emoji: "🥩" },
        { id: 20, name: "ব্রয়লার মুরগি", category: "মাংস", category_slug: "meat", price: "১৯০ টাকা", unit: "প্রতি কেজি", change: { dir: "down", pct: "২.৫%" }, emoji: "🥩" },
        { id: 21, name: "দেশি মুরগি", category: "মাংস", category_slug: "meat", price: "৫৫০ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "১.৮%" }, emoji: "🥩" },

        // ডিম-দুধ (eggs)
        { id: 22, name: "লাল ডিম (হাঁস/মুরগি)", category: "ডিম-দুধ", category_slug: "eggs", price: "১৫০ টাকা", unit: "প্রতি ডজন", change: { dir: "up", pct: "০.৫%" }, emoji: "🥚" },
        { id: 23, name: "হাঁসের ডিম", category: "ডিম-দুধ", category_slug: "eggs", price: "১৮০ টাকা", unit: "প্রতি ডজন", change: { dir: "flat", pct: "০.০%" }, emoji: "🥚" },
        { id: 24, name: "গরুর তরল দুধ", category: "ডিম-দুধ", category_slug: "eggs", price: "১১০ টাকা", unit: "প্রতি লিটার", change: { dir: "up", pct: "১.০%" }, emoji: "🥛" },

        // মসলা (spices)
        { id: 25, name: "রসুন", category: "মসলা", category_slug: "spices", price: "১৮০ টাকা", unit: "প্রতি কেজি", change: { dir: "down", pct: "২.০%" }, emoji: "🧄" },
        { id: 26, name: "আদা (আমদানি)", category: "মসলা", category_slug: "spices", price: "২৪০ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "১.৫%" }, emoji: "🧄" },
        { id: 27, name: "শুকনা মরিচ", category: "মসলা", category_slug: "spices", price: "৩২০ টাকা", unit: "প্রতি কেজি", change: { dir: "flat", pct: "০.০%" }, emoji: "🌶️" },
        { id: 28, name: "হলুদ গুঁড়া", category: "মসলা", category_slug: "spices", price: "২৮০ টাকা", unit: "প্রতি কেজি", change: { dir: "up", pct: "০.৮%" }, emoji: "🟡" }
    ];

    if (!category) {
        return NextResponse.json(products);
    }

    const catQuery = category.toLowerCase().trim();

    // ক্যাটাগরি অনুযায়ী ফিল্টারিং
    const filtered = products.filter(p => {
        const slugMatch = (p.category_slug || "").toLowerCase() === catQuery;
        const catMatch = (p.category || "").toLowerCase().includes(catQuery);
        return slugMatch || catMatch;
    });

    return NextResponse.json(filtered);
}