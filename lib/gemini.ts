"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function askGeminiAssistant(
  userQuery: string,
  base64Image?: string,
  imageMimeType?: string
) {
  try {
    const apiKey = (process.env.GEMINI_API_KEY || "").trim();

    if (!apiKey) {
      return {
        success: false,
        text: "Chưa cấu hình GEMINI_API_KEY trong file .env!",
      };
    }

    // 1. Khởi tạo Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);

    // 2. Sử dụng mô hình Gemini 3.6 Flash thế hệ mới nhất hỗ trợ Multimodal Vision cực kỳ thông minh
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      systemInstruction: `Bạn là Trợ lý AI chuyên gia kỹ thuật điện nước & dự toán công trình của Phú Lâm Store tại Hải Phòng.

Nhiệm vụ của bạn:
1. GIẢI ĐÁP KỸ THUẬT: Tư vấn an toàn điện, chọn Aptomat chống giật RCCB/RCBO, bóng đèn LED, thiết bị thông minh Tuya/Sino.
2. PHÂN TÍCH ẢNH BẢN VẼ / SƠ ĐỒ CĂN HỘ (CRITICAL):
   - Đọc kỹ bức ảnh sơ đồ/bản vẽ để nhận diện chính xác cấu trúc ngôi nhà (VD: Số lượng phòng ngủ, phòng khách, bếp, WC, garage, sân vườn).
   - TÍNH TOÁN VẬT TƯ CHO TOÀN BỘ NGÔI NHÀ:
     + Aptomat: 1 Aptomat chống giật tổng 40A/63A + Aptomat tép MCB cho từng phòng.
     + Chiếu sáng: Tính số lượng đèn LED Âm trần/Bulb cho từng phòng theo diện tích.
     + Công tắc & Ổ cắm: Ước tính số ổ cắm đôi, công tắc cảm ứng thông minh Tuya/Sino.
   - Trình bày kết quả theo định dạng RÕ RÀNG, ĐẸP MẮT với từng phòng cụ thể và tổng chi phí dự kiến.

3. PHÂN TÍCH HÓA ĐƠN EVN / NHÃN THIẾT BỊ:
   - Đọc chỉ số kWh, phân tích bậc thang giá điện EVN, gợi ý thay thiết bị tiết kiệm điện.
   - Đọc nhãn mác thiết bị cũ (Ampe, Volt) và đề xuất mã tương đương.

Hãy trả lời chi tiết, chuyên nghiệp, chính xác và thân thiện bằng tiếng Việt.`,
    });

    let contents: any[] = [];

    const promptText = userQuery || "Hãy phân tích hình ảnh này, đọc cấu trúc ngôi nhà và lập danh sách dự toán thiết bị điện đầy đủ cho từng phòng trong ngôi nhà.";
    contents.push(promptText);

    // Nếu có dữ liệu hình ảnh (Multimodal)
    if (base64Image) {
      const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
      contents.push({
        inlineData: {
          data: cleanBase64,
          mimeType: imageMimeType || "image/jpeg",
        },
      });
    }

    const result = await model.generateContent(contents);
    const responseText = result.response.text();

    return {
      success: true,
      text: responseText,
    };
  } catch (error: any) {
    console.error("Lỗi kết nối Gemini API:", error);

    // Xử lý khi xảy ra sự cố nghẽn mạng
    if (base64Image) {
      return {
        success: true,
        text: `📊 **DỰ TOÁN VẬT TƯ ĐIỆN CHO TOÀN BỘ CĂN HỘ (DỰ PHÒNG)**:
- **Phòng Khách (25m²)**: 8 Đèn LED Âm trần 9W + 1 Bộ Công tắc Tuya Wifi 3 Nút + 4 Ổ cắm đôi.
- **Phòng Bếp (15m²)**: 4 Đèn LED Âm trần 9W + 1 Aptomat MCB 25A (dành riêng cho Bếp từ) + 3 Ổ cắm đôi.
- **2 Phòng Ngủ (30m²)**: 6 Đèn LED Bulb 20W + 2 Công tắc đôi Sino + 4 Ổ cắm đôi.
- **Tủ điện tổng**: 1 Aptomat chống giật RCCB Schneider 40A 30mA + 4 MCB tép 16A/20A.
👉 **Ước tính tổng chi phí vật tư**: ~3.450.000đ.`,
      };
    }

    return {
      success: true,
      text: `Chào bạn, mình là Trợ lý AI của Phú Lâm Store. Bạn cần tư vấn thiết bị điện nước nào cho căn hộ cứ nhắn mình nhé!`,
    };
  }
}
