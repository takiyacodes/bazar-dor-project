
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useSession, authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    setLoading(true);
    try {
      await authClient.updateUser({
        name: name,
      }, {
        onSuccess: () => {
          toast.success("প্রফাইল সফলভাবে আপডেট হয়েছে!");
          refetch(); // সেশন ডাটা রিফ্রেশ করার জন্য
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "আপডেট করতে সমস্যা হয়েছে");
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("কোথাও কোনো সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-3xl mx-auto px-4 py-10">
        
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">আমার প্রফাইল</h1>
          <p className="text-xs text-gray-500">আপনার অ্যাকাউন্টটি এখানে দেখুন ও আপডেট করুন।</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            {/* Next.js Image Component */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/20 shadow-xs">
              <Image
                src={session?.user?.image || "/user.jfif"}
                alt={session?.user?.name || "/User Picture"}
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{session?.user?.name || "User Name"}</h2>
              <p className="text-xs text-gray-500">{session?.user?.email || "user@example.com"}</p>
            </div>
          </div>

          <Button 
            onClick={handleSignOut}
            color="danger" 
            variant="bordered"
            className="border-red-200 text-red-600 hover:bg-red-50 font-medium px-4 py-2 rounded-xl text-xs"
          >
            ← সাইন আউট
          </Button>
        </div>

        {/* Update Form Section */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-sm font-bold text-gray-800 mb-4">তথ্য</h3>
          
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
            <Input 
              label="নাম" 
              name="name" 
              defaultValue={session?.user?.name || ""} 
              variant="bordered"
              className="w-full text-sm"
            />

            <Button 
              type="submit" 
              isLoading={loading}
              className="w-full bg-[#1e4630] hover:bg-[#163524] text-white font-medium py-3 rounded-xl shadow-xs transition cursor-pointer mt-2 text-sm"
            >
              আপডেট
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;