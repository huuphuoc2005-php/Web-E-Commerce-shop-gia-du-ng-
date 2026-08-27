"use client";

import { useState } from "react";
import { Star, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { createProductReview } from "@/lib/actions";
import { toast } from "sonner";

interface ReviewItem {
  id: string;
  rating: number;
  authorName: string;
  comment: string | null;
  createdAt: Date;
}

interface ProductReviewSectionProps {
  productId: string;
  reviews: ReviewItem[];
}

export default function ProductReviewSection({ productId, reviews }: ProductReviewSectionProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("productId", productId);
    formData.append("rating", rating.toString());

    try {
      const res = await createProductReview(formData);
      if (res.success) {
        toast.success(res.message);
        (e.target as HTMLFormElement).reset();
        setRating(5);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Lỗi khi gửi đánh giá");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 shadow-sm mt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="text-blue-600" /> Đánh giá & Nhận xét sản phẩm
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Tổng cộng <span className="font-bold text-gray-800">{reviews.length}</span> lượt đánh giá từ người mua
          </p>
        </div>

        {/* Thống kê điểm sao */}
        <div className="flex items-center gap-4 bg-amber-50/60 border border-amber-100 px-6 py-3 rounded-2xl w-fit">
          <span className="text-4xl font-extrabold text-amber-500">{averageRating}</span>
          <div>
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={18}
                  fill={s <= Math.round(Number(averageRating)) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Độ hài lòng cao</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
        {/* CỘT TRÁI: FORM GỬI ĐÁNH GIÁ */}
        <div className="bg-gray-50/70 rounded-xl p-6 border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-4 text-base">Viết nhận xét của bạn</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Đánh giá sản phẩm:</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 hover:scale-125 transition-transform text-amber-400 focus:outline-none"
                  >
                    <Star
                      size={24}
                      fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-600">Tên người đánh giá (Tùy chọn)</label>
                <span className="text-[11px] text-blue-600 italic">Để trống = Đăng ẩn danh</span>
              </div>
              <input
                name="authorName"
                placeholder="Ví dụ: Anh Tuấn (hoặc để trống để ẩn danh)..."
                className="w-full text-black px-3.5 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Nhận xét thực tế</label>
              <textarea
                name="comment"
                rows={3}
                placeholder="Sản phẩm dùng tốt không, giao hàng nhanh không..."
                className="w-full text-black p-3 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm disabled:opacity-70"
            >
              <Send size={16} /> {loading ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </form>
        </div>

        {/* CỘT PHẢI: DANH SÁCH BÌNH LUẬN */}
        <div className="lg:col-span-2 space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              <MessageSquare className="mx-auto text-gray-300 mb-2" size={32} />
              <p className="text-gray-500 text-sm font-medium">Chưa có đánh giá nào cho sản phẩm này.</p>
              <p className="text-xs text-gray-400 mt-1">Hãy là người đầu tiên để lại nhận xét nhé!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 rounded-xl border border-gray-100 bg-white shadow-2xs">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center ${
                        r.authorName === "Người dùng ẩn danh" ? "bg-gray-100 text-gray-500 border border-gray-200" : "bg-blue-100 text-blue-700"
                      }`}>
                        {r.authorName === "Người dùng ẩn danh" ? "👤" : r.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className={`font-bold text-sm ${r.authorName === "Người dùng ẩn danh" ? "text-gray-500 italic font-normal" : "text-gray-800"}`}>
                          {r.authorName}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-0.5">
                          <CheckCircle2 size={12} /> Đã mua hàng
                        </div>
                      </div>
                    </div>

                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} fill={s <= r.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>

                  {r.comment && (
                    <p className="text-gray-700 text-sm mt-2 leading-relaxed bg-gray-50/60 p-3 rounded-lg border border-gray-100">
                      {r.comment}
                    </p>
                  )}

                  <span className="text-[10px] text-gray-400 block mt-2">
                    {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
