"use client";

import { useState } from "react";
import { FileText, Sliders, ShieldCheck, Truck, CheckCircle } from "lucide-react";
import { productDataMap, ProductDetailInfo } from "@/lib/productDataMap";

interface ProductDetailTabsProps {
  product: {
    id: string;
    name: string;
    modelNumber?: string | null;
    description?: string | null;
    aiLabels?: string | null;
    category?: { name: string } | null;
    stock: number;
    price: number;
  };
}

function getExactProductDetails(product: ProductDetailTabsProps["product"]): ProductDetailInfo {
  // 1. Kiểm tra theo Model chính xác
  if (product.modelNumber && productDataMap[product.modelNumber]) {
    return productDataMap[product.modelNumber];
  }

  // 2. Tìm kiếm theo tên sản phẩm trùng khớp trong productDataMap
  const keys = Object.keys(productDataMap);
  for (const k of keys) {
    const item = productDataMap[k];
    if (product.name.toLowerCase().includes(item.modelMatch?.toLowerCase() || "") || product.name.toLowerCase().includes(k.toLowerCase())) {
      return item;
    }
  }

  // 3. Nếu sản phẩm mới do người dùng tự tạo ở Admin, tạo thông tin cụ thể dựa trên tên sản phẩm
  const name = product.name;
  return {
    nameMatch: name,
    modelMatch: product.modelNumber || "Chưa có mã SKU",
    exactDescription: product.description || `Sản phẩm ${name} chính hãng phân phối tại Phú Lâm Store, đảm bảo đầy đủ giấy tờ chứng nhận và tiêu chuẩn chất lượng.`,
    highlights: [
      `Chế tạo từ vật liệu cao cấp, độ bền tối đa dành riêng cho ${name}.`,
      `Đáp ứng các tiêu chuẩn an toàn kỹ thuật, hoạt động ổn định và lâu dài.`,
      `Thiết kế tối ưu công năng sử dụng, dễ dàng lắp đặt và bảo trì.`,
      `Cam kết sản phẩm mới 100%, bảo hành chính hãng 12 tháng tại Phú Lâm Store.`,
    ],
    usage: [
      `Sử dụng đúng mục đích thiết kế của ${name} cho công trình hoặc sinh hoạt gia đình.`,
      `Đọc kỹ hướng dẫn an toàn trước khi vận hành hoặc thi công lắp đặt.`,
      `Bảo quản ở nơi khô ráo, thoáng mát để duy trì tuổi thọ sản phẩm tốt nhất.`,
    ],
    specs: [
      { label: "Tên sản phẩm", value: name },
      { label: "Mã sản phẩm / Model", value: product.modelNumber || "Đang cập nhật" },
      { label: "Phân loại danh mục", value: product.category?.name || "Hàng chính hãng" },
      { label: "Giá niêm yết", value: `${new Intl.NumberFormat("vi-VN").format(product.price)}₫` },
      { label: "Tình trạng kho hàng", value: product.stock > 0 ? `Còn hàng (${product.stock} sp)` : "Hết hàng" },
    ],
  };
}

export default function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "policy">("description");

  const details = getExactProductDetails(product);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 shadow-sm mt-8">
      {/* THANH TABS BẤM CHUYỂN */}
      <div className="flex gap-2 border-b border-gray-100 overflow-x-auto pb-4">
        <button
          onClick={() => setActiveTab("description")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition whitespace-nowrap ${
            activeTab === "description"
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
          }`}
        >
          <FileText size={18} /> Mô tả chi tiết & Công dụng
        </button>

        <button
          onClick={() => setActiveTab("specs")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition whitespace-nowrap ${
            activeTab === "specs"
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
          }`}
        >
          <Sliders size={18} /> Thông số kỹ thuật
        </button>

        <button
          onClick={() => setActiveTab("policy")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition whitespace-nowrap ${
            activeTab === "policy"
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
          }`}
        >
          <ShieldCheck size={18} /> Chính sách bảo hành & Giao hàng
        </button>
      </div>

      {/* NỘI DUNG TAB 1: MÔ TẢ CHI TIẾT & CÔNG DỤNG RÊNG BIỆT */}
      {activeTab === "description" && (
        <div className="mt-8 space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="text-blue-600" size={20} /> Giới thiệu & Công dụng của {product.name}
            </h3>
            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/80 text-gray-800 leading-relaxed font-medium">
              {details.exactDescription}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-100 p-5 rounded-2xl bg-gray-50/60">
              <h4 className="font-bold text-gray-900 mb-3 text-base flex items-center gap-2">
                ✨ Đặc điểm & Ưu điểm riêng của sản phẩm:
              </h4>
              <ul className="space-y-3 text-xs md:text-sm text-gray-600">
                {details.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-gray-100 p-5 rounded-2xl bg-green-50/40">
              <h4 className="font-bold text-gray-900 mb-3 text-base flex items-center gap-2">
                💡 Hướng dẫn sử dụng & Thi công đúng chuẩn:
              </h4>
              <ul className="space-y-3 text-xs md:text-sm text-gray-600">
                {details.usage.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* NỘI DUNG TAB 2: THÔNG SỐ KỸ THUẬT RÊNG BIỆT */}
      {activeTab === "specs" && (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sliders className="text-blue-600" size={20} /> Bảng thông số kỹ thuật chuẩn của {product.name}
          </h3>

          <div className="border border-gray-200 rounded-2xl overflow-hidden max-w-3xl">
            <table className="w-full text-left text-sm border-collapse">
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-gray-50/80">
                  <td className="px-5 py-3.5 font-semibold text-gray-600 w-1/3 border-r border-gray-100">Tên vật dụng</td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">{product.name}</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-semibold text-gray-600 border-r border-gray-100">Mã Model / SKU</td>
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-600">{product.modelNumber || "Chưa có mã SKU"}</td>
                </tr>
                <tr className="bg-gray-50/80">
                  <td className="px-5 py-3.5 font-semibold text-gray-600 border-r border-gray-100">Danh mục sản phẩm</td>
                  <td className="px-5 py-3.5 text-gray-800 font-medium">{product.category?.name || "Hàng chính hãng"}</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-semibold text-gray-600 border-r border-gray-100">Giá bán niêm yết</td>
                  <td className="px-5 py-3.5 font-bold text-red-600">
                    {new Intl.NumberFormat("vi-VN").format(product.price)}₫
                  </td>
                </tr>

                {/* Các thông số kỹ thuật đặc thù của sản phẩm */}
                {details.specs.map((s, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50/80" : ""}>
                    <td className="px-5 py-3.5 font-semibold text-gray-600 border-r border-gray-100">{s.label}</td>
                    <td className="px-5 py-3.5 text-gray-800 font-medium">{s.value}</td>
                  </tr>
                ))}

                <tr className="bg-gray-50/80">
                  <td className="px-5 py-3.5 font-semibold text-gray-600 border-r border-gray-100">Tình trạng kho hàng</td>
                  <td className="px-5 py-3.5 font-semibold text-green-600">
                    {product.stock > 0 ? `Còn hàng (${product.stock} sản phẩm sẵn sàng giao)` : "Hết hàng"}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-semibold text-gray-600 border-r border-gray-100">Bảo hành chính hãng</td>
                  <td className="px-5 py-3.5 text-gray-800 font-medium">12 Tháng (Đổi mới trong 7 ngày nếu có lỗi kỹ thuật)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* NỘI DUNG TAB 3: CHÍNH SÁCH BẢO HÀNH */}
      {activeTab === "policy" && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/40">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-2">Bảo hành 12 Tháng chính hãng</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tất cả sản phẩm {product.name} bán ra đều có tem bảo hành chính hãng. Cam kết 1 đổi 1 trong 7 ngày nếu phát hiện lỗi sản xuất.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-green-100 bg-green-50/40">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                <Truck size={24} />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-2">Giao hàng nhanh 2 giờ</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Giao hỏa tốc nội thành Hải Phòng trong 2h. Ship COD giao tận nhà toàn quốc. Cho phép mở hàng kiểm tra đầy đủ trước khi thanh toán.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-amber-100 bg-amber-50/40">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-3">
                <CheckCircle size={24} />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-2">Hỗ trợ thợ kỹ thuật 24/7</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tư vấn miễn phí quy cách đấu nối, kỹ thuật thi công chuẩn an toàn cho {product.name}. Hotline/Zalo hỗ trợ: 0869.001.296.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
