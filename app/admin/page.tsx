import { db } from "@/lib/db";
import AdminChart from "@/app/components/AdminChart";
import { DollarSign, ShoppingBag, TrendingUp, Clock, User } from "lucide-react";

export default async function AdminDashboard() {
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayIndex = d.getDay();
    const name = dayIndex === 0 ? "CN" : `T${dayIndex + 1}`;
    return {
      dateStr: d.toISOString().split("T")[0],
      name: name,
      total: 0,
    };
  }).reverse();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const recentOrders = await db.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      createdAt: true,
      totalAmount: true,
    },
  });

  recentOrders.forEach((order) => {
    const orderDateStr = order.createdAt.toISOString().split("T")[0];
    const targetDay = last7Days.find((day) => day.dateStr === orderDateStr);
    if (targetDay) {
      targetDay.total += Number(order.totalAmount);
    }
  });

  const chartData = last7Days.map(({ name, total }) => ({ name, total }));

  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { items: true },
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;

  return (
    <div className="space-y-8">
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800/40 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Số liệu thống kê & Tổng quan kinh doanh</h2>
          <p className="text-slate-400 text-xs mt-1">Chào mừng trở lại, chúc bạn một ngày làm việc hiệu quả!</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Dữ liệu trực tuyến
          </span>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Doanh thu 7 ngày qua"
          value={new Intl.NumberFormat("vi-VN").format(totalRevenue) + "₫"}
          icon={<DollarSign className="text-white" size={24} />}
          bg="bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-600/30"
          subtitle="Cập nhật tự động"
        />
        <StatCard
          title="Đơn hàng mới"
          value={totalOrders.toString()}
          icon={<ShoppingBag className="text-white" size={24} />}
          bg="bg-gradient-to-tr from-purple-600 to-pink-600 shadow-purple-600/30"
          subtitle="Đang chờ xử lý"
        />
        <StatCard
          title="Tỷ lệ tăng trưởng"
          value="+24.5%"
          icon={<TrendingUp className="text-white" size={24} />}
          bg="bg-gradient-to-tr from-emerald-600 to-teal-600 shadow-emerald-600/30"
          subtitle="So với tuần trước"
        />
      </div>

      {/* CHARTS & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CHART COLUMN */}
        <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white text-base">Phân tích biểu đồ doanh thu</h3>
            <select className="text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 outline-none text-slate-300 cursor-pointer">
              <option>7 ngày qua</option>
            </select>
          </div>
          <AdminChart data={chartData} />
        </div>

        {/* RECENT ACTIVITY COLUMN */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
          <h3 className="font-bold text-white text-base mb-6">Đơn hàng mới nhất</h3>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex gap-3 items-start p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800 transition">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <User size={16} />
                </div>
                <div className="overflow-hidden flex-1">
                  <p className="text-xs text-slate-200 font-medium truncate">
                    <span className="font-bold text-white">{order.customerName}</span> đặt đơn hàng{" "}
                    <span className="text-blue-400 font-mono">#{order.id.slice(-6).toUpperCase()}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {new Date(order.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="font-bold text-emerald-400">{new Intl.NumberFormat("vi-VN").format(order.totalAmount)}₫</span>
                  </p>
                </div>
              </div>
            ))}

            {orders.length === 0 && <p className="text-slate-400 text-xs text-center py-6">Chưa có đơn hàng nào.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bg, subtitle }: any) {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md flex items-center gap-4 hover:border-slate-700 transition">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shrink-0 ${bg}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-extrabold text-white mt-0.5">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}