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
  ArrowLeft,
  UserCheck,
  CheckCircle2,
  Flame,
  Zap,
  Star,
  Package,
  Heart,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function UserLoginPage() {
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
        toast.success("Đăng nhập thành công!");
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

  const handleQuickFillUser = () => {
    setEmail("user@phulam.com");
    setPassword("123456");
    toast.info("Đã nhập mẫu tài khoản Khách hàng: user@phulam.com");
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-950 font-sans text-slate-100 selection:bg-blue-500 selection:text-white relative overflow-hidden">
      {/* BACKGROUND DYNAMIC ANIMATED MATRIX & GLOW ORBS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/6 w-[30rem] h-[30rem] bg-blue-600/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-[35rem] h-[35rem] bg-indigo-600/15 rounded-full blur-[140px] animate-[pulse_8s_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-sky-500/10 rounded-full blur-[150px]" />
      </div>

      {/* CỘT TRÁI: SHOWCASE KHÁCH HÀNG & SẢN PHẨM */}
      <div className="hidden lg:flex lg:w-7/12 relative z-10 p-12 flex-col justify-between border-r border-slate-800/60 bg-slate-950/40 backdrop-blur-xs">
        {/* Logo Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-white/20">
              <Store className="text-white" size={24} />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300">
                PHÚ LÂM STORE
              </span>
              <p className="text-xs text-blue-300/80 font-medium">Gia Dụng Thông Minh - Nâng Tầm Cuộc Sống</p>
            </div>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <UserCheck size={14} /> Cổng Khách Hàng
          </span>
        </div>

        {/* Middle Hero Visual Showcase */}
        <div className="space-y-8 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles size={14} className="text-yellow-400 animate-spin" /> Quyền lợi thành viên Phú Lâm Store
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight text-white tracking-tight">
            Mua sắm gia dụng <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300">
              Chính Hàng & Tiết Kiệm
            </span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Đăng nhập tài khoản để theo dõi lịch sử đơn hàng, lưu sản phẩm yêu thích và tích điểm nhận các voucher ưu đãi hấp dẫn dành riêng cho bạn.
          </p>

          {/* DYNAMIC FLOATING CARDS */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl hover:border-blue-500/40 hover:bg-slate-800/60 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20 flex items-center gap-1">
                  <Flame size={10} /> Bán chạy #1
                </span>
                <div className="flex items-center text-yellow-400 text-xs font-bold gap-0.5">
                  <Star size={12} className="fill-yellow-400" /> 4.9
                </div>
              </div>
              <h3 className="text-xs font-bold text-white truncate">Nồi Chiên Không Dầu 6L</h3>
              <p className="text-[11px] text-blue-400 font-extrabold mt-1">1.250.000đ <span className="text-slate-500 line-through text-[10px]">1.800.000đ</span></p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl hover:border-emerald-500/40 hover:bg-slate-800/60 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 flex items-center gap-1">
                  <Zap size={10} /> Giao nhanh 2h
                </span>
                <span className="text-[10px] text-slate-400">Chính hãng</span>
              </div>
              <h3 className="text-xs font-bold text-white truncate">Bếp Từ Đôi Cảm Ứng</h3>
              <p className="text-[11px] text-emerald-400 font-extrabold mt-1">3.450.000đ</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-300">
            <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-blue-400" /> Miễn phí vận chuyển
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-400" /> Bảo hành 24 tháng
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
              <Heart size={13} className="text-rose-400" /> Tích điểm thành viên
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-6">
          <span>&copy; {new Date().getFullYear()} Phú Lâm Store. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-300 transition">Trang chủ</Link>
            <Link href="/tracking" className="hover:text-slate-300 transition">Tra cứu đơn</Link>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: FORM ĐĂNG NHẬP KHÁCH HÀNG */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-6 md:p-12 z-10 relative bg-slate-900/80 backdrop-blur-xl">
        <div className="w-full max-w-md space-y-7">
          {/* Mobile Header Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Store size={20} />
            </div>
            <div>
              <span className="text-lg font-bold text-white">PHÚ LÂM STORE</span>
              <p className="text-xs text-slate-400">Cổng Đăng Nhập Khách Hàng</p>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
              <UserCheck size={14} /> Khách Hàng Thân Thiết
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Đăng nhập tài khoản 👋</h2>
            <p className="text-slate-400 text-sm mt-1">
              Nhập email và mật khẩu của bạn để mua sắm & quản lý tài khoản.
            </p>
          </div>


          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Email đăng nhập
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="user@phulam.com"
                  className="w-full text-white bg-slate-800/90 border border-slate-700/80 pl-11 pr-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Mật khẩu
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
                  className="w-full text-white bg-slate-800/90 border border-slate-700/80 pl-11 pr-11 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm placeholder:text-slate-500"
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
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang đăng nhập...
                </span>
              ) : (
                <>
                  Đăng nhập Khách hàng <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <Link href="/" className="hover:text-blue-400 font-semibold flex items-center gap-1.5 transition">
                <ArrowLeft size={14} /> Về trang mua hàng
              </Link>
              <div>
                Chưa có tài khoản?{" "}
                <Link href="/register" className="text-blue-400 font-bold hover:underline ml-1">
                  Đăng ký ngay
                </Link>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link href="/admin/login" className="text-slate-500 hover:text-indigo-400 transition font-medium flex items-center justify-center gap-1">
                <Shield size={13} /> Bạn là Quản trị viên? Đăng nhập Admin →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
