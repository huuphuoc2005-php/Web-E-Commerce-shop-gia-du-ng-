const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const descriptionsMap = {
  "S181": "Công tắc điện đơn Sino S181 hạt nhỏ âm tường màu trắng tinh tế. Thích hợp dùng làm công tắc điều khiển bật tắt 1 đèn phòng khách, phòng ngủ hoặc hành lang với độ bền cao và tiếp điểm nhạy.",
  "S182/2C": "Công tắc điện đôi 2 chiều (công tắc đảo chiều / công tắc cầu thang) Sino S182/2C. Cho phép bật hoặc tắt cùng 1 bóng đèn từ 2 vị trí khác nhau như đầu cầu thang và chân cầu thang.",
  "S1830K": "Mặt ổ cắm đôi 3 chấu có màng che an toàn Sino S1830K chuẩn âm tường chữ nhật. Chuyên dùng cắm phích tròn, phích dẹt 2 chấu và 3 chấu có chân tiếp địa chống rò điện.",
  "MCB-BBN2322": "Aptomat tép đôi MCB Panasonic 2 cực (2P) dòng định mức 32A. Thiết bị ngắt mạch tự động chống quá tải và ngắn mạch (chập điện) cao cấp hàng đầu từ thương hiệu Panasonic Nhật Bản.",
  "EZ9R33240": "Cầu dao tự động chống rò điện (chống giật) RCCB Schneider Easy9 2P 40A dòng rò 30mA. Phát hiện dòng điện rò rỉ và ngắt điện tức thì trong 0.03 giây khi có con người chạm vào điện.",
  "P-4000W": "Phích cắm điện tròn đúc cao su nguyên khối chịu lực va đập chống vỡ tuyệt đối, công suất chịu tải cực đại lên tới 4000W (18A) chuyên dùng cho thiết bị công suất lớn.",
  "SK-6L5M": "Ổ cắm điện kéo dài Sopoka 6 lỗ cắm (3 ổ tròn + 3 ổ đa năng), dây dẫn dài 5 mét lõi đồng 2x1.5mm² chịu tải tối đa 2200W kèm rơ le tự ngắt bảo vệ quá tải.",
  "LED-A80/20W": "Bóng đèn LED trụ nhôm nhựa công suất 20W Rạng Đông, ánh sáng trắng 6500K, sử dụng đuôi xoáy E27 tiêu chuẩn. Chiếu sáng siêu sáng tiết kiệm 88% điện năng.",
  "LED-A100/30W": "Bóng LED trụ nhôm nhựa công suất lớn 30W Rạng Đông tản nhiệt nhôm đúc cao cấp. Chuyên dùng chiếu sáng khu vực diện tích lớn như sân vườn, nhà kho, xưởng sản xuất, cửa hàng.",
  "AT10-9W3M": "Đèn LED âm trần thạch cao 9W đổi 3 màu ánh sáng (Trắng 6500K - Vàng 3000K - Trung tính 4500K) bằng cách bật tắt công tắc tường Rạng Đông AT10.",
  "DQ-BN12M40W": "Đèn tuýp LED bán nguyệt tràn viền ốp nổi chiều dài 1.2 mét công suất 40W Điện Quang. Thiết kế máng nhôm cong bán nguyệt sang trọng, góc chiếu sáng rộng 180 độ không bị góc tối.",
  "RR-COB-20W": "Đèn LED rọi điểm xoay 360 độ lắp thanh ray công suất 20W chip COB hội tụ thân vỏ nhôm đúc màu đen. Chuyên dùng rọi tranh, rọi sản phẩm cho shop thời trang, showroom, quán cafe.",
  "PHA-IP66-50W": "Đèn pha LED công suất 50W chuẩn chống nước bụi IP66 chiếu sáng ngoài trời cho biển hiệu quảng cáo, sân bóng, sân vườn, công trình xây dựng chịu mưa bão khắc nghiệt.",
  "Tuya-WUS-1P": "Ổ cắm thông minh Tuya chuẩn US lắp âm tường kết nối Wifi 2.4GHz độc lập không cần bộ Hub. Cho phép bật/tắt thiết bị cắm từ xa qua ứng dụng điện thoại Smart Life.",
  "Tuya-SW3-BLK": "Công tắc cảm ứng thông minh 3 nút mặt kính cường lực màu đen viền kim loại Tuya Wifi. Thay thế công tắc cơ truyền thống điều khiển 3 bóng đèn riêng biệt từ xa qua điện thoại.",
  "Sonoff-R2": "Module rơ le Wifi nhỏ gọn Sonoff Basic R2 eWeLink. Dùng đấu nối nối tiếp vào dây nguồn của quạt, đèn, máy bơm nước để biến thiết bị điện thường thành thiết bị thông minh điều khiển qua điện thoại.",
  "Tuya-Z-Door": "Cảm biến má từ phát hiện đóng/mở cửa chính, cửa sổ chuẩn kết nối Zigbee 3.0 Tuya. Báo động tức thì thông báo về điện thoại khi có kẻ gian cạy mở cửa.",
  "Yoosee-3MP-360": "Camera quan sát an ninh thông minh Yoosee độ phân giải 3.0 Megapixel (Ultra HD 1296P). Khả năng xoay ngang 355 độ, xoay dọc 90 độ quan sát toàn cảnh ngôi nhà qua điện thoại.",
  "TP-PVC-27-C1": "Ống nhựa PVC-U Tiền Phong đường kính ngoài Ø27mm độ dày Class 1 (chiều dài 4 mét/cây). Dùng làm đường ống dẫn nước sinh hoạt và đường ống thoát nước dân dụng.",
  "TP-PPR-25-HOT": "Ống hàn nhiệt PPR Tiền Phong D25 (Ø25mm) loại PN16/PN20 chuyên dùng dẫn nước nóng cho bình năng lượng mặt trời thái dương năng và bình nước nóng gián tiếp.",
  "SEN-TA-03": "Bát sen tắm tăng áp lực nước mặt đĩa Inox 304 khoan lỗ laser siêu mịn. Tăng áp lực nước phun mạnh gấp 300% ngay cả ở các tầng nhà nước yếu.",
  "MH-MIHA-21": "Van bi khóa nước tay gạt bằng chất liệu đồng thau đúc Miha Minh Hòa đường kính phi 21 (D15 / 1/2 inch). Dùng làm van khóa chặn nước tổng hoặc van khóa nhánh.",
  "VH-INOX-21": "Vòi xả nước chân tường / vòi máy giặt inox 304 tay gạt phi 21mm (G1/2). Dùng xả nước vào chậu rửa, xô chậu, hồ nước hoặc gắn dây cấp nước máy giặt.",
  "Tolsen-10028": "Kìm tuốt và cắt dây điện tự động Tolsen kích thước 7 inch (180mm). Chuyên dùng tuốt vỏ dây điện từ 0.6mm² đến 2.6mm² chính xác không làm đứt lõi đồng.",
  "TV-LCD-01": "Bút thử điện cảm ứng kiểm tra điện áp tử thông minh dải đo 12V - 250V AC/DC có màn hình hiển thị số LCD và đèn báo LED đỏ.",
  "Nano-Black-20": "Băng keo cách điện Nano PVC khổ rộng 18mm chiều dài 20 yard màu đen. Chuyên dùng quấn bảo vệ mối nối dây điện chống rò rỉ điện và chống thấm nước.",
  "Kyoritsu-1009": "Đồng hồ đo điện vạn năng điện tử VOM Kyoritsu 1009 chính hãng Kyoritsu Nhật Bản. Thiết bị đo điện áp AC/DC, dòng điện 10A, điện trở 40MΩ, điện dung, tần số và còi báo thông mạch.",
};

async function main() {
  console.log("Cập nhật mô tả chi tiết 100% riêng biệt cho từng sản phẩm...");
  const products = await prisma.product.findMany();

  for (const p of products) {
    if (p.modelNumber && descriptionsMap[p.modelNumber]) {
      await prisma.product.update({
        where: { id: p.id },
        data: { description: descriptionsMap[p.modelNumber] }
      });
      console.log(`✅ Updated: ${p.name} (${p.modelNumber})`);
    }
  }

  console.log("🎉 Tất cả sản phẩm đã được cập nhật mô tả chuẩn từng món!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
