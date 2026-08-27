"use client";

import { useCart, CartItem } from "@/lib/cart";
import { toast } from "sonner"; // Import hàm thông báo
import { ShoppingBag } from "lucide-react"; // Import Icon túi hàng

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    const itemToAdd: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selected: true,
    };

    addItem(itemToAdd);
    
    // THÔNG BÁO CHUYÊN NGHIỆP
    toast.success(`${product.name} đã vào giỏ hàng!`, {
      description: "Bạn có thể xem lại trong giỏ hàng.",
      action: {
        label: "Xem giỏ",
        onClick: () => window.location.href = "/cart"
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md transition transform active:scale-95 flex items-center justify-center gap-2"
    >
      <ShoppingBag className="w-5 h-5" /> {/* Thêm icon vào nút */}
      Thêm vào giỏ
    </button>
  );
}