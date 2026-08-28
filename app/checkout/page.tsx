  "use client";

  import { useCart } from "@/lib/cart";
  import { createOrder, applyVoucher } from "@/lib/actions";
  import Header from "@/app/components/Header";
  import Footer from "@/app/components/Footer";
  import { useState } from "react";
  import { toast } from "sonner";
  import { useRouter } from "next/navigation";
  import { MapPin, Phone, User, ShoppingBag, Ticket, CheckCircle2 } from "lucide-react";

  export default function CheckoutPage() {
    const { items, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Voucher state
    const [voucherCodeInput, setVoucherCodeInput] = useState("");
    const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discountAmount: number } | null>(null);
    const [checkingVoucher, setCheckingVoucher] = useState(false);

    // Tính tổng tiền hiển thị
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = appliedVoucher ? appliedVoucher.discountAmount : 0;
    const finalTotalAmount = Math.max(0, subtotal - discountAmount);

    const handleApplyVoucher = async () => {
      if (!voucherCodeInput.trim()) {
        toast.error("Vui lòng nhập mã giảm giá");
        return;
      }
      setCheckingVoucher(true);
      try {
        const res = await applyVoucher(voucherCodeInput, subtotal);
        if (res.success) {
          setAppliedVoucher({ code: res.code!, discountAmount: res.discountAmount });
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Không thể áp dụng mã giảm giá");
      } finally {
        setCheckingVoucher(false);
      }
    };

    // Payment Method state
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "transfer">("cod");

    // Xử lý khi bấm nút Đặt Hàng
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const customerInfo = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        voucherCode: appliedVoucher ? appliedVoucher.code : undefined,
      };

      try {
        const order = await createOrder(customerInfo, items);

        clearCart();
        toast.success(paymentMethod === "transfer" ? "Đã nhận xác nhận chuyển khoản! Đặt hàng thành công." : "Đặt hàng thành công!");
        router.push(`/checkout/success?orderId=${order.id}`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Lỗi: Không thể tạo đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    // Nếu giỏ hàng trống thì đuổi về trang chủ
    if (items.length === 0) {
      return (
          <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans">
              <ShoppingBag size={64} className="text-gray-300 mb-4"/>
              <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống.</p>
              <button onClick={() => router.push("/")} className="text-blue-600 font-bold hover:underline">Quay lại mua sắm</button>
          </div>
      )
    }

    // URL VietQR tạo động theo số tiền đơn hàng
    const vietQrUrl = `https://img.vietqr.io/image/MB-2305012005-compact2.png?amount=${finalTotalAmount}&addInfo=PHULAM%20STORE%20THANHTOAN&accountName=PHAM%20HUU%20PHUOC`;

    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center uppercase tracking-wide">
              Xác nhận đơn hàng
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* CỘT TRÁI: FORM NHẬP THÔNG TIN */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b">
                    <MapPin className="text-blue-600" size={20}/> 1. Thông tin giao hàng
                </h2>
                
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Họ và tên</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18}/>
                        <input name="name" required placeholder="Ví dụ: Phạm Hữu Phước" className="w-full pl-10 text-black pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Số điện thoại</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={18}/>
                        <input name="phone" required placeholder="Ví dụ: 0924..." className="w-full pl-10 pr-4 py-2.5 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Địa chỉ nhận hàng</label>
                    <textarea name="address" required placeholder="Số nhà, đường, xã/phường..." rows={3} className="w-full p-3 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                  </div>
                </form>
              </div>

              {/* CHỌN PHƯƠNG THỨC THANH TOÁN */}
              <div className="pt-2">
                <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b">
                    <Ticket className="text-blue-600" size={20}/> 2. Phương thức thanh toán
                </h2>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition ${
                      paymentMethod === "cod"
                        ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-500/20"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <span className="font-bold text-xs flex items-center gap-1.5">
                      💵 Thanh toán COD
                    </span>
                    <span className="text-[11px] text-gray-500">Tiền mặt khi nhận hàng</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("transfer")}
                    className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition ${
                      paymentMethod === "transfer"
                        ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-500/20"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <span className="font-bold text-xs flex items-center gap-1.5">
                      💳 Chuyển khoản QR
                    </span>
                    <span className="text-[11px] text-gray-500">Mã VietQR MB Bank</span>
                  </button>
                </div>

                {/* KHUNG MÃ QR VIETQR KHI CHỌN CHUYỂN KHOẢN */}
                {paymentMethod === "transfer" && (
                  <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-5 rounded-2xl shadow-md space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-white/20 pb-3">
                      <div>
                        <p className="text-xs text-blue-200 uppercase font-bold">Thanh toán qua Ngân hàng</p>
                        <p className="text-base font-black text-yellow-400">MB BANK (Ngân hàng Quân Đội)</p>
                      </div>
                      <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded font-bold">VietQR</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 p-3 rounded-xl border border-white/10">
                      <div className="bg-white p-2 rounded-xl shrink-0 shadow-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={vietQrUrl}
                          alt="VietQR MB Bank PHAM HUU PHUOC"
                          className="w-36 h-36 object-contain"
                        />
                      </div>

                      <div className="space-y-2 text-xs w-full">
                        <div>
                          <p className="text-blue-200 text-[11px]">Tên chủ tài khoản:</p>
                          <p className="font-bold text-sm text-yellow-300">PHAM HUU PHUOC</p>
                        </div>
                        <div>
                          <p className="text-blue-200 text-[11px]">Số tài khoản MB Bank:</p>
                          <div className="flex items-center justify-between bg-black/30 px-2.5 py-1.5 rounded border border-white/20">
                            <span className="font-mono font-bold text-sm text-white">2305012005</span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText("2305012005");
                                toast.success("Đã sao chép Số tài khoản MB Bank!");
                              }}
                              className="text-[10px] bg-yellow-400 text-blue-950 font-extrabold px-2 py-0.5 rounded hover:bg-yellow-300"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-blue-200 text-[11px]">Số tiền cần quét:</p>
                          <p className="font-bold text-base text-emerald-400">
                            {new Intl.NumberFormat("vi-VN").format(finalTotalAmount)}₫
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CỘT PHẢI: KIỂM TRA ĐƠN HÀNG */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h2 className="font-bold text-gray-800 mb-6 pb-2 border-b">Đơn hàng của bạn</h2>
              
              {/* List sản phẩm cuộn được nếu dài */}
              <div className="space-y-4 mb-6 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {item.image && <img src={item.image} alt="" className="w-full h-full object-contain p-1"/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      {new Intl.NumberFormat("vi-VN").format(item.price * item.quantity)}₫
                    </span>
                  </div>
                ))}
              </div>

              {/* Ô NHẬP MÃ GIẢM GIÁ */}
              <div className="mb-6 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Ticket size={16} className="text-blue-600" /> Mã giảm giá / Voucher
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCodeInput}
                    onChange={(e) => setVoucherCodeInput(e.target.value.toUpperCase())}
                    placeholder="Nhập PHULAM10, GIAM50K..."
                    className="flex-1 px-3 py-2 text-sm text-black uppercase font-bold bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyVoucher}
                    disabled={checkingVoucher}
                    className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-xs font-bold transition disabled:opacity-50"
                  >
                    {checkingVoucher ? "..." : "Áp dụng"}
                  </button>
                </div>
                {appliedVoucher && (
                  <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Đã áp dụng mã {appliedVoucher.code} (-{new Intl.NumberFormat("vi-VN").format(appliedVoucher.discountAmount)}₫)
                  </p>
                )}
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600 text-sm">
                      <span>Tạm tính:</span>
                      <span>{new Intl.NumberFormat("vi-VN").format(subtotal)}₫</span>
                  </div>
                  {appliedVoucher && (
                    <div className="flex justify-between text-emerald-600 text-sm font-semibold">
                        <span>Giảm giá ({appliedVoucher.code}):</span>
                        <span>-{new Intl.NumberFormat("vi-VN").format(discountAmount)}₫</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 text-sm">
                      <span>Phí vận chuyển:</span>
                      <span className="text-green-600 font-bold">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-blue-600 pt-3 mt-1">
                      <span>Tổng cộng:</span>
                      <span>{new Intl.NumberFormat("vi-VN").format(finalTotalAmount)}₫</span>
                  </div>
              </div>

              <button 
                  type="submit" 
                  form="checkout-form"
                  disabled={loading}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:scale-[1.01] transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                  {loading ? "Đang xử lý..." : paymentMethod === "transfer" ? "ĐÃ CHUYỂN KHOẢN - XÁC NHẬN ĐƠN" : "XÁC NHẬN ĐẶT HÀNG (COD)"}
              </button>
              <p className="text-[10px] text-center text-gray-400 mt-3">
                {paymentMethod === "transfer" ? "Quét mã QR VietQR MB Bank ở cột bên trái để hoàn tất." : "Thanh toán tiền mặt khi nhận hàng. Kiểm tra hàng thoải mái."}
              </p>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    );
  }