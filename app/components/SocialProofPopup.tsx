"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ShoppingCart, X } from "lucide-react";

interface SocialProofItem {
  id: string;
  customerName: string;
  location: string;
  productName: string;
  timeAgo: string;
  image: string;
}

const mockPurchases: SocialProofItem[] = [
  {
    id: "sp-01",
    customerName: "Anh Minh",
    location: "Ngô Quyền, Hải Phòng",
    productName: "Bóng đèn LED Bulb 20W Rạng Đông",
    timeAgo: "2 phút trước",
    image: "/images/LED-buildtru-nhomnhua20W.jpg",
  },
  {
    id: "sp-02",
    customerName: "Chị Thu",
    location: "Vĩnh Bảo, Hải Phòng",
    productName: "Ổ cắm đôi 3 chấu Sino S1830K",
    timeAgo: "7 phút trước",
    image: "/images/banner-ocam.png",
  },
  {
    id: "sp-03",
    customerName: "Anh Tuấn",
    location: "Lê Chân, Hải Phòng",
    productName: "Aptomat Chống giật RCCB Schneider 40A",
    timeAgo: "12 phút trước",
    image: "/images/congtacdoi2chieusino.png",
  },
  {
    id: "sp-04",
    customerName: "Anh Hoàng",
    location: "Hồng Bàng, Hải Phòng",
    productName: "Công tắc cảm ứng Tuya Smart Wifi 3 Nút",
    timeAgo: "18 phút trước",
    image: "/images/congtacdoi2chieusino.png",
  },
  {
    id: "sp-05",
    customerName: "Chú Đức",
    location: "An Dương, Hải Phòng",
    productName: "Vòi sen tắm tăng áp Mặt inox 304",
    timeAgo: "25 phút trước",
    image: "/images/banner-premium-plumbing-3.png",
  },
];

export default function SocialProofPopup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Lần đầu hiện sau 4 giây
    const firstTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Luân phiên hiện mỗi 16 giây
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockPurchases.length);
        setIsVisible(true);
      }, 1000);
    }, 16000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !isVisible) return null;

  const current = mockPurchases[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-[320px] bg-white rounded-2xl p-3.5 shadow-2xl border border-gray-100 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans">
      <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl p-1 shrink-0 flex items-center justify-center relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.image} alt="" className="w-full h-full object-contain" />
        <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white">
          <CheckCircle2 size={10} />
        </span>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
            <ShoppingCart size={10} className="text-blue-600" /> Vừa đặt hàng thành công
          </span>
          <span className="text-[9px] text-gray-400">{current.timeAgo}</span>
        </div>

        <p className="text-xs font-bold text-gray-800 truncate mt-0.5">
          {current.customerName} <span className="font-normal text-gray-500 text-[10px]">({current.location})</span>
        </p>

        <p className="text-[11px] text-blue-600 font-medium truncate">{current.productName}</p>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="text-gray-300 hover:text-gray-500 p-1 rounded-lg transition shrink-0"
        title="Tắt thông báo"
      >
        <X size={14} />
      </button>
    </div>
  );
}
