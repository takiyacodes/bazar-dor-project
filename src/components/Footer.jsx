export default function Footer() {
    return (
        <footer className="w-full bg-[#f8fafc] text-gray-500 py-6 border-t border-gray-200 text-xs sm:text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                
                {/* Left Text */}
                <p className="text-gray-700 font-medium">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                {/* Right Text */}
                <p className="text-gray-500">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
                </p>

            </div>
        </footer>
    );
}