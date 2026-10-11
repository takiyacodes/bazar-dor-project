
"use client";
import React, { useEffect, useState } from 'react';
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signUp, signIn } from '../../../lib/auth-client';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const result = await res.json();
                if (Array.isArray(result)) {
                    setProductsList(result);
                } else if (result && Array.isArray(result.products)) {
                    setProductsList(result.products);
                } else if (result && Array.isArray(result.data)) {
                    setProductsList(result.data);
                }
            } catch (err) {
                console.error("API Fetch Error:", err);
                setProductsList([
                    { id: 1, name: "স্বর্ণাদ্ধি চাল", price: "১৪৮ টাকা", unit: "প্রতি কেজি", emoji: "🌾", change: "▲ ২.১%" },
                    { id: 2, name: "মিনিকেট চাল", price: "৯৯ টাকা", unit: "প্রতি কেজি", emoji: "🌾", change: "▼ ২.৯%" },
                    { id: 3, name: "মসুর ডাল", price: "১৩২ টাকা", unit: "প্রতি কেজি", emoji: "🫘", change: "▲ ২.১%" }
                ]);
            }
        };

        fetchProducts();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        if (data.password !== data.confirmPassword) {
            toast.error("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!");
            return;
        }

        setLoading(true);

        try {
            const { data: signUpData, error } = await signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (error) {
                toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
                setLoading(false);
            } else {
                toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে! অনুগ্রহ করে সাইন ইন করুন।", {
                    style: {
                        background: "#ecfdf5",
                        color: "#065f46",
                        border: "1px solid #a7f3d0",
                        fontWeight: "600",
                    },
                });
                
                setTimeout(() => {
                    router.push("/sign-in");
                }, 1000);
            }
        } catch (err) {
            console.error("Sign Up Error:", err);
            toast.error("কিছু একটা সমস্যা হয়েছে! আবার চেষ্টা করুন।");
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Google দিয়ে সাইন ইন করা সম্ভব হয়নি!");
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await signIn.social({
                provider: "github",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("GitHub দিয়ে সাইন ইন করা সম্ভব হয়নি!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            
            {/* Marquee Ticker Section */}
            <div className="bg-white border-y border-gray-100 py-2.5 overflow-hidden whitespace-nowrap relative flex items-center shadow-xs">
                <div className="flex animate-marquee items-center gap-6 text-xs sm:text-sm font-medium">
                    {[...productsList, ...productsList].map((item, idx) => {
                        const changeStr = String(item.change || "— ০.০%");
                        const isUp = changeStr.includes("▲");
                        const isDown = changeStr.includes("▼");

                        return (
                            <div key={idx} className="inline-flex items-center gap-2 px-3 py-1 shrink-0">
                                <span>{item.emoji || "🛒"}</span>
                                <span className="font-bold text-gray-800">{item.name}:</span>
                                <span className="text-gray-900 font-semibold">{item.price || item.currentPrice}/{item.unit || "কেজি"}</span>
                                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                                    isUp ? "text-red-600 bg-red-50" : isDown ? "text-emerald-600 bg-emerald-50" : "text-gray-500 bg-gray-50"
                                }`}>
                                    {changeStr}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Sign Up Form Section */}
            <div className="flex items-center justify-center px-4 py-10 sm:py-14">
                <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs w-full max-w-md">
                    
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-2xl font-extrabold text-gray-900 mb-1.5">অ্যাকাউন্ট তৈরি করুন</h1>
                        <p className="text-xs text-gray-500">বাজার হাটে সাইন আপ করে সব বিস্তারিত দাম দেখুন</p>
                    </div>

                    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        
                        <TextField
                            isRequired
                            name="name"
                            validate={(value) => {
                                if (value.length < 3) {
                                    return "Name must be at least 3 characters";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-xs font-semibold text-gray-700 mb-1 block">নাম</Label>
                            <Input placeholder="যেমন: রহিম উদ্দিন" className="w-full text-sm border-gray-200 rounded-xl" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-xs font-semibold text-gray-700 mb-1 block">ইমেইল</Label>
                            <Input placeholder="you@example.com" className="w-full text-sm border-gray-200 rounded-xl" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>

                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-xs font-semibold text-gray-700 mb-1 block">পাসওয়ার্ড</Label>
                            <Input placeholder="কমপক্ষে ৮ অক্ষর" className="w-full text-sm border-gray-200 rounded-xl" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>

                        <TextField
                            isRequired
                            name="confirmPassword"
                            type="password"
                        >
                            <Label className="text-xs font-semibold text-gray-700 mb-1 block">পাসওয়ার্ড নিশ্চিত করুন</Label>
                            <Input placeholder="আবার লিখুন" className="w-full text-sm border-gray-200 rounded-xl" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>

                        <Button 
                            type="submit" 
                            isDisabled={loading}
                            className="w-full bg-[#1e4630] hover:bg-[#163524] text-white font-medium py-3 rounded-xl shadow-xs transition cursor-pointer mt-2 text-sm disabled:opacity-50"
                        >
                            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
                        </Button>
                    </Form>

                    <div className="relative flex py-4 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-xs text-gray-400">অথবা</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button 
                            type="button" 
                            onClick={handleGoogleSignIn}
                            className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                        >
                            <span>🌐</span> Google দিয়ে চালিয়ে যান
                        </Button>

                        <Button 
                            type="button" 
                            onClick={handleGithubSignIn}
                            className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                        >
                            <span>💻</span> GitHub দিয়ে চালিয়ে যান
                        </Button>
                    </div>

                    <div className="mt-6 text-center text-xs text-gray-500 space-y-2">
                        <p>
                            অ্যাকাউন্ট আছে?{" "}
                            <Link href="/sign-in" className="text-emerald-700 font-semibold hover:underline">
                                সাইন ইন করুন
                            </Link>
                        </p>
                        <p>
                            <Link href="/" className="text-gray-400 hover:text-gray-600 transition">
                                ← হোম পেজে ফিরে যান
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;