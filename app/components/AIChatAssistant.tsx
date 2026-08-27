"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, ShoppingBag, CheckCircle, Image as ImageIcon, Camera, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import Link from "next/link";
import { askGeminiAssistant } from "@/lib/gemini";

interface ProductRecommendation {
  id: string;
  name: string;
  price: number;
  image: string;
  modelNumber?: string;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  imagePreview?: string;
  recommendations?: ProductRecommendation[];
}

const presetPrompts = [
  { label: "📸 Đọc ảnh sơ đồ điện phòng", query: "Phân tích bản vẽ điện này và gợi ý vật tư cho tôi" },
  { label: "⚡ Phân tích hóa đơn EVN", query: "Phân tích hóa đơn tiền điện này và cách tiết kiệm điện" },
  { label: "🔧 Đọc nhãn thiết bị cũ", query: "Đọc nhãn mác thiết bị cũ này và tư vấn loại thay thế tương đương" },
  { label: "🛡️ Chọn Aptomat chống giật", query: "Tôi muốn chọn Aptomat chống giật an toàn cho gia đình" },
];

const mockKnowledge: Record<string, { text: string; products: ProductRecommendation[] }> = {
  "aptomat": {
    text: "Chào bạn! Để bảo vệ an toàn chống điện giật cho gia đình, bạn nên dùng **Aptomat chống giật Schneider 2P 40A 30mA (EZ9R33240)**. Thiết bị phát hiện dòng rò cực nhạy 30mA và ngắt điện trong 0.03 giây. Hoặc dùng **Aptomat Panasonic 2P 32A** làm aptomat tổng tầng.",
    products: [
      { id: "cm-01", name: "Aptomat Chống giật RCCB Schneider 2P 40A 30mA", price: 490000, image: "/images/congtacdoi2chieusino.png", modelNumber: "EZ9R33240" },
      { id: "cm-02", name: "Aptomat Cầu dao tự động Panasonic 2P 32A", price: 135000, image: "/images/banner-premium-plumbing-3.png", modelNumber: "MCB-BBN2322" }
    ]
  },
  "đèn": {
    text: "Đối với phòng diện tích khoảng 20m², bạn nên bố trí **3 đến 4 bóng đèn LED Bulb 20W Rạng Đông** (quang thông 1800lm/bóng) hoặc **6 đến 8 đèn LED Âm trần 9W 3 Màu** để ánh sáng lan tỏa đều, không chói mắt và tiết kiệm 85% điện!",
    products: [
      { id: "cm-03", name: "Bóng đèn LED Bulb Trụ Nhôm 20W Rạng Đông", price: 45000, image: "/images/LED-buildtru-nhomnhua20W.jpg", modelNumber: "LED-A80/20W" },
      { id: "cm-04", name: "Đèn LED Âm trần Downlight 9W 3 Màu Rạng Đông", price: 85000, image: "/images/LED-buildtru-nhomnhua20W.jpg", modelNumber: "AT10-9W3M" }
    ]
  },
  "smart": {
    text: "Để nâng cấp Nhà thông minh đơn giản nhất, bạn có thể dùng **Công tắc cảm ứng Tuya Wifi 3 nút mặt kính đen** (bật tắt đèn từ xa qua điện thoại) hoặc **Ổ cắm âm tường Tuya Wifi 16A** có tính năng hẹn giờ sạc tự động ngắt!",
    products: [
      { id: "cm-05", name: "Công tắc cảm ứng Tuya Smart Wifi 3 Nút Kính đen", price: 320000, image: "/images/congtacdoi2chieusino.png", modelNumber: "Tuya-SW3-BLK" },
      { id: "cm-06", name: "Tuya Smart Wifi Ổ cắm âm tường đơn US Trắng", price: 210000, image: "/images/banner-ocam.png", modelNumber: "Tuya-WUS-1P" }
    ]
  },
  "vòi": {
    text: "Nếu nguồn nước ở tầng trên hoặc nước bị yếu, bạn nên chọn **Bát sen tắm tăng áp Mặt inox 304 (SEN-TA-03)**. Đĩa inox khoan lỗ Laser siêu mịn giúp tăng áp lực nước phun mạnh gấp 300% và tiết kiệm 30% nước!",
    products: [
      { id: "cm-07", name: "Vòi sen tắm tăng áp Mặt inox Cụm bát sen 3 chế độ", price: 95000, image: "/images/banner-premium-plumbing-3.png", modelNumber: "SEN-TA-03" },
      { id: "cm-08", name: "Vòi hồ xả nước inox 304 tay gạt phi 21", price: 68000, image: "/images/banner-premium-plumbing-3.png", modelNumber: "VH-INOX-21" }
    ]
  }
};

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageMime, setSelectedImageMime] = useState<string>("image/jpeg");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Xin chào! Tôi là Trợ lý AI của Phú Lâm Store. Tôi có thể giúp bạn chọn Aptomat, tính bóng đèn, hoặc 📸 ĐỌC ẢNH SƠ ĐỒ ĐIỆN / HÓA ĐƠN EVN / NHÃN THIẾT BỊ ĐIỆN để tư vấn trực tiếp. Bạn cần hỗ trợ gì ạ?",
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addItem = useCart((state) => state.addItem);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Xử lý chọn ảnh từ máy tính / điện thoại
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn định dạng file hình ảnh (JPG, PNG, WEBP)!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Str = reader.result as string;
      setSelectedImage(base64Str);
      setSelectedImageMime(file.type);
      toast.success("Đã đính kèm ảnh! Bấm Gửi để AI Gemini Vision phân tích.", { position: "bottom-right" });
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query && !selectedImage) return;

    const currentImage = selectedImage;
    const currentMime = selectedImageMime;

    // Reset ô nhập & ảnh ngay lập tức
    if (!textToSend) setInput("");
    setSelectedImage(null);

    const userMsgId = Date.now().toString();
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: "user",
        text: query || (currentImage ? "📸 [Đã tải ảnh lên để phân tích]" : ""),
        imagePreview: currentImage || undefined,
      },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    // Phân tích từ khóa để chọn sản phẩm gợi ý kèm theo
    const qLower = (query || "").toLowerCase();
    let recProducts: ProductRecommendation[] = [];

    if (qLower.includes("aptomat") || qLower.includes("chống giật") || qLower.includes("cầu dao") || currentImage) {
      recProducts = mockKnowledge["aptomat"].products;
    } else if (qLower.includes("đèn") || qLower.includes("bóng") || qLower.includes("led") || qLower.includes("phòng")) {
      recProducts = mockKnowledge["đèn"].products;
    } else if (qLower.includes("smart") || qLower.includes("tuya") || qLower.includes("wifi") || qLower.includes("thông minh")) {
      recProducts = mockKnowledge["smart"].products;
    } else if (qLower.includes("vòi") || qLower.includes("sen") || qLower.includes("nước") || qLower.includes("van")) {
      recProducts = mockKnowledge["vòi"].products;
    }

    // Gọi Server Action kết nối Google Gemini API (Multimodal Vision)
    const res = await askGeminiAssistant(query, currentImage || undefined, currentMime);

    setIsLoading(false);
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: res.text,
        recommendations: recProducts.length > 0 ? recProducts : undefined,
      },
    ]);
  };

  const handleAddToCart = (p: ProductRecommendation) => {
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      quantity: 1,
      selected: true,
    });
    toast.success(`Đã thêm ${p.name} vào giỏ hàng!`, { position: "bottom-right" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* NÚT TRÒN BẤM MỞ AI CHAT */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-white/40"
        >
          <Bot size={28} className="animate-bounce" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />

          {/* Tooltip nhỏ */}
          <div className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
            💬 Hỏi Trợ lý Kỹ Thuật (Hỗ trợ chụp ảnh 📸)
          </div>
        </button>
      )}

      {/* CỬA SỔ WIDGET CHAT AI */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-[360px] sm:w-[420px] h-[580px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* HEADER CHAT */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-yellow-300">
                <Sparkles size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  Trợ lý Tư vấn Phú Lâm <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-normal">Online 24/7</span>
                </h3>
                <p className="text-[11px] text-blue-200">Đọc ảnh sơ đồ & Tư vấn kỹ thuật 24/7</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* KHUNG NỘI DUNG CHAT */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/60 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                {/* Ảnh xem trước nếu người dùng gửi ảnh */}
                {m.imagePreview && (
                  <div className="mb-1.5 max-w-[200px] rounded-xl overflow-hidden border-2 border-blue-500 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.imagePreview} alt="Ảnh người dùng gửi" className="w-full h-auto object-cover" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${m.sender === "user"
                    ? "bg-blue-600 text-white font-medium rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-none"
                    }`}
                >
                  {m.text}
                </div>

                {/* THẺ SẢN PHẨM GỢI Ý NGAY TRONG CHAT */}
                {m.recommendations && m.recommendations.length > 0 && (
                  <div className="mt-3 space-y-2.5 w-full">
                    <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                      <CheckCircle size={13} className="text-emerald-500" /> Sản phẩm khuyên dùng:
                    </p>
                    {m.recommendations.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-3 hover:border-blue-300 transition"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg p-0.5 shrink-0 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.image} alt="" className="w-full h-full object-contain" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-bold text-gray-800 text-[11px] truncate">{p.name}</p>
                            <p className="text-red-600 font-bold text-[11px]">
                              {new Intl.NumberFormat("vi-VN").format(p.price)}₫
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddToCart(p)}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-2.5 py-1.5 rounded-lg font-bold text-[10px] transition shrink-0 flex items-center gap-1"
                        >
                          <ShoppingBag size={12} /> Thêm giỏ
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Trạng thái đang tải */}
            {isLoading && (
              <div className="flex items-center gap-2 text-blue-600 font-medium text-[11px] bg-blue-50 p-2.5 rounded-xl w-fit animate-pulse border border-blue-100">
                <Sparkles size={14} className="animate-spin" /> Gemini Vision đang đọc dữ liệu & phân tích...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* GỢI Ý CÂU HỎI NHANH */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto scrollbar-none">
            {presetPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt.query)}
                className="bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition border border-gray-200"
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* XEM TRƯỚC ẢNH ĐANG CHỌN */}
          {selectedImage && (
            <div className="px-3 py-2 bg-blue-50/80 border-t border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-blue-300 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="text-[11px]">
                  <p className="font-bold text-blue-900">Đã chọn 1 hình ảnh</p>
                  <p className="text-blue-600 text-[10px]">Sẵn sàng gửi tới Gemini Vision</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="text-red-500 hover:bg-red-100 p-1.5 rounded-lg transition"
                title="Xóa ảnh"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}

          {/* Ô NHẬP NỘI DUNG CHAT */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            {/* Input file ẩn */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            {/* Nút bấm tải ảnh */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-xl transition border border-gray-200 shrink-0 flex items-center justify-center"
              title="Gửi ảnh bản vẽ, hóa đơn hoặc nhãn thiết bị"
            >
              <Camera size={18} />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedImage ? "Nhập thêm ghi chú (nếu có)..." : "Hỏi hoặc bấm 📷 để tải ảnh bản vẽ/hóa đơn..."}
              className="flex-1 text-black bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-xl text-xs outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition shadow-md shadow-blue-100 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
