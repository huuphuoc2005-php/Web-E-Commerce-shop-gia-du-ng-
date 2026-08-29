"use client";

import Link from "next/link";
import { Search, ShoppingCart, Phone, MapPin, Menu, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import { useTypewriter } from "../hooks/useTypewrite";

interface HeaderProps {
  settings?: {
    storeName?: string;
    phone?: string;
    address?: string;
    email?: string;
    bannerAnnouncement?: string | null;
  } | null;
}

export default function Header({ settings }: HeaderProps) {
  const items = useCart((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const placeholderText = useTypewriter({
    words: [
      "Bạn muốn tìm gì hôm nay?",
      "Ví dụ: Bóng đèn Rạng Đông...",  
    ],
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 2000
  });

  useEffect(() => { setMounted(true); }, []);

  const totalQuantity = mounted ? items.reduce((total, item) => total + item.quantity, 0) : 0;
  const storePhone = settings?.phone || "0869001296";
  const storeAddress = settings?.address || "103, QL37 TT Vĩnh Bảo, tp Hải Phòng";
  const storeName = settings?.storeName || "PHÚ LÂM STORE";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Thông báo Banner nếu Admin cài đặt */}
      {settings?.bannerAnnouncement && (
        <div className="bg-amber-400 text-amber-950 font-bold text-xs py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
          <span>📢 {settings.bannerAnnouncement}</span>
        </div>
      )}

      {/* Tầng 1: Top Bar - Thông tin liên hệ */}
      <div className="bg-blue-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={14} /> Hotline: {storePhone}</span>
            <span className="hidden md:flex items-center gap-1"><MapPin size={14} /> {storeAddress}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/tracking" className="hover:text-yellow-400 transition font-medium text-blue-200">Tra cứu đơn hàng</Link>
            <Link href="/admin" className="hover:text-yellow-400 transition">Kênh người bán</Link>
          </div>
        </div>
      </div>

      {/* Tầng 2: Main Header - Logo & Search */}
      <div className="py-4 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-8">
          
          {/* Logo 2 Màu Đẹp Mắt */}
          {(() => {
            const nameParts = storeName.trim().split(" ");
            const lastPart = nameParts.length > 1 ? nameParts.pop() : "";
            const firstPart = nameParts.join(" ");
            return (
              <Link href="/" className="text-3xl md:text-4xl font-black text-blue-700 flex-shrink-0 tracking-tighter uppercase">
                {firstPart} {lastPart ? <span className="text-orange-500">{lastPart}</span> : null}
              </Link>
            );
          })()}

          {/* Thanh tìm kiếm (Desktop) */}
          <form action="/" method="GET" className="flex-1 hidden md:flex relative group">
            <input 
              name="query"
              className="w-full border-2 border-gray-50 bg-gray-50 text-black rounded-full py-2.5 pl-5 pr-12 outline-none focus:border-blue-500 focus:bg-white transition-all"
              placeholder={placeholderText}
            />
            <button type="submit" className="absolute right-1 top-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition">
              <Search size={20} />
            </button>
          </form>

          {/* Tài khoản, Giỏ hàng & Mobile Menu */}
          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
             {/* Nút Tài khoản */}
             <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full transition group" title="Tài khoản cá nhân">
                <User className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
             </Link>

             {/* Nút Giỏ hàng */}
             <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition group">
                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {totalQuantity}
                  </span>
                )}
             </Link>
             
             {/* Nút Menu Mobile (Chỉ hiện trên điện thoại) */}
             <button className="md:hidden p-2 text-gray-700">
               <Menu size={28} />
             </button>
          </div>
        </div>

        {/* Thanh tìm kiếm (Mobile - Hiện ra khi màn hình nhỏ) */}
        <div className="md:hidden mt-3">
           <form action="/" method="GET" className="relative">
             <input 
                name="query"
                className="w-full border border-gray-200 rounded-lg py-2 pl-4 pr-10 outline-none focus:border-blue-500"
                placeholder= {placeholderText}
             />
             <button className="absolute right-2 top-2 text-gray-500">
               <Search size={20} />
             </button>
           </form>
        </div>
      </div>
    </header>
  );
}