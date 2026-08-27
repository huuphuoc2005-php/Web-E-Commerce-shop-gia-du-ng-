"use client";
import { useCart } from "@/lib/cart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react"; // Import Icon

export default function CartIcon() {
  const items = useCart((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  // Tính tổng số lượng hàng (ví dụ 2 bóng đèn + 1 ống nước = 3)
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link 
      href="/cart" 
      className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
    >
      {/* Icon giỏ hàng chuyên nghiệp */}
      <ShoppingCart className="w-6 h-6" />
      
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm border-2 border-white">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}