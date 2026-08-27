"use client";

import { useState } from "react";
import { Zap, Calculator, ShoppingBag, ShieldCheck, CheckCircle2, RefreshCw } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export default function ElectricalCalculator() {
  const [area, setArea] = useState<number>(20);
  const [airCon, setAirCon] = useState<number>(1);
  const [waterHeater, setWaterHeater] = useState<number>(1);
  const [socketCount, setSocketCount] = useState<number>(4);
  const [cooker, setCooker] = useState<boolean>(false);

  const addItem = useCart((state) => state.addItem);

  // Tính toán công suất điện
  const ledCount = Math.ceil(area / 5); // 1 bóng 20W cho mỗi 5m²
  const baseWatts = 200; // Đèn, quạt, sạc điện thoại
  const acWatts = airCon * 1000; // 1 HP ~ 1000W
  const heaterWatts = waterHeater * 2500; // Bình nước nóng 2500W
  const cookerWatts = cooker ? 3500 : 0; // Bếp từ 3500W
  const socketWatts = socketCount * 150;

  const totalWatts = baseWatts + acWatts + heaterWatts + cookerWatts + socketWatts;
  const totalKw = (totalWatts / 1000).toFixed(1);

  // Tính Aptomat khuyên dùng
  let mcbAmp = "20A";
  let mcbName = "Aptomat Panasonic 2P 20A";
  let mcbPrice = 125000;
  let mcbModel = "MCB-BBN2202";

  if (totalWatts > 5000) {
    mcbAmp = "40A (Chống giật Schneider)";
    mcbName = "Aptomat Chống giật RCCB Schneider 2P 40A 30mA";
    mcbPrice = 490000;
    mcbModel = "EZ9R33240";
  } else if (totalWatts > 3000) {
    mcbAmp = "32A (Panasonic)";
    mcbName = "Aptomat Cầu dao tự động Panasonic 2P 32A";
    mcbPrice = 135000;
    mcbModel = "MCB-BBN2322";
  }

  // Danh sách vật tư dự toán
  const itemsList = [
    { id: "est-01", name: mcbName, qty: 1, price: mcbPrice, image: "/images/congtacdoi2chieusino.png" },
    { id: "est-02", name: "Bóng đèn LED Bulb Trụ Nhôm 20W Rạng Đông", qty: ledCount, price: 45000, image: "/images/LED-buildtru-nhomnhua20W.jpg" },
    { id: "est-03", name: "Ổ cắm đôi 3 chấu Sino Vanlock Trắng", qty: Math.ceil(socketCount / 2), price: 65000, image: "/images/banner-ocam.png" },
    { id: "est-04", name: "Sino S18 Series Công tắc 1 nút vuông Trắng", qty: 2, price: 25000, image: "/images/congtacdoi2chieusino.png" },
  ];

  const totalEstimateCost = itemsList.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleAddAllToCart = () => {
    itemsList.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.qty,
        selected: true,
      });
    });

    toast.success(`Đã thêm tất cả ${itemsList.length} thiết bị dự toán vào giỏ hàng!`, { position: "bottom-right" });
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-white/10 my-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold border border-yellow-400/30 mb-2">
            <Zap size={14} /> Công cụ Tương tác 2026
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Bảng tính Công suất & Dự toán Thiết bị Điện
          </h2>
          <p className="text-blue-200 text-xs md:text-sm mt-1">
            Nhập thông số không gian để hệ thống tính toán công suất tiêu thụ và khuyên dùng Aptomat chuẩn an toàn
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center shrink-0">
          <span className="text-xs text-blue-200 uppercase font-semibold">Tổng công suất dự tính</span>
          <div className="text-3xl md:text-4xl font-black text-yellow-400 mt-0.5">
            {totalKw} <span className="text-lg text-white font-bold">kW</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold block mt-1">
            ⚡ Khuyên dùng Aptomat: {mcbAmp}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* CỘT TRÁI: ĐIỀU CHỈNH THÔNG SỐ */}
        <div className="space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="font-bold text-base text-blue-200 flex items-center gap-2">
            <Calculator size={18} /> 1. Nhập thông số không gian & Thiết bị sử dụng
          </h3>

          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span>Diện tích phòng (m²):</span>
              <span className="text-yellow-300 font-bold text-sm">{area} m²</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Máy lạnh / Điều hòa:</label>
              <select
                value={airCon}
                onChange={(e) => setAirCon(Number(e.target.value))}
                className="w-full bg-slate-800 text-white border border-white/20 p-2.5 rounded-xl outline-none"
              >
                <option value={0}>Không dùng (0 cái)</option>
                <option value={1}>1 Máy lạnh (1 HP)</option>
                <option value={2}>2 Máy lạnh</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Bình nước nóng:</label>
              <select
                value={waterHeater}
                onChange={(e) => setWaterHeater(Number(e.target.value))}
                className="w-full bg-slate-800 text-white border border-white/20 p-2.5 rounded-xl outline-none"
              >
                <option value={0}>Không dùng (0 cái)</option>
                <option value={1}>1 Bình gián tiếp (2500W)</option>
                <option value={2}>2 Bình nước nóng</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Số lượng ổ cắm:</label>
              <select
                value={socketCount}
                onChange={(e) => setSocketCount(Number(e.target.value))}
                className="w-full bg-slate-800 text-white border border-white/20 p-2.5 rounded-xl outline-none"
              >
                <option value={2}>2 Ổ cắm điện</option>
                <option value={4}>4 Ổ cắm điện</option>
                <option value={6}>6 Ổ cắm điện</option>
                <option value={8}>8 Ổ cắm điện</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="cooker"
                checked={cooker}
                onChange={(e) => setCooker(e.target.checked)}
                className="w-4 h-4 accent-yellow-400 cursor-pointer"
              />
              <label htmlFor="cooker" className="font-semibold cursor-pointer select-none">
                Có dùng Bếp từ (3500W)
              </label>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: KẾT QUẢ DỰ TOÁN VẬT TƯ */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4">
              <h3 className="font-bold text-base text-blue-200 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-400" /> 2. Danh mục vật tư khuyên dùng
              </h3>
              <span className="text-xs text-emerald-400 font-bold">Chính hãng Phú Lâm</span>
            </div>

            <div className="space-y-3">
              {itemsList.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-8 h-8 bg-white rounded-lg p-0.5 shrink-0 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt="" className="w-full h-full object-contain" />
                    </div>
                    <span className="truncate text-gray-200 font-medium">{item.name}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-yellow-300">x{item.qty}</span>
                    <span className="block text-[11px] text-gray-400">
                      {new Intl.NumberFormat("vi-VN").format(item.price * item.qty)}₫
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs text-gray-400">Tổng dự toán thiết bị:</span>
              <p className="text-2xl font-bold text-yellow-400">
                {new Intl.NumberFormat("vi-VN").format(totalEstimateCost)}₫
              </p>
            </div>

            <button
              onClick={handleAddAllToCart}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-blue-950 px-6 py-3 rounded-2xl font-black text-sm transition shadow-lg flex items-center justify-center gap-2 active:scale-95"
            >
              <ShoppingBag size={18} /> Thêm tất cả vào Giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
