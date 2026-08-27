"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";

export default function QuickContactBar() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3 font-sans">
      {/* NÚT ZALO CHAT */}
      <a
        href="https://zalo.me/0869001296"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/40"
        title="Chat Zalo hỗ trợ kỹ thuật"
      >
        <MessageCircle size={24} />
        <span className="absolute right-14 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
          💬 Chat Zalo kỹ thuật
        </span>
      </a>

      {/* NÚT HOTLINE GỌI NGAY */}
      <a
        href="tel:0869001296"
        className="group relative bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/40 animate-pulse"
        title="Hotline: 0869.001.296"
      >
        <Phone size={22} />
        <span className="absolute right-14 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
          📞 Hotline: 0869.001.296
        </span>
      </a>

      {/* NÚT LÊN ĐẦU TRANG (BACK TO TOP) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="bg-gray-800/80 hover:bg-gray-900 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
          title="Lên đầu trang"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
