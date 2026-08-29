import { db } from "@/lib/db";
import { updateOrderStatus } from "@/lib/actions"; // Nhớ import hàm mới
import Link from "next/link";
type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DONE" | "CANCELLED";

const statusLabelMap: Record<OrderStatus, string> = {
  PENDING: "Chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  SHIPPED: "Đang giao",
  DONE: "Hoàn thành",
  CANCELLED: "Đã hủy",
};

const nextStatusMap: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING: "CONFIRMED",
  CONFIRMED: "SHIPPED",
  SHIPPED: "DONE",
};

const cancellableStatuses: OrderStatus[] = ["PENDING", "CONFIRMED"];

export default async function AdminOrdersPage() {
  // 1. Lấy tất cả đơn hàng từ Database (Mới nhất lên đầu)
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  // 2. Tính tổng doanh thu
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Thống kê */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Quản Lý Đơn Hàng</h1>
            <p className="text-gray-500">Xem và xử lý các đơn đặt hàng mới</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-blue-100 flex gap-6">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase font-bold">Tổng đơn</p>
              <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase font-bold">Doanh thu</p>
              <p className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat("vi-VN").format(totalRevenue)}₫
              </p>
            </div>
          </div>
        </div>

        {/* Danh sách đơn hàng */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4">Mã đơn / Ngày</th>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Sản phẩm mua</th>
                <th className="p-4">Tổng tiền</th>
                <th className="p-4">Xử lý đơn</th> {/* Đổi tên cột này */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  
                  {/* Cột 1: Mã & Ngày */}
                  <td className="p-4 align-top">
                    <span className="font-mono text-xs text-gray-500 block mb-1">#{order.id.slice(-6)}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="text-xs text-gray-400 block">
                      {new Date(order.createdAt).toLocaleTimeString("vi-VN", {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </td>

                  {/* Cột 2: Thông tin khách */}
                  <td className="p-4 align-top">
                    <p className="font-bold text-gray-800">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.phone}</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-[200px]">{order.address}</p>
                  </td>

                  {/* Cột 3: Chi tiết món hàng */}
                  <td className="p-4 align-top">
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li key={item.id} className="text-sm text-gray-700 flex justify-between gap-4">
                          <span>• {item.product.name}</span>
                          <span className="text-gray-500 font-medium">x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Cột 4: Tổng tiền */}
                  <td className="p-4 align-top font-bold text-red-600">
                    {new Intl.NumberFormat("vi-VN").format(order.totalAmount)}₫
                  </td>

                  {/* Cột 5: NÚT BẤM CHUYỂN TRẠNG THÁI (Giao diện chuẩn Video Demo) */}
                  <td className="p-4 align-top">
                    <div className="flex flex-col gap-2 min-w-[180px]">
                      {/* Badge Trạng thái Hiện tại */}
                      <div className="mb-1">
                        <span className="text-[10px] uppercase font-extrabold text-gray-400 block mb-1">Trạng thái hiện tại:</span>
                        {order.status === "PENDING" && (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-200 shadow-xs">
                            ⏳ CHỜ XÁC NHẬN
                          </span>
                        )}
                        {order.status === "CONFIRMED" && (
                          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 font-extrabold text-xs px-3 py-1 rounded-full border border-blue-200 shadow-xs">
                            ✅ ĐÃ XÁC NHẬN
                          </span>
                        )}
                        {order.status === "SHIPPED" && (
                          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 font-extrabold text-xs px-3 py-1 rounded-full border border-purple-200 shadow-xs">
                            🚚 ĐANG GIAO HÀNG
                          </span>
                        )}
                        {order.status === "DONE" && (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
                            🎉 GIAO THÀNH CÔNG
                          </span>
                        )}
                        {order.status === "CANCELLED" && (
                          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 font-extrabold text-xs px-3 py-1 rounded-full border border-rose-200 shadow-xs">
                            ❌ ĐÃ HỦY ĐƠN
                          </span>
                        )}
                      </div>

                      {/* Nút bấm chuyển sang Bước tiếp theo */}
                      <form action={updateOrderStatus}>
                        <input type="hidden" name="orderId" value={order.id} />

                        {order.status === "PENDING" && (
                          <>
                            <input type="hidden" name="newStatus" value="CONFIRMED" />
                            <button
                              type="submit"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center gap-1"
                            >
                              🚀 Duyệt & Xác nhận đơn
                            </button>
                          </>
                        )}

                        {order.status === "CONFIRMED" && (
                          <>
                            <input type="hidden" name="newStatus" value="SHIPPED" />
                            <button
                              type="submit"
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center gap-1"
                            >
                              🚚 Chuyển sang Đang giao
                            </button>
                          </>
                        )}

                        {order.status === "SHIPPED" && (
                          <>
                            <input type="hidden" name="newStatus" value="DONE" />
                            <button
                              type="submit"
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center gap-1"
                            >
                              🎉 Xác nhận Giao thành công
                            </button>
                          </>
                        )}
                      </form>

                      {cancellableStatuses.includes(order.status as OrderStatus) && (
                        <form action={updateOrderStatus}>
                          <input type="hidden" name="orderId" value={order.id} />
                          <input type="hidden" name="newStatus" value="CANCELLED" />
                          <button
                            type="submit"
                            className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-[11px] py-1 px-2 rounded-lg border border-rose-200 transition"
                          >
                            ❌ Hủy đơn hàng
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              Chưa có đơn hàng nào.
            </div>
          )}
        </div>
        
        <div className="mt-15 text-right">
             <Link href="/admin/products" className="text-blue-600 hover:underline">
                → Quản lý sản phẩm
             </Link>
        </div>
      </div>
    </div>
  );
}