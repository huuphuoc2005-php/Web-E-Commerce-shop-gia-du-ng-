"use client";

import { useState } from "react";
import { updateUserProfile, updateUserPassword } from "@/lib/actions";
import LogoutButton from "@/app/components/LogoutButton";
import ProductCard from "@/app/components/ProductCard";
import { useWishlist } from "@/lib/wishlist";
import { toast } from "sonner";
import Link from "next/link";
import {
  User,
  Package,
  KeyRound,
  Heart,
  Mail,
  Phone,
  MapPin,
  Camera,
  Shield,
  Calendar,
  Save,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Upload,
} from "lucide-react";

interface UserProfileData {
  id: string;
  name: string | null;
  email: string;
  role: string;
  phone: string | null;
  address: string | null;
  avatar: string | null;
  createdAt: Date;
}

interface OrderItemData {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
}

interface OrderData {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  totalAmount: number;
  discountAmount: number;
  voucherCode: string | null;
  status: string;
  createdAt: Date;
  items: OrderItemData[];
}

interface ProfileManagerProps {
  user: UserProfileData;
  orders: OrderData[];
}

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  PENDING: { label: "Chờ xác nhận", bg: "bg-amber-100", text: "text-amber-700" },
  CONFIRMED: { label: "Đã xác nhận", bg: "bg-blue-100", text: "text-blue-700" },
  SHIPPED: { label: "Đang giao", bg: "bg-purple-100", text: "text-purple-700" },
  DONE: { label: "Thành công", bg: "bg-emerald-100", text: "text-emerald-700" },
  CANCELLED: { label: "Đã hủy", bg: "bg-rose-100", text: "text-rose-700" },
};

const avatarPresets = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
];

export default function ProfileManager({ user, orders }: ProfileManagerProps) {
  const [activeTab, setActiveTab] = useState<"info" | "orders" | "password" | "wishlist">("info");
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || avatarPresets[0]);
  const [customAvatarInput, setCustomAvatarInput] = useState(user.avatar || "");
  const [nameInput, setNameInput] = useState(user.name || "");
  const [phoneInput, setPhoneInput] = useState(user.phone || "");
  const [addressInput, setAddressInput] = useState(user.address || "");
  const [displayName, setDisplayName] = useState(user.name || "Khách hàng thân thiết");
  const [orderStatusFilter, setOrderStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const wishlistItems = useWishlist((state) => state.wishlist);

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === "ALL") return true;
    return o.status === orderStatusFilter;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Vui lòng chọn file ảnh nhỏ hơn 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          setSelectedAvatar(base64Url);
          setCustomAvatarInput("");
          toast.success("Đã tải ảnh lên thành công!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (nameInput.trim()) formData.append("name", nameInput.trim());
    if (phoneInput.trim()) formData.append("phone", phoneInput.trim());
    if (addressInput.trim()) formData.append("address", addressInput.trim());
    if (selectedAvatar) formData.append("avatar", selectedAvatar);

    try {
      const res = await updateUserProfile(formData);
      if (res.success) {
        toast.success(res.message);
        if (nameInput.trim()) setDisplayName(nameInput.trim());
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Không thể cập nhật hồ sơ");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await updateUserPassword(formData);
      if (res.success) {
        toast.success(res.message);
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Lỗi đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* BANNER PROFILE */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-white/20 text-white font-extrabold text-3xl flex items-center justify-center border-2 border-white/40 overflow-hidden shrink-0 shadow-inner">
              {selectedAvatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={selectedAvatar} alt="" className="w-full h-full object-cover" />
              ) : (
                (displayName || user.email).charAt(0).toUpperCase()
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">{displayName}</h1>
            <p className="text-blue-200 text-xs flex items-center gap-1.5 mt-1">
              <Mail size={14} /> {user.email}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-blue-300 mt-2">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> Thành viên từ: {new Date(user.createdAt).toLocaleDateString("vi-VN")}
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full font-semibold text-yellow-300 border border-white/10">
                <Shield size={12} /> {user.role === "ADMIN" ? "Quản trị viên" : "Thành viên"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="bg-yellow-400 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs hover:bg-yellow-300 transition"
            >
              Vào Admin Dashboard
            </Link>
          )}
          <LogoutButton className="bg-white/15 hover:bg-red-500/20 hover:text-red-200 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition flex items-center gap-2 cursor-pointer shadow-sm hover:border-red-400/40" />
        </div>
      </div>

      {/* THANH TABS DIEU HUONG */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition ${
            activeTab === "info"
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <User size={18} /> Thông tin cá nhân
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition ${
            activeTab === "orders"
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Package size={18} /> Lịch sử đơn hàng ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab("wishlist")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition ${
            activeTab === "wishlist"
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Heart size={18} className="text-rose-500 fill-rose-500" /> Đã yêu thích ({wishlistItems.length})
        </button>

        <button
          onClick={() => setActiveTab("password")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition ${
            activeTab === "password"
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <KeyRound size={18} /> Đổi mật khẩu
        </button>
      </div>

      {/* TAB CONTENT 1: THÔNG TIN CÁ NHÂN */}
      {activeTab === "info" && (
        <form onSubmit={handleUpdateProfile} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-800 pb-3 border-b border-gray-100">
            Cập nhật thông tin & Địa chỉ mặc định
          </h2>

          {/* Chọn Avatar */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <Camera size={16} className="text-blue-600" /> Chọn hoặc tải ảnh đại diện (Avatar):
              </label>

              {/* Nút tải ảnh từ máy tính */}
              <label
                htmlFor="avatar-file-upload"
                className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-2xs"
              >
                <Upload size={14} /> Tải ảnh từ máy tính
              </label>
              <input
                id="avatar-file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {avatarPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedAvatar(preset);
                    setCustomAvatarInput(preset);
                  }}
                  className={`w-12 h-12 rounded-full overflow-hidden border-2 transition ${
                    selectedAvatar === preset ? "border-blue-600 ring-4 ring-blue-100 scale-110" : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preset} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="mt-3">
              <input
                type="url"
                value={customAvatarInput}
                onChange={(e) => {
                  setCustomAvatarInput(e.target.value);
                  setSelectedAvatar(e.target.value);
                }}
                placeholder="Hoặc dán URL ảnh đại diện của bạn..."
                className="w-full text-black px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Họ và tên (*)</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  name="name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Nhập họ tên của bạn..."
                  className="w-full text-black pl-9 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Số điện thoại giao hàng (*)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  name="phone"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="Ví dụ: 0869..."
                  className="w-full text-black pl-9 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Địa chỉ nhận hàng mặc định</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  name="address"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="Số nhà, tên đường, xã/phường, quận/huyện..."
                  className="w-full text-black pl-9 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-70"
            >
              <Save size={16} /> {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT 2: LỊCH SỬ ĐƠN HÀNG */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Package className="text-blue-600" /> Danh sách đơn hàng
            </h2>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {[
                { key: "ALL", label: "Tất cả" },
                { key: "PENDING", label: "Chờ xác nhận" },
                { key: "CONFIRMED", label: "Đã xác nhận" },
                { key: "SHIPPED", label: "Đang giao" },
                { key: "DONE", label: "Thành công" },
                { key: "CANCELLED", label: "Đã hủy" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setOrderStatusFilter(f.key)}
                  className={`px-3 py-1.5 rounded-full transition ${
                    orderStatusFilter === f.key
                      ? "bg-gray-900 text-white font-bold"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              <ShoppingBag className="mx-auto text-gray-300 mb-3" size={48} />
              <h3 className="text-base font-bold text-gray-700 mb-1">Không có đơn hàng phù hợp</h3>
              <p className="text-gray-400 text-xs mb-6">Bạn chưa có đơn hàng nào thuộc trạng thái này.</p>
              <Link
                href="/"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-blue-700 transition inline-flex items-center gap-1.5"
              >
                Mua sắm ngay <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status] || statusConfig.PENDING;

                return (
                  <div key={order.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-2xs">
                    <div className="p-4 bg-gray-50/80 border-b border-gray-100 flex flex-wrap justify-between items-center gap-3">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Mã đơn</span>
                        <p className="font-mono font-bold text-sm text-gray-800">#{order.id.slice(-8).toUpperCase()}</p>
                        <p className="text-[11px] text-gray-400">{new Date(order.createdAt).toLocaleString("vi-VN")}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                        <Link
                          href={`/tracking?query=${order.id}`}
                          className="text-xs text-blue-600 font-semibold hover:underline"
                        >
                          Theo dõi đơn →
                        </Link>
                      </div>
                    </div>

                    <div className="p-4 divide-y divide-gray-100">
                      {order.items.map((item) => (
                        <div key={item.id} className="py-2.5 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-lg p-1 flex items-center justify-center shrink-0">
                              {item.product.image ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={item.product.image} alt="" className="w-full h-full object-contain" />
                              ) : (
                                <span className="text-[9px] text-gray-400 font-bold">NO IMG</span>
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-800 line-clamp-1">{item.product.name}</p>
                              <p className="text-[11px] text-gray-500">
                                {new Intl.NumberFormat("vi-VN").format(item.price)}₫ x {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-gray-700 shrink-0">
                            {new Intl.NumberFormat("vi-VN").format(item.price * item.quantity)}₫
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-xs">
                      <span className="text-gray-500">
                        {order.voucherCode ? `Voucher: ${order.voucherCode} (-${new Intl.NumberFormat("vi-VN").format(order.discountAmount)}₫)` : "Thanh toán COD"}
                      </span>
                      <div className="text-right">
                        <span className="text-gray-500">Tổng tiền: </span>
                        <span className="text-sm font-bold text-blue-600">
                          {new Intl.NumberFormat("vi-VN").format(order.totalAmount)}₫
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 3: SẢN PHẨM ĐÃ YÊU THÍCH 💖 */}
      {activeTab === "wishlist" && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-800 pb-3 border-b border-gray-100 flex items-center gap-2">
            <Heart className="text-rose-500 fill-rose-500" /> Danh sách sản phẩm bạn đã yêu thích ({wishlistItems.length})
          </h2>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              <Heart className="mx-auto text-gray-300 mb-3" size={48} />
              <h3 className="text-base font-bold text-gray-700 mb-1">Chưa có sản phẩm yêu thích nào</h3>
              <p className="text-gray-400 text-xs mb-6">Hãy bấm nút thả tim 💖 ở sản phẩm bạn ưng ý để lưu tại đây nhé!</p>
              <Link
                href="/"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-blue-700 transition inline-flex items-center gap-1.5"
              >
                Khám phá sản phẩm <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {wishlistItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 4: ĐỔI MẬT KHẨU */}
      {activeTab === "password" && (
        <form onSubmit={handleUpdatePassword} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6 max-w-xl">
          <h2 className="text-lg font-bold text-gray-800 pb-3 border-b border-gray-100 flex items-center gap-2">
            <KeyRound className="text-blue-600" /> Đổi mật khẩu tài khoản
          </h2>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Mật khẩu hiện tại (*)</label>
            <input
              type="password"
              name="currentPassword"
              required
              placeholder="••••••••"
              className="w-full text-black px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Mật khẩu mới (*)</label>
            <input
              type="password"
              name="newPassword"
              required
              placeholder="Mật khẩu tối thiểu 6 ký tự..."
              className="w-full text-black px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-70"
            >
              <CheckCircle2 size={16} /> {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
