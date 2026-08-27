import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

type SuccessPageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const orderId = params.orderId;
  const shortOrderId = orderId ? orderId.slice(-8).toUpperCase() : null;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
      <div className="text-center max-w-md w-full">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle size={48} strokeWidth={3} />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Đặt hàng thành công!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Cảm ơn bạn đã ủng hộ <b>Phú Lâm Store</b>. Đơn hàng của bạn đang được đóng gói và sẽ giao sớm nhất.
        </p>

        {orderId && (
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-8 text-left">
            <p className="text-sm text-gray-500 mb-1">Mã đơn hàng của bạn:</p>
            <p className="font-mono font-bold text-lg text-blue-600 break-all">#{shortOrderId}</p>
            <p className="text-xs text-gray-400 mt-2">Vui lòng lưu lại mã này khi cần tra cứu.</p>
          </div>
        )}

        <div className="space-y-3">
          {orderId && (
            <Link
              href={`/tracking?query=${orderId}`}
              className="block w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Theo dõi tiến độ đơn hàng
            </Link>
          )}

          <Link
            href="/"
            className="block w-full bg-white text-gray-700 border border-gray-200 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
