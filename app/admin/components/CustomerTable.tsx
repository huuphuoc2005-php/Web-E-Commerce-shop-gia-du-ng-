"use client";

import { toggleUserRole } from "@/lib/actions";
import { toast } from "sonner";
import { ShieldCheck, ShieldAlert, Mail, Phone, Calendar, ShoppingBag } from "lucide-react";

interface CustomerItem {
  id: string;
  name: string | null;
  email: string;
  role: string;
  phone: string | null;
  address: string | null;
  avatar: string | null;
  createdAt: Date;
  orderCount: number;
  totalSpent: number;
}

interface CustomerTableProps {
  customers: CustomerItem[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  const handleToggleRole = async (userId: string, currentRole: string) => {
    const actionName = currentRole === "ADMIN" ? "Hạ quyền xuống Khách hàng (USER)" : "Nâng quyền thành Quản trị viên (ADMIN)";
    if (!confirm(`Bạn có chắc muốn ${actionName}?`)) return;

    const formData = new FormData();
    formData.append("userId", userId);
    try {
      const res = await toggleUserRole(formData);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Không thể thay đổi quyền");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <span className="font-bold text-gray-700 text-sm">
          Tổng số thành viên: <span className="text-blue-600 font-extrabold">{customers.length}</span>
        </span>
      </div>

      {customers.length === 0 ? (
        <div className="p-12 text-center text-gray-400 text-sm">Chưa có người dùng nào.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4">Liên hệ</th>
                <th className="px-6 py-4">Số đơn mua</th>
                <th className="px-6 py-4">Tổng chi tiêu</th>
                <th className="px-6 py-4">Ngày tham gia</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/60 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0 border border-blue-200">
                        {c.avatar ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={c.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          (c.name || c.email).charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{c.name || "Chưa cập nhật tên"}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Mail size={12} /> {c.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {c.role === "ADMIN" ? (
                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 font-bold text-xs px-2.5 py-1 rounded-full border border-purple-200">
                        <ShieldCheck size={14} /> ADMIN
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 font-medium text-xs px-2.5 py-1 rounded-full border border-gray-200">
                        Khách hàng
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-600 space-y-1">
                    <p className="flex items-center gap-1">
                      <Phone size={12} className="text-gray-400" /> {c.phone || "---"}
                    </p>
                    <p className="line-clamp-1 text-gray-400 max-w-[150px]">{c.address || "---"}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-xs font-bold">
                      <ShoppingBag size={12} /> {c.orderCount} đơn
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-emerald-600">
                    {new Intl.NumberFormat("vi-VN").format(c.totalSpent)}₫
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {new Date(c.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleToggleRole(c.id, c.role)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold transition border ${
                        c.role === "ADMIN"
                          ? "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
                          : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                      }`}
                    >
                      {c.role === "ADMIN" ? "Hạ quyền User" : "Nâng quyền Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
