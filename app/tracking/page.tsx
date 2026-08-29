import { getOrdersByTracking } from "@/lib/actions";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { Search, PackageCheck, Truck, Clock, CheckCircle2, XCircle, ArrowLeft, MapPin, Phone, User } from "lucide-react";

interface TrackingPageProps {
  searchParams: Promise<{ query?: string; phoneOrId?: string }>;
}

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; icon: React.ReactNode; step: number }
> = {
  PENDING: {
    label: "Chờ xác nhận",
    bg: "bg-amber-100",
    text: "text-amber-700",
    icon: <Clock size={16} />,
    step: 1,
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: <PackageCheck size={16} />,
    step: 2,
  },
  SHIPPED: {
    label: "Đang giao hàng",
    bg: "bg-purple-100",
    text: "text-purple-700",
    icon: <Truck size={16} />,
    step: 3,
  },
  DONE: {
    label: "Giao thành công",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: <CheckCircle2 size={16} />,
    step: 4,
  },
  CANCELLED: {
    label: "Đã hủy",
    bg: "bg-rose-100",
    text: "text-rose-700",
    icon: <XCircle size={16} />,
    step: 0,
  },
};

const timelineSteps = [
  { key: "PENDING", label: "Đã đặt đơn" },
  { key: "CONFIRMED", label: "Đã xác nhận" },
  { key: "SHIPPED", label: "Đang vận chuyển" },
  { key: "DONE", label: "Đã hoàn thành" },
];

export default async function TrackingPage(props: TrackingPageProps) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams.query || searchParams.phoneOrId || "";

  let result = null;
  if (searchQuery) {
    result = await getOrdersByTracking(searchQuery);
  }

  // Nếu không có searchQuery, nạp danh sách Đơn hàng Gần đây mẫu để xem tự do ngay lập tức
  const defaultRecentOrders = [
    {
      id: "ORD-PL-892104",
      customerName: "Phạm Hữu Phước",
      phone: "0924859346",
      address: "103 khu phố Đông Thái, Thị trấn Vĩnh Bảo, Hải Phòng",
      status: "SHIPPED",
      createdAt: new Date(Date.now() - 3600000 * 5), // 5 giờ trước
      totalAmount: 490000,
      discountAmount: 50000,
      voucherCode: "PHULAM50K",
      items: [
        {
          id: "item-1",
          productId: "cm-01",
          quantity: 1,
          price: 490000,
          product: {
            name: "Aptomat Chống giật RCCB Schneider 2P 40A 30mA",
            image: "/images/congtacdoi2chieusino.png",
          },
        },
      ],
    },
    {
      id: "ORD-PL-451209",
      customerName: "Trần Anh Minh",
      phone: "0869001296",
      address: "Số 45 Ngô Quyền, TP. Hải Phòng",
      status: "DONE",
      createdAt: new Date(Date.now() - 3600000 * 24), // 1 ngày trước
      totalAmount: 330000,
      discountAmount: 0,
      voucherCode: null,
      items: [
        {
          id: "item-2",
          productId: "cm-tool-5",
          quantity: 1,
          price: 330000,
          product: {
            name: "Bộ lục giác hoa thị 9 chi tiết thép bọc màu",
            image: "/images/congtacdoi2chieusino.png",
          },
        },
      ],
    },
    {
      id: "ORD-PL-102938",
      customerName: "Nguyễn Thị Thu",
      phone: "0912345678",
      address: "Chợ TT. Vĩnh Bảo, Hải Phòng",
      status: "PENDING",
      createdAt: new Date(Date.now() - 3600000 * 1), // 1 giờ trước
      totalAmount: 130000,
      discountAmount: 0,
      voucherCode: null,
      items: [
        {
          id: "item-3",
          productId: "cm-tool-3",
          quantity: 1,
          price: 130000,
          product: {
            name: "Kìm bấm chết 10 inch thép hợp kim cao cấp",
            image: "/images/congtacdoi2chieusino.png",
          },
        },
      ],
    },
  ];

  const activeOrders = (result && result.success && result.orders.length > 0)
    ? result.orders
    : defaultRecentOrders;

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Header Tiêu đề */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 mb-4 transition"
            >
              <ArrowLeft size={16} /> Quay lại Trang chủ
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Tra cứu đơn hàng
            </h1>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Xem trực tiếp tiến độ đơn hàng gần đây hoặc nhập <span className="font-semibold text-gray-700">Mã đơn / SĐT</span> để tìm kiếm.
            </p>
          </div>

          {/* Form tìm kiếm */}
          <form action="/tracking" method="GET" className="max-w-xl mx-auto mb-6">
            <div className="relative flex items-center shadow-sm rounded-2xl overflow-hidden bg-white border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition">
              <input
                type="text"
                name="query"
                defaultValue={searchQuery}
                placeholder="Nhập SĐT (vd: 0924...) hoặc Mã đơn..."
                className="w-full text-black py-4 pl-5 pr-14 text-base outline-none bg-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition flex items-center justify-center"
                title="Tra cứu"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* GỢI Ý ĐƠN MẪU BẤM NHANH */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
            <span className="text-xs font-bold text-gray-400">Xem nhanh mẫu:</span>
            <Link
              href="/tracking?query=ORD-PL-892104"
              className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold px-3 py-1.5 rounded-full transition border border-purple-200"
            >
              🚚 Đơn #892104 (Đang giao)
            </Link>
            <Link
              href="/tracking?query=ORD-PL-451209"
              className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-3 py-1.5 rounded-full transition border border-emerald-200"
            >
              ✅ Đơn #451209 (Đã xong)
            </Link>
            <Link
              href="/tracking?query=ORD-PL-102938"
              className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold px-3 py-1.5 rounded-full transition border border-amber-200"
            >
              ⏳ Đơn #102938 (Chờ xác nhận)
            </Link>
          </div>

          {/* HIỂN THỊ DANH SÁCH ĐƠN HÀNG TỰ DO */}
          <div className="space-y-8">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
              {searchQuery ? `Kết quả tìm kiếm cho "${searchQuery}"` : "📋 Đơn hàng gần đây trên hệ thống"}
            </p>

                  {activeOrders.map((order: any) => {
                    const statusInfo = statusConfig[order.status] || statusConfig.PENDING;
                    const currentStep = statusInfo.step;
                    const isCancelled = order.status === "CANCELLED";

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                      >
                        {/* Header của thẻ Đơn hàng */}
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
                          <div>
                            <span className="text-xs text-gray-400 uppercase font-semibold">Mã đơn hàng</span>
                            <h3 className="font-mono font-bold text-lg text-gray-800">
                              #{order.id.slice(-8).toUpperCase()}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Ngày đặt: {new Date(order.createdAt).toLocaleString("vi-VN")}
                            </p>
                          </div>

                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${statusInfo.bg} ${statusInfo.text}`}
                          >
                            {statusInfo.icon}
                            {statusInfo.label}
                          </div>
                        </div>

                        {/* Tiến trình Timeline đơn hàng */}
                        {!isCancelled && (
                          <div className="p-6 border-b border-gray-100 bg-white">
                            <div className="relative flex justify-between items-center max-w-md mx-auto">
                              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 -z-0">
                                <div
                                  className="h-full bg-blue-600 transition-all duration-500"
                                  style={{
                                    width: `${((Math.max(1, currentStep) - 1) / (timelineSteps.length - 1)) * 100}%`,
                                  }}
                                />
                              </div>

                              {timelineSteps.map((step, idx) => {
                                const stepNumber = idx + 1;
                                const isCompleted = currentStep >= stepNumber;
                                return (
                                  <div key={step.key} className="relative z-10 flex flex-col items-center">
                                    <div
                                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${isCompleted
                                        ? "bg-blue-600 text-white ring-4 ring-blue-50"
                                        : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                      {stepNumber}
                                    </div>
                                    <span
                                      className={`text-[11px] font-semibold mt-2 ${isCompleted ? "text-gray-800" : "text-gray-400"
                                        }`}
                                    >
                                      {step.label}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Chi tiết đơn hàng */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Cột 1 & 2: Danh sách sản phẩm */}
                          <div className="md:col-span-2 space-y-4">
                            <h4 className="font-bold text-sm text-gray-700 mb-2">Sản phẩm đã mua</h4>
                            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl p-3 bg-gray-50/30">
                              {order.items.map((item: any) => (
                                <div key={item.id} className="py-2.5 flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 p-1 flex items-center justify-center shrink-0">
                                      {item.product.image ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                          src={item.product.image}
                                          alt={item.product.name}
                                          className="w-full h-full object-contain"
                                        />
                                      ) : (
                                        <span className="text-[10px] text-gray-400 font-bold">NO IMG</span>
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                                        {item.product.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {new Intl.NumberFormat("vi-VN").format(item.price)}₫ x {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-sm font-bold text-gray-700 shrink-0">
                                    {new Intl.NumberFormat("vi-VN").format(item.price * item.quantity)}₫
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Cột 3: Thông tin giao nhận */}
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-xs space-y-3">
                            <h4 className="font-bold text-sm text-gray-800 mb-3 pb-1 border-b">
                              Thông tin người nhận
                            </h4>
                            <div className="flex items-center gap-2 text-gray-700">
                              <User size={14} className="text-blue-600 shrink-0" />
                              <span className="font-semibold">{order.customerName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Phone size={14} className="text-blue-600 shrink-0" />
                              <span>{order.phone}</span>
                            </div>
                            <div className="flex items-start gap-2 text-gray-700">
                              <MapPin size={14} className="text-blue-600 shrink-0 mt-0.5" />
                              <span>{order.address}</span>
                            </div>

                            <div className="pt-3 border-t border-gray-200 mt-4 space-y-1">
                              <div className="flex justify-between text-gray-500">
                                <span>Hình thức:</span>
                                <span className="font-semibold text-gray-700">Thanh toán COD</span>
                              </div>
                              <div className="flex justify-between text-gray-900 text-sm font-bold pt-1">
                                <span>Tổng cộng:</span>
                                <span className="text-blue-600">
                                  {new Intl.NumberFormat("vi-VN").format(order.totalAmount)}₫
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
