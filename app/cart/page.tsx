"use client";

import { useCart } from "@/lib/cart";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();

  // Tính tổng tiền
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <ShoppingBag className="text-blue-600" /> Giỏ hàng của bạn
        </h1>

        {items.length === 0 ? (
          // TRƯỜNG HỢP GIỎ HÀNG TRỐNG
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-blue-50 text-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Giỏ hàng đang trống
            </h2>
            <p className="text-gray-500 mb-8">
              Bạn chưa thêm sản phẩm nào. Hãy dạo một vòng cửa hàng nhé!
            </p>
            <Link
              href="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg inline-flex items-center gap-2"
            >
              Tiếp tục mua sắm <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          // TRƯỜNG HỢP CÓ HÀNG
          <div className="flex flex-col lg:flex-row gap-8">
            {/* DANH SÁCH SẢN PHẨM (BÊN TRÁI) */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <span className="font-bold text-gray-700">Sản phẩm</span>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex gap-4 md:gap-6 items-center hover:bg-gray-50 transition">

                    {/* Ảnh sản phẩm */}
                    <div className="w-20 h-20 md:w-24 md:h-24 border border-gray-200 rounded-xl overflow-hidden flex-shrink-0 bg-white p-2">
                      {item.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-bold">
                          NO IMG
                        </div>
                      )}
                    </div>

                    {/* Thông tin & Giá */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-red-600 font-bold">
                        {new Intl.NumberFormat("vi-VN").format(item.price)}₫
                      </p>
                    </div>

                    {/* Bộ chỉnh số lượng */}
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white h-9">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                        }}
                        className="px-2 text-gray-600 hover:bg-gray-100 h-full rounded-l-lg disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 text-gray-600 hover:bg-gray-100 h-full rounded-r-lg"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Nút Xóa */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-2 transition ml-2"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* TỔNG TIỀN & THANH TOÁN (BÊN PHẢI) */}
            <div className="lg:w-96">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="font-bold text-gray-800 mb-6 text-lg">Thông tin đơn hàng</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính ({items.length} món):</span>
                    <span className="font-medium">{new Intl.NumberFormat("vi-VN").format(totalPrice)}₫</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                  <div className="h-px bg-gray-100 my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{new Intl.NumberFormat("vi-VN").format(totalPrice)}₫</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2"
                >
                  Thanh toán ngay <ArrowRight size={20} />
                </Link>

                <p className="text-xs text-center text-gray-400 mt-4">
                  Cam kết bảo mật thông tin khách hàng 100%
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}