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

                  {/* Cột 5: NÚT BẤM CHUYỂN TRẠNG THÁI (Cập nhật mới) */}
                  <td className="p-4 align-top">
                    <div className="flex flex-col gap-2">
                      <form action={updateOrderStatus}>
                        <input type="hidden" name="orderId" value={order.id} />

                        {nextStatusMap[order.status as OrderStatus] ? (
                          <>
                            <input
                              type="hidden"
                              name="newStatus"
                              value={nextStatusMap[order.status as OrderStatus]}
                            />
                            <button
                              type="submit"
                              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 hover:bg-green-200 transition flex items-center gap-1"
                            >
                              {statusLabelMap[order.status as OrderStatus]} -&gt;{" "}
                              {statusLabelMap[nextStatusMap[order.status as OrderStatus] as OrderStatus]}
                            </button>
                          </>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-300 inline-block">
                            {statusLabelMap[order.status as OrderStatus]}
                          </span>
                        )}
                      </form>

                      {cancellableStatuses.includes(order.status as OrderStatus) && (
                        <form action={updateOrderStatus}>
                          <input type="hidden" name="orderId" value={order.id} />
                          <input type="hidden" name="newStatus" value="CANCELLED" />
                          <button
                            type="submit"
                            className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200 hover:bg-red-100 transition"
                          >
                            Hủy đơn
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