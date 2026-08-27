"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { toast } from "sonner";
import { Plus, Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCart((state) => state.addItem);
  const toggleWishlist = useWishlist((state) => state.toggleWishlist);
  const isInWishlist = useWishlist((state) => state.isInWishlist);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(isInWishlist(product.id));
  }, [isInWishlist, product.id]);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const added = toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      category: product.category,
    });

    setIsLiked(added);
    if (added) {
      toast.success(`Đã thêm vào danh sách yêu thích 💖`, { position: "bottom-right" });
    } else {
      toast.info(`Đã xóa khỏi danh sách yêu thích`, { position: "bottom-right" });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selected: true,
    });
    
    toast.success(`Đã thêm ${product.name}`, { position: "bottom-right" });
  };

  return (
    <Link 
      href={`/product/${product.id}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Label HOT */}
      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
        HOT
      </span>

      {/* Nút Thả tim Yêu thích */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-rose-500 shadow-sm transition z-10"
        title="Thêm vào yêu thích"
      >
        <Heart size={16} fill={isLiked ? "#f43f5e" : "none"} className={isLiked ? "text-rose-500" : ""} />
      </button>

      {/* KHUNG ẢNH SẢN PHẨM */}
      <div className="aspect-square bg-white relative overflow-hidden flex items-center justify-center">
         {/* Kiểm tra: Nếu có ảnh thì hiện ảnh, không thì hiện chữ tạm */}
         {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            />
         ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs p-4 text-center">
               NO IMG
            </div>
         )}
      </div>

      {/* Thông tin */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
          {product.category?.name || "Sản phẩm"}
        </div>
        
        <h3 className="text-gray-800 font-medium text-sm line-clamp-2 mb-2 flex-1 group-hover:text-blue-600 transition">
          {product.name}
        </h3>

        <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-red-600 font-bold text-lg">
                {new Intl.NumberFormat("vi-VN").format(product.price)}
                <span className="text-xs align-top">₫</span>
              </span>
              <span className="text-[10px] text-gray-400">Đã bán 120</span>
           </div>

           {/* Nút thêm nhanh */}
           <button onClick={handleAddToCart} className="bg-blue-50 text-blue-600 w-9 h-9 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
             <Plus size={20} />
           </button>
        </div>
      </div>
    </Link>
  );
}