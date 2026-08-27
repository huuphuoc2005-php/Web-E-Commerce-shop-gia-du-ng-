"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSystem } from "@/lib/actions";
import { toast } from "sonner";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Store,
  Sparkles,
  Shield,
  ArrowLeft,
  ShoppingBag,
  Users,
  TrendingUp,
  BarChart3,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await loginSystem(formData);

      if (result.success) {
        toast.success("Đăng nhập Admin thành công!");
        if (result.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/profile");
        }
        router.refresh();
      } else {
        toast.error(result.message || "Đăng nhập thất bại");
      }
    } catch {
      toast.error("Có lỗi xảy ra khi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFillAdmin = () => {
    setEmail("admin@phulam.com");
    setPassword("123456");
    toast.info("Đã nhập mẫu tài khoản Admin: admin@phulam.com");
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* BACKGROUND DYNAMIC ANIMATED MATRIX & GLOW ORBS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/6 w-[32rem] h-[32rem] bg-indigo-600/15 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-[35rem] h-[35rem] bg-purple-600/15 rounded-full blur-[140px] animate-[pulse_8s_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      {/* CỘT TRÁI: SHOWCASE DÀNH CHO QUẢN TRỊ VIÊN */}
      <div className="hidden lg:flex lg:w-7/12 relative z-10 p-12 flex-col justify-between border-r border-slate-800/60 bg-slate-950/40 backdrop-blur-xs">
        {/* Logo Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/20">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-purple-300">
                PHÚ LÂM ADMIN PORTAL
              </span>
              <p className="text-xs text-indigo-300/80 font-medium">Hệ Thống Điều Hành & Quản Lý Bán Hàng</p>
            </div>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <ShieldCheck size={14} /> Cổng Quản Trị
          </span>
        </div>

        {/* Middle Hero Visual Showcase */}
        <div className="space-y-8 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles size={14} className="text-yellow-400 animate-spin" /> Bảng điều khiển cửa hàng thông minh
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight text-white tracking-tight">
            Quản lý kinh doanh <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300">
              Hiệu Quả & Toàn Diện
            </span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Hệ thống dành riêng cho Ban quản trị Phú Lâm Store. Quản lý kho hàng tự động, duyệt đơn hàng thời gian thực, quản lý khách hàng và phân tích doanh thu.
          </p>

          {/* DYNAMIC FLOATING CARDS FOR ADMIN */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl hover:border-indigo-500/40 hover:bg-slate-800/60 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
                <ShoppingBag size={18} />
              </div>
              <h3 className="text-xs font-bold text-white">Quản lý Đơn hàng</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Xử lý nhanh, duyệt trạng thái 1-click.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl hover:border-purple-500/40 hover:bg-slate-800/60 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
                <BarChart3 size={18} />
              </div>
              <h3 className="text-xs font-bold text-white">Báo cáo Doanh thu</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Thống kê Realtime & Tự động hóa.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-300">
            <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-indigo-400" /> Mã hóa Bcrypt 256-bit
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
              <Users size={13} className="text-purple-400" /> Phân quyền Admin / User
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-6">
          <span>&copy; {new Date().getFullYear()} Phú Lâm Store Admin System.</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-300 transition">Trang chủ cửa hàng</Link>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: FORM ĐĂNG NHẬP ADMIN */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-6 md:p-12 z-10 relative bg-slate-900/80 backdrop-blur-xl">
        <div className="w-full max-w-md space-y-7">
          {/* Mobile Header Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Shield size={20} />
            </div>
            <div>
              <span className="text-lg font-bold text-white">PHÚ LÂM ADMIN</span>
              <p className="text-xs text-slate-400">Cổng Quản Trị Hệ Thống</p>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              <Shield size={14} /> Cổng Đăng Nhập Quản Trị
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Đăng nhập Admin 🔑</h2>
            <p className="text-slate-400 text-sm mt-1">
              Vui lòng nhập tài khoản quản trị viên để điều hành hệ thống.
            </p>
          </div>


          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Quản trị
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@phulam.com"
                  className="w-full text-white bg-slate-800/90 border border-slate-700/80 pl-11 pr-4 py-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition text-sm placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Mật khẩu bảo mật
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full text-white bg-slate-800/90 border border-slate-700/80 pl-11 pr-11 py-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition text-sm placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang xác thực...
                </span>
              ) : (
                <>
                  Vào Trang Quản Trị Admin <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <Link href="/" className="hover:text-indigo-400 font-semibold flex items-center gap-1.5 transition">
                <ArrowLeft size={14} /> Về trang mua hàng
              </Link>
              <Link href="/login" className="text-slate-400 hover:text-blue-400 transition font-medium flex items-center gap-1">
                <UserCheck size={13} /> Cổng Khách hàng →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}