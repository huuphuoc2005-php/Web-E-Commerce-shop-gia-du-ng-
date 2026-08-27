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
              Nhập <span className="font-semibold text-gray-700">Mã đơn hàng</span> hoặc{" "}
              <span className="font-semibold text-gray-700">Số điện thoại đặt hàng</span> để kiểm tra tình trạng vận chuyển.
            </p>
          </div>

          {/* Form tìm kiếm */}
          <form action="/tracking" method="GET" className="max-w-xl mx-auto mb-10">
            <div className="relative flex items-center shadow-sm rounded-2xl overflow-hidden bg-white border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition">
              <input
                type="text"
                name="query"
                defaultValue={searchQuery}
                placeholder="Nhập SĐT (vd: 0869...) hoặc Mã đơn..."
                className="w-full text-black py-4 pl-5 pr-14 text-base outline-none bg-transparent"
                required
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

          {/* Kết quả tìm kiếm */}
          {searchQuery && (
            <div>
              {!result || !result.success ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm max-w-xl mx-auto">
                  <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Không tìm thấy đơn hàng</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    {result?.message || `Không tìm thấy thông tin phù hợp với "${searchQuery}".`}
                  </p>
                  <p className="text-xs text-gray-400">
                    Vui lòng kiểm tra lại số điện thoại hoặc mã đơn hàng (được gửi sau khi đặt hàng).
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <p className="text-sm font-semibold text-gray-600 text-center">
                    Tìm thấy <span className="text-blue-600">{result.orders.length}</span> đơn hàng phù hợp
                  </p>

                  {result.orders.map((order) => {
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
                              {order.items.map((item) => (
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
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
