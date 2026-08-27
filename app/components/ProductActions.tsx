"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { ShoppingCart, Minus, Plus, Zap } from "lucide-react";

type ProductActionPayload = {
    id: string;
    name: string;
    price: number;
    image?: string | null;
};

export default function ProductActions({ product }: { product: ProductActionPayload }){
    const [quantity, setQuantity] = useState(1);
    const addItem = useCart((state) => state.addItem);

    const handleQuantity = (type: "minus" | "plus") => {
        if (type === "minus" && quantity > 1) {
            setQuantity((prev) => prev - 1);
            return;
        }
        if (type === "plus") {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            selected: true,
        })
        toast.success(`Đã thêm ${quantity} x ${product.name} vào giỏ!`);
    };
    return(
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Số lượng:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => handleQuantity("minus")} className="p-2 hover:bg-gray-100 transition text-gray-600"><Minus size={16}/></button>
                    <span className="w-10 text-center font-bold text-gray-800">{quantity}</span>
                    <button onClick={() => handleQuantity("plus")} className="p-2 hover:bg-gray-100 transition text-gray-600"><Plus size={16}/>
                    </button>
                </div>
            </div>
            <div className="flex gap-4">
                <button onClick={handleAddToCart} className="flex-1 bg-blue-100 text-blue-700 border border-blue-200 py-3 rounded-xl font-bold hover:bg-blue-200 transition flex items-center justify-center gap-2">
                    <ShoppingCart size={20} />
                    Thêm vào giỏ
                </button>

                <button onClick={() => {
                    handleAddToCart();
                    window.location.href = "/cart";
                }} className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2">
                    <Zap size={20}/>
                    Mua ngay
                </button>
            </div>
        </div>
    );
}