"use client";

import { useState } from "react";
import { registerCustomer } from "@/lib/actions";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, Mail, User, UserPlus, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await registerCustomer(formData);
      if (res.success) {
        toast.success("Đăng ký tài khoản thành công!");
        router.push("/profile");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Lỗi đăng ký tài khoản");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Đăng ký tài khoản</h1>
              <p className="text-xs text-gray-500 mt-1">Tạo tài khoản mua sắm tiện lợi tại Phú Lâm Store</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Họ và tên (*)</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full text-black pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email đăng nhập (*)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="email@example.com"
                    className="w-full text-black pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mật khẩu (*)</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full text-black pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-70"
              >
                {loading ? "Đang tạo tài khoản..." : "ĐĂNG KÝ NGAY"} <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-500">
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                Đăng nhập
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
