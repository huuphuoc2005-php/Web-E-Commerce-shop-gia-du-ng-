"use client";

import { useState } from "react";
import { updateStoreSettings } from "@/lib/actions";
import { toast } from "sonner";
import { Store, Phone, MapPin, Mail, Truck, Megaphone, Save } from "lucide-react";

interface StoreSettingProps {
  settings: {
    storeName: string;
    phone: string;
    address: string;
    email: string;
    shippingFee: number;
    freeShipThreshold: number;
    bannerAnnouncement: string | null;
    maintenanceMode: boolean;
  };
}

export default function StoreSettingForm({ settings }: StoreSettingProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await updateStoreSettings(formData);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Lỗi cập nhật cài đặt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-6">
      {/* Khối 1: Thông tin cửa hàng */}
      <div>
        <h2 className="text-base font-bold text-gray-800 pb-3 border-b border-gray-100 mb-4 flex items-center gap-2">
          <Store className="text-blue-600" size={20} /> Thông tin liên hệ cửa hàng
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Tên Cửa hàng (*)</label>
            <div className="relative">
              <Store className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                name="storeName"
                defaultValue={settings.storeName}
                required
                className="w-full text-black pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Hotline / Số điện thoại (*)</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                name="phone"
                defaultValue={settings.phone}
                required
                className="w-full text-black pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email hỗ trợ (*)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                name="email"
                type="email"
                defaultValue={settings.email}
                required
                className="w-full text-black pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Địa chỉ cửa hàng (*)</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                name="address"
                defaultValue={settings.address}
                required
                className="w-full text-black pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Khối 2: Cài đặt vận chuyển */}
      <div>
        <h2 className="text-base font-bold text-gray-800 pb-3 border-b border-gray-100 mb-4 flex items-center gap-2">
          <Truck className="text-blue-600" size={20} /> Chính sách vận chuyển & Phí giao hàng
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Phí vận chuyển chuẩn (VNĐ)</label>
            <input
              type="number"
              name="shippingFee"
              defaultValue={settings.shippingFee}
              className="w-full text-black px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-gray-400 mt-1">Nhập 0 nếu miễn phí vận chuyển mặc định</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Ngưỡng Miễn phí Vận chuyển (VNĐ)</label>
            <input
              type="number"
              name="freeShipThreshold"
              defaultValue={settings.freeShipThreshold}
              className="w-full text-black px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-gray-400 mt-1">Đơn từ mức tiền này sẽ được FreeShip</p>
          </div>
        </div>
      </div>

      {/* Khối 3: Thông báo banner */}
      <div>
        <h2 className="text-base font-bold text-gray-800 pb-3 border-b border-gray-100 mb-4 flex items-center gap-2">
          <Megaphone className="text-blue-600" size={20} /> Banner Thông báo Khuyến mãi trên Header
        </h2>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Nội dung dòng chữ thông báo</label>
          <input
            name="bannerAnnouncement"
            defaultValue={settings.bannerAnnouncement || ""}
            placeholder="🔥 Siêu ưu đãi tháng này..."
            className="w-full text-black px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-70"
        >
          <Save size={18} /> {loading ? "Đang lưu..." : "Lưu tất cả Cài đặt"}
        </button>
      </div>
    </form>
  );
}
