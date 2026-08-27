export interface ProductDetailInfo {
  nameMatch: string;
  modelMatch?: string;
  exactDescription: string;
  highlights: string[];
  usage: string[];
  specs: { label: string; value: string }[];
}

export const productDataMap: Record<string, ProductDetailInfo> = {
  // 1. Sino S181
  "S181": {
    nameMatch: "Sino S18 Series Công tắc 1 nút vuông Trắng",
    modelMatch: "S181",
    exactDescription: "Công tắc điện đơn Sino S181 hạt nhỏ âm tường màu trắng tinh tế. Thích hợp dùng làm công tắc điều khiển bật tắt 1 đèn phòng khách, phòng ngủ hoặc hành lang với độ bền cao và tiếp điểm nhạy.",
    highlights: [
      "Hạt công tắc nhạy, lực bấm êm ái không gây tiếng động lớn.",
      "Vỏ nhựa Polycarbonate (PC) chống cháy cao cấp, chịu va đập và không phai màu.",
      "Tiếp điểm hợp kim đồng đàn hồi tốt, dẫn điện ổn định, hạn chế tia lửa điện.",
      "Kích thước hạt chuẩn âm tường, dễ dàng thay thế cho các bộ công tắc cũ.",
    ],
    usage: [
      "Dùng điều khiển bật tắt 1 bóng đèn hoặc 1 nhóm đèn độc lập trong nhà.",
      "Lắp đặt vào mặt công tắc vuông hoặc chữ nhật tiêu chuẩn Sino Vanlock.",
      "Vui lòng ngắt Aptomat tổng trước khi tháo lắp và đấu nối dây điện.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "S181" },
      { label: "Thương hiệu", value: "Sino Vanlock (Việt Nam)" },
      { label: "Loại thiết bị", value: "Công tắc điện 1 nút (1 chiều)" },
      { label: "Dòng điện & Điện áp định mức", value: "10A - 250V AC / 50Hz" },
      { label: "Vật liệu vỏ", value: "Nhựa PC chống cháy cách điện" },
      { label: "Độ bền cơ khí", value: "> 40.000 Lần thao tác bật tắt" },
    ],
  },

  // 2. Sino S182/2C
  "S182/2C": {
    nameMatch: "Sino S18 Series Công tắc đôi 2 chiều Trắng",
    modelMatch: "S182/2C",
    exactDescription: "Công tắc điện đôi 2 chiều (công tắc đảo chiều / công tắc cầu thang) Sino S182/2C. Cho phép bật hoặc tắt cùng 1 bóng đèn từ 2 vị trí khác nhau như đầu cầu thang và chân cầu thang.",
    highlights: [
      "Tính năng đảo chiều 2 vị trí chuyên dùng cho cầu thang, hành lang dài.",
      "Gồm 2 hạt công tắc trên cùng 1 mặt chữ nhật sang trọng.",
      "Tiếp điểm hợp kim bạc niken chống vặt tia lửa, an toàn tuyệt đối.",
      "Vỏ nhựa cách điện cao cấp chịu nhiệt độ cao.",
    ],
    usage: [
      "Sử dụng 2 dây truyền kết nối giữa 2 công tắc 2 chiều ở 2 vị trí khác nhau.",
      "Thích hợp lắp cho cầu thang gia đình, phòng ngủ (bật ở cửa, tắt ở đầu giường).",
      "Siết chặt các vít cố định dây điện để đảm bảo không bị lỏng lẻo.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "S182/2C" },
      { label: "Thương hiệu", value: "Sino Vanlock (Việt Nam)" },
      { label: "Loại thiết bị", value: "Công tắc đôi 2 chiều (Đảo chiều)" },
      { label: "Dòng điện định mức", value: "10A - 250V AC" },
      { label: "Vật liệu", value: "Nhựa chống cháy Polycarbonate" },
      { label: "Ứng dụng", value: "Điều khiển đèn cầu thang & hành lang" },
    ],
  },

  // 3. Sino S1830K
  "S1830K": {
    nameMatch: "Ổ cắm đôi 3 chấu Sino Vanlock Trắng",
    modelMatch: "S1830K",
    exactDescription: "Mặt ổ cắm đôi 3 chấu có màng che an toàn Sino S1830K chuẩn âm tường chữ nhật. Chuyên dùng cắm phích tròn, phích dẹt 2 chấu và 3 chấu có chân tiếp địa chống rò điện.",
    highlights: [
      "Màng che an toàn tự động đóng kín khi rút phích cắm (chống trẻ em chọc tay).",
      "Chân đồng nguyên chất đúc nguyên khối kẹp chặt phích cắm không bị chập chập.",
      "Thiết kế 2 ổ cắm 3 chấu song song tiện lợi cho nhiều thiết bị điện.",
      "Vỏ nhựa PC màu trắng mịn màng dễ vệ sinh và chống bám bẩn.",
    ],
    usage: [
      "Đấu đủ 3 dây: dây Nóng (L), dây Nguội (N) và dây Tiếp địa (E).",
      "Thích hợp dùng cho tủ lạnh, máy giặt, tivi, máy tính, thiết bị văn phòng.",
      "Không cắm các thiết bị vượt quá tổng công suất chịu tải 3500W.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "S1830K" },
      { label: "Thương hiệu", value: "Sino Vanlock" },
      { label: "Số ổ cắm", value: "2 Ổ cắm 3 chấu (Có màng che an toàn)" },
      { label: "Dòng điện & Điện áp", value: "16A - 250V AC (Công suất tối đa 3500W)" },
      { label: "Chân tiếp xúc điện", value: "Lá đồng phốt-pho đàn hồi cao" },
    ],
  },

  // 4. MCB-BBN2322
  "MCB-BBN2322": {
    nameMatch: "Aptomat Cầu dao tự động Panasonic 2P 32A",
    modelMatch: "MCB-BBN2322",
    exactDescription: "Aptomat tép đôi MCB Panasonic 2 cực (2P) dòng định mức 32A. Thiết bị ngắt mạch tự động chống quá tải và ngắn mạch (chập điện) cao cấp hàng đầu từ thương hiệu Panasonic Nhật Bản.",
    highlights: [
      "Dòng cắt sự cố ngắn mạch 6kA siêu nhanh bảo vệ hệ thống điện.",
      "Ngắt đồng thời cả 2 cực dây Nóng & Nguội tăng độ an toàn tuyệt đối.",
      "Vỏ đúc nhựa chịu nhiệt cách điện tiêu chuẩn quốc tế IEC 60898.",
      "Cần gạt bật tắt dứt khoát, độ bền cơ khí lên tới 10.000 lần ngắt.",
    ],
    usage: [
      "Lắp làm Aptomat tổng cho tầng nhà hoặc Aptomat riêng cho điều hòa 18.000-24.000 BTU, bếp từ.",
      "Gài cố định trên thanh ray nhôm DIN-Rail tiêu chuẩn trong tủ điện.",
      "Cấp nguồn vào ở phía trên (Line) và nguồn ra tải ở phía dưới (Load).",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "BBN2322 (MCB 2P 32A)" },
      { label: "Thương hiệu", value: "Panasonic (Nhật Bản)" },
      { label: "Số cực / Số pha", value: "2 Cực (2P)" },
      { label: "Dòng điện định mức", value: "32A" },
      { label: "Dòng cắt ngắn mạch", value: "6kA (6000A)" },
      { label: "Tiêu chuẩn an toàn", value: "IEC 60898-1" },
    ],
  },

  // 5. EZ9R33240
  "EZ9R33240": {
    nameMatch: "Aptomat Chống giật RCCB Schneider 2P 40A 30mA",
    modelMatch: "EZ9R33240",
    exactDescription: "Cầu dao tự động chống rò điện (chống giật) RCCB Schneider Easy9 2P 40A dòng rò 30mA. Phát hiện dòng điện rò rỉ và ngắt điện tức thì trong 0.03 giây khi có con người chạm vào điện.",
    highlights: [
      "Bảo vệ tính mạng con người khỏi nguy cơ bị điện giật nguy hiểm.",
      "Ngắt điện siêu nhạy khi phát hiện dòng rò nhỏ tới 30mA (0.03A).",
      "Có nút 'TEST' màu xám trên thân thiết bị để kiểm tra định kỳ tính năng chống giật.",
      "Thương hiệu Schneider Electric đẳng cấp Pháp công nghệ tiên tiến.",
    ],
    usage: [
      "Lắp đặt bảo vệ cho bình nóng lạnh, máy bơm nước, ổ cắm phòng tắm, toàn bộ căn hộ.",
      "Khuyến nghị bấm nút TEST 1 tháng / 1 lần để đảm bảo cơ cấu ngắt chống giật luôn hoạt động tốt.",
      "Lắp nối tiếp phía sau Aptomat tổng MCB.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "EZ9R33240" },
      { label: "Thương hiệu", value: "Schneider Electric (Pháp)" },
      { label: "Dòng định mức (In)", value: "40A" },
      { label: "Dòng rò bảo vệ (IΔn)", value: "30mA (0.03A)" },
      { label: "Thời gian tác động ngắt", value: "< 30ms (0.03 giây)" },
      { label: "Số cực", value: "2P (Dây Nóng + Dây Nguội)" },
    ],
  },

  // 6. P-4000W
  "P-4000W": {
    nameMatch: "Phích cắm điện cao su chịu tải đúc liền 4000W",
    modelMatch: "P-4000W",
    exactDescription: "Phích cắm điện tròn đúc cao su nguyên khối chịu lực va đập chống vỡ tuyệt đối, công suất chịu tải cực đại lên tới 4000W (18A) chuyên dùng cho thiết bị công suất lớn.",
    highlights: [
      "Vỏ cao su dẻo đặc nguyên khối rơi từ tầng 3 xuống không vỡ.",
      "Chân cắm bằng đồng đúc nguyên chất Ø5mm cắm chặt không vỡ nát ổ cắm.",
      "Chịu tải công suất 4000W không bị nóng chảy hay quéo phích cắm.",
      "Kẹp kim loại giữ chặt dây điện bên trong chống tuột khi bị lôi kéo.",
    ],
    usage: [
      "Chuyên dùng cho máy khoan, máy cắt công trình, lẩu điện, bếp từ, nồi chiên không dầu.",
      "Tháo vỏ cao su, tuốt dây điện 1.5 - 2.5mm² và siết chặt ốc vít chân cắm.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "P-4000W" },
      { label: "Công suất chịu tải tối đa", value: "4000W (18A - 250V)" },
      { label: "Chất liệu thân vỏ", value: "Cao su đúc nguyên khối chống vỡ" },
      { label: "Đường kính chân cắm", value: "Chân tròn Ø5mm đồng nguyên chất" },
    ],
  },

  // 7. SK-6L5M
  "SK-6L5M": {
    nameMatch: "Ổ cắm dây nối dài 6 lỗ Sopoka 5m Chịu tải cao",
    modelMatch: "SK-6L5M",
    exactDescription: "Ổ cắm điện kéo dài Sopoka 6 lỗ cắm (3 ổ tròn + 3 ổ đa năng), dây dẫn dài 5 mét lõi đồng 2x1.5mm² chịu tải tối đa 2200W kèm rơ le tự ngắt bảo vệ quá tải.",
    highlights: [
      "Có 6 lỗ cắm rộng rãi cắm được phích tròn, phích dẹt 2 chấu và 3 chấu.",
      "Rơ le bảo vệ tự động ngắt điện khi công suất sử dụng vượt quá giới hạn.",
      "Công tắc nguồn tổng bọc nhựa chống nước có đèn LED đỏ báo trạng thái.",
      "Dây dẫn dài 5m lõi đồng đúc bọc nhựa PVC dẻo chịu xoắn gập.",
    ],
    usage: [
      "Dùng cấp điện cho dàn máy tính, tivi, quạt máy, đồ gia dụng gia đình và văn phòng.",
      "Nếu rơ le nhảy ngắt điện, hãy rút bớt thiết bị và nhấn nút rơ le ở hông ổ cắm để dùng lại.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "SK-6L5M" },
      { label: "Thương hiệu", value: "Sopoka (Việt Nam)" },
      { label: "Số lượng lỗ cắm", value: "6 Lỗ cắm điện" },
      { label: "Chiều dài dây dẫn", value: "5 Mét (Lõi đồng 2x1.5mm²)" },
      { label: "Công suất chịu tải", value: "2200W (10A - 250V)" },
    ],
  },

  // 8. LED-A80/20W
  "LED-A80/20W": {
    nameMatch: "Bóng đèn LED Bulb Trụ Nhôm 20W Rạng Đông",
    modelMatch: "LED-A80/20W",
    exactDescription: "Bóng đèn LED trụ nhôm nhựa công suất 20W Rạng Đông, ánh sáng trắng 6500K, sử dụng đuôi xoáy E27 tiêu chuẩn. Chiếu sáng siêu sáng tiết kiệm 88% điện năng.",
    highlights: [
      "Quang thông 1800 lumens chiếu sáng không gian rộng rãi 15-20m².",
      "Bầu tản nhiệt nhôm đúc nguyên khối giúp hạ nhiệt chip LED, tăng tuổi thọ lên 25.000 giờ.",
      "Mặt chao nhựa PC mờ khuếch tán ánh sáng đều, không chói mắt.",
      "Giải điện áp rộng 150V - 250V ánh sáng không bị sụt khi điện yếu.",
    ],
    usage: [
      "Xoáy bóng theo chiều kim đồng hồ vào đuôi đèn E27 chuẩn gia đình.",
      "Chiếu sáng phòng khách, bếp, cửa hàng, sân nhà.",
      "Ngắt công tắc điện trước khi xoáy thay bóng.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "LED-A80/20W" },
      { label: "Thương hiệu", value: "Rạng Đông (Việt Nam)" },
      { label: "Công suất tiêu thụ", value: "20W (Quang thông 1800 lm)" },
      { label: "Màu ánh sáng", value: "Trắng 6500K" },
      { label: "Đuôi đèn chuẩn", value: "E27 (Đuôi xoáy)" },
      { label: "Tuổi thọ bóng", value: "25.000 Giờ chiếu sáng" },
    ],
  },

  // 9. LED-A100/30W
  "LED-A100/30W": {
    nameMatch: "Bóng đèn LED Bulb Trụ Nhôm 30W Rạng Đông",
    modelMatch: "LED-A100/30W",
    exactDescription: "Bóng LED trụ nhôm nhựa công suất lớn 30W Rạng Đông tản nhiệt nhôm đúc cao cấp. Chuyên dùng chiếu sáng khu vực diện tích lớn như sân vườn, nhà kho, xưởng sản xuất, cửa hàng.",
    highlights: [
      "Quang thông 2700 lumens cực mạnh thay thế bóng compact 60W hoặc bóng dây tóc 250W.",
      "Chip LED Hàn Quốc/Đài Loan chất lượng cao, chỉ số hoàn màu CRI > 80Ra.",
      "Vỏ nhôm tản nhiệt đường kính A100 chắc chắn, chống va đập.",
    ],
    usage: [
      "Lắp vào đuôi xoáy E27 treo ở độ cao 3-4m để phủ sáng tối đa.",
      "Thích hợp làm bóng đèn chiếu sáng cổng, sân nhà, quán ăn, xưởng.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "LED-A100/30W" },
      { label: "Thương hiệu", value: "Rạng Đông" },
      { label: "Công suất", value: "30W (2700 lm)" },
      { label: "Ánh sáng", value: "Trắng sáng 6500K" },
      { label: "Đuôi xoáy", value: "E27 chuẩn" },
    ],
  },

  // 10. AT10-9W3M
  "AT10-9W3M": {
    nameMatch: "Đèn LED Âm trần Downlight 9W 3 Màu Rạng Đông",
    modelMatch: "AT10-9W3M",
    exactDescription: "Đèn LED âm trần thạch cao 9W đổi 3 màu ánh sáng (Trắng 6500K - Vàng 3000K - Trung tính 4500K) bằng cách bật tắt công tắc tường Rạng Đông AT10.",
    highlights: [
      "Đổi 3 màu ánh sáng linh hoạt phù hợp từng không gian sinh hoạt.",
      "Mặt đèn viền nhôm sơn tĩnh điện trắng siêu mỏng sang trọng.",
      "Đường kính lỗ khoét trần tiêu chuẩn Ø90mm dễ khoét trần.",
      "Kèm bộ tăng phô Driver dòng dải rộng cách điện an toàn.",
    ],
    usage: [
      "Khoét lỗ trần thạch cao đường kính Ø90mm.",
      "Đấu nối 2 dây nguồn 220V vào bộ Driver và bật tai kẹp lò xo gài vào trần.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "AT10-9W3M" },
      { label: "Thương hiệu", value: "Rạng Đông" },
      { label: "Công suất", value: "9W" },
      { label: "Màu ánh sáng", value: "3 Màu (Trắng / Vàng / Trung tính)" },
      { label: "Kích thước lỗ khoét", value: "Ø90mm (Đường kính mặt Ø118mm)" },
    ],
  },

  // 11. DQ-BN12M40W
  "DQ-BN12M40W": {
    nameMatch: "Đèn Bán nguyệt LED Tuýp 1.2m 40W Điện Quang",
    modelMatch: "DQ-BN12M40W",
    exactDescription: "Đèn tuýp LED bán nguyệt tràn viền ốp nổi chiều dài 1.2 mét công suất 40W Điện Quang. Thiết kế máng nhôm cong bán nguyệt sang trọng, góc chiếu sáng rộng 180 độ không bị góc tối.",
    highlights: [
      "Kiểu dáng bán nguyệt tràn viền siêu đẹp thay thế hoàn toàn máng tuýp cũ.",
      "Bật sáng tức thì trong 0.1s không rung giật, không gây mỏi mắt.",
      "Máng nhôm tản nhiệt phía sau giúp đèn luôn mát khi sáng suốt 24h.",
    ],
    usage: [
      "Ốp trực tiếp lên tường gạch, trần bê tông hoặc trần thạch cao.",
      "Dùng 2 tai kẹp inox đi kèm bắt vít lên trần rồi sập máng đèn vào.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "DQ-BN12M40W" },
      { label: "Thương hiệu", value: "Điện Quang (Việt Nam)" },
      { label: "Chiều dài & Công suất", value: "1.2 Mét - 40W" },
      { label: "Ánh sáng", value: "Trắng 6500K (3600 lm)" },
      { label: "Lắp đặt", value: "Ốp nổi trần / tường" },
    ],
  },

  // 12. RR-COB-20W
  "RR-COB-20W": {
    nameMatch: "Đèn Rọi ray LED COB 20W Thân đen Vỏ kim loại",
    modelMatch: "RR-COB-20W",
    exactDescription: "Đèn LED rọi điểm xoay 360 độ lắp thanh ray công suất 20W chip COB hội tụ thân vỏ nhôm đúc màu đen. Chuyên dùng rọi tranh, rọi sản phẩm cho shop thời trang, showroom, quán cafe.",
    highlights: [
      "Chip LED COB gom chùm sáng rọi tạo điểm nhấn thu hút cho sản phẩm trưng bày.",
      "Khớp xoay đa hướng 360 độ ngang và 90 độ dọc điều chỉnh góc rọi dễ dàng.",
      "Chân gài tiêu chuẩn khớp hoàn hảo với các loại thanh ray nhôm 1m, 1.5m, 2m.",
    ],
    usage: [
      "Gài chân đèn vào rãnh thanh ray nhôm và gạt nấc khóa để cố định.",
      "Xoay ống đèn hướng vào sản phẩm hoặc bức tranh cần làm nổi bật.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "RR-COB-20W" },
      { label: "Loại chip LED", value: "COB Rọi điểm (Spotlight)" },
      { label: "Công suất", value: "20W" },
      { label: "Màu vỏ thân đèn", value: "Nhôm sơn tĩnh điện Đen" },
      { label: "Góc quay", value: "Xoay 360° linh hoạt" },
    ],
  },

  // 13. PHA-IP66-50W
  "PHA-IP66-50W": {
    nameMatch: "Đèn LED Pha Chống nước IP66 50W Ngoại thất",
    modelMatch: "PHA-IP66-50W",
    exactDescription: "Đèn pha LED công suất 50W chuẩn chống nước bụi IP66 chiếu sáng ngoài trời cho biển hiệu quảng cáo, sân bóng, sân vườn, công trình xây dựng chịu mưa bão khắc nghiệt.",
    highlights: [
      "Chuẩn chống nước tuyệt đối IP66 hoạt động bền bỉ dưới mưa gió bão bùng.",
      "Mặt kính cường lực chống va đập vỡ, chóa phản quang rộng 120 độ.",
      "Vỏ nhôm đúc tản nhiệt gân rãnh dày dặn không bị oxy hóa.",
    ],
    usage: [
      "Bắt vít quai treo sắt vào tường, biển quảng cáo hoặc cột điện ngoài trời.",
      "Quấn keo cách điện kín nước ở mối nối dây nguồn 220V.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "PHA-IP66-50W" },
      { label: "Chỉ số chống nước", value: "IP66 Outdoor (Ngoài trời)" },
      { label: "Công suất", value: "50W (Ánh sáng Trắng 6500K)" },
      { label: "Vật liệu thân", value: "Nhôm đúc + Kính cường lực" },
    ],
  },

  // 14. Tuya-WUS-1P
  "Tuya-WUS-1P": {
    nameMatch: "Tuya Smart Wifi Ổ cắm âm tường đơn US Trắng",
    modelMatch: "Tuya-WUS-1P",
    exactDescription: "Ổ cắm thông minh Tuya chuẩn US lắp âm tường kết nối Wifi 2.4GHz độc lập không cần bộ Hub. Cho phép bật/tắt thiết bị cắm từ xa qua ứng dụng điện thoại Smart Life.",
    highlights: [
      "Bật/tắt thiết bị điện từ xa ở bất kỳ đâu chỉ cần có mạng 3G/4G/Wifi.",
      "Hẹn giờ bật tắt sạc điện thoại tự động ngắt tránh chai pin, hẹn giờ bật quạt, lọc nước.",
      "Điều khiển bằng giọng nói qua Google Assistant, Amazon Alexa.",
      "Mặt kính cường lực chống nước, chống trầy xước an toàn.",
    ],
    usage: [
      "Cần đấu nối 2 dây Nóng (L) và Nguội (N) vào ổ cắm.",
      "Tải ứng dụng Smart Life, nhấn giữ nút nguồn ổ cắm 5s để kết nối Wifi 2.4G.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "Tuya-WUS-1P" },
      { label: "Kết nối không dây", value: "Wifi 2.4GHz (IEEE 802.11 b/g/n)" },
      { label: "Dòng điện tối đa", value: "16A (Công suất 3500W)" },
      { label: "Ứng dụng di động", value: "Smart Life / Tuya Smart" },
    ],
  },

  // 15. Tuya-SW3-BLK
  "Tuya-SW3-BLK": {
    nameMatch: "Công tắc cảm ứng Tuya Smart Wifi 3 Nút Kính đen",
    modelMatch: "Tuya-SW3-BLK",
    exactDescription: "Công tắc cảm ứng thông minh 3 nút mặt kính cường lực màu đen viền kim loại Tuya Wifi. Thay thế công tắc cơ truyền thống điều khiển 3 bóng đèn riêng biệt từ xa qua điện thoại.",
    highlights: [
      "Phím chạm cảm ứng điện dung cực nhạy có đèn LED xanh/đỏ báo đêm.",
      "Kết nối Wifi trực tiếp điều khiển bật/tắt từng đèn riêng lẻ.",
      "Tạo ngữ cảnh thông minh (Ví dụ: 'Tắt hết đèn khi ra khỏi nhà').",
      "Kính cường lực màu đen chống giật điện kể cả khi tay đang ướt nước.",
    ],
    usage: [
      "Yêu cầu hộp đế âm tường phải có sẵn dây nguội (N).",
      "Kết nối với ứng dụng Smart Life trên điện thoại iOS/Android.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "Tuya-SW3-BLK" },
      { label: "Số nút cảm ứng", value: "3 Nút cảm ứng độc lập" },
      { label: "Kết nối", value: "Wifi 2.4GHz" },
      { label: "Công suất tải", value: "Max 600W / Nút (Tổng 1800W)" },
      { label: "Mặt kính", value: "Kính cường lực cao cấp màu Đen" },
    ],
  },

  // 16. Sonoff-R2
  "Sonoff-R2": {
    nameMatch: "Sonoff Basic R2 Rơ le điều khiển thông minh Wifi",
    modelMatch: "Sonoff-R2",
    exactDescription: "Module rơ le Wifi nhỏ gọn Sonoff Basic R2 eWeLink. Dùng đấu nối nối tiếp vào dây nguồn của quạt, đèn, máy bơm nước để biến thiết bị điện thường thành thiết bị thông minh điều khiển qua điện thoại.",
    highlights: [
      "Kích thước siêu nhỏ gọn dễ cất giấu vào trần thạch cao hoặc thân thiết bị.",
      "Hệ sinh thái eWeLink ổn định, hỗ trợ chia sẻ quyền cho người thân.",
      "Hẹn giờ đếm ngược, hẹn giờ lặp lại tự động tắt quạt/đèn.",
    ],
    usage: [
      "Đấu nguồn 220V vào cổng Input (L/N) và thiết bị ra tải ở cổng Output (L/N).",
      "Tải app eWeLink để quét ghép nối thiết bị.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "Sonoff Basic R2" },
      { label: "Thương hiệu", value: "Sonoff (eWeLink)" },
      { label: "Dòng tải tối đa", value: "10A (Công suất 2200W)" },
      { label: "Kết nối", value: "Wifi 2.4GHz" },
    ],
  },

  // 17. Tuya-Z-Door
  "Tuya-Z-Door": {
    nameMatch: "Cảm biến Cửa & Cửa sổ Thông minh Tuya Zigbee",
    modelMatch: "Tuya-Z-Door",
    exactDescription: "Cảm biến má từ phát hiện đóng/mở cửa chính, cửa sổ chuẩn kết nối Zigbee 3.0 Tuya. Báo động tức thì thông báo về điện thoại khi có kẻ gian cạy mở cửa.",
    highlights: [
      "Cảnh báo an ninh chống trộm tức thì qua ứng dụng điện thoại.",
      "Kết hợp kích hoạt chuông báo động hoặc tự bật đèn khi mở cửa bước vào.",
      "Dùng Pin CR2032 siêu tiết kiệm pin, thời gian dùng lên tới 1 năm.",
    ],
    usage: [
      "Dán 2 phần cảm biến lên mép cửa và khung cửa bằng keo 3M kèm theo sao cho khoảng cách < 15mm.",
      "Yêu cầu có bộ trung tâm Tuya Zigbee Gateway.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "Tuya-Z-Door" },
      { label: "Chuẩn kết nối", value: "Zigbee 3.0" },
      { label: "Loại pin", value: "CR2032 3V (Dễ mua thay thế)" },
      { label: "App quản lý", value: "Smart Life / Tuya Smart" },
    ],
  },

  // 18. Yoosee-3MP-360
  "Yoosee-3MP-360": {
    nameMatch: "Camera Wifi Yoosee 3.0MP Xoay 360 độ Trong nhà",
    modelMatch: "Yoosee-3MP-360",
    exactDescription: "Camera quan sát an ninh thông minh Yoosee độ phân giải 3.0 Megapixel (Ultra HD 1296P). Khả năng xoay ngang 355 độ, xoay dọc 90 độ quan sát toàn cảnh ngôi nhà qua điện thoại.",
    highlights: [
      "Độ phân giải 3.0MP sắc nét gấp 1.5 lần camera Full HD thông thường.",
      "Xoay 360 độ quét toàn bộ góc chết trong phòng.",
      "Đàm thoại 2 chiều nói chuyện trực tiếp qua loa và micro trên camera.",
      "Hồng ngoại quay đêm rõ nét và còi hú báo động phát hiện chuyển động.",
    ],
    usage: [
      "Đặt trên bàn hoặc bắt chân đế treo ngược lên trần nhà.",
      "Tải app Yoosee quét mã QR dưới đáy camera để kết nối Wifi.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "Yoosee-3MP-360" },
      { label: "Độ phân giải", value: "3.0 Megapixel (2304x1296P)" },
      { label: "Góc quay", value: "Ngang 355° - Dọc 90°" },
      { label: "Hỗ trợ thẻ nhớ", value: "MicroSD max 128GB" },
      { label: "Tính năng", value: "Đàm thoại 2 chiều + Báo động" },
    ],
  },

  // 19. TP-PVC-27-C1
  "TP-PVC-27-C1": {
    nameMatch: "Ống nhựa PVC Tiền Phong phi 27 Class 1 (4m/cây)",
    modelMatch: "TP-PVC-27-C1",
    exactDescription: "Ống nhựa PVC-U Tiền Phong đường kính ngoài Ø27mm độ dày Class 1 (chiều dài 4 mét/cây). Dùng làm đường ống dẫn nước sinh hoạt và đường ống thoát nước dân dụng.",
    highlights: [
      "Thương hiệu Nhựa Tiền Phong Hải Phòng uy tín số 1 Việt Nam.",
      "Chất liệu nhựa PVC dẻo dai chịu lực nén đè và va đập tốt.",
      "Lòng ống trơn nhẵn giảm ma sát, lưu thông nước tối đa không đóng cặn.",
    ],
    usage: [
      "Bôi keo dán ống nhựa PVC Tiền Phong vào đầu ống và măng xông/co nới rồi đẩy chặt.",
      "Dùng dẫn nước lạnh sinh hoạt gia đình, ống thoát nước xô chậu.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "TP-PVC-27-C1" },
      { label: "Thương hiệu", value: "Nhựa Tiền Phong (Hải Phòng)" },
      { label: "Đường kính ngoài", value: "Ø27mm (Phi 27)" },
      { label: "Độ dày", value: "Class 1" },
      { label: "Chiều dài cây ống", value: "4 Mét / Cây" },
    ],
  },

  // 20. TP-PPR-25-HOT
  "TP-PPR-25-HOT": {
    nameMatch: "Ống nhựa PPR Tiền Phong D25 Dẫn nước nóng (4m/cây)",
    modelMatch: "TP-PPR-25-HOT",
    exactDescription: "Ống hàn nhiệt PPR Tiền Phong D25 (Ø25mm) loại PN16/PN20 chuyên dùng dẫn nước nóng cho bình năng lượng mặt trời thái dương năng và bình nước nóng gián tiếp.",
    highlights: [
      "Chịu nhiệt độ nước nóng liên tục lên tới 95°C không bị biến dạng.",
      "Mối nối hàn nhiệt đồng chất 100% vĩnh viễn không bao giờ rò rỉ.",
      "Vật liệu nhựa nguyên sinh an toàn tuyệt đối cho nước ăn uống.",
    ],
    usage: [
      "Sử dụng máy hàn nhiệt PPR nung nóng đầu ống 25mm và phụ kiện trong 5-7 giây rồi gắn chặt.",
      "Dùng đi đường ống nước nóng nhà tắm, bếp ăn.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "TP-PPR-25-HOT" },
      { label: "Thương hiệu", value: "Nhựa Tiền Phong" },
      { label: "Đường kính Ø25mm", value: "Loại chịu nước nóng (PN16/PN20)" },
      { label: "Nhiệt độ chịu đựng", value: "Tối đa 95°C" },
      { label: "Chiều dài", value: "4m / Cây" },
    ],
  },

  // 21. SEN-TA-03
  "SEN-TA-03": {
    nameMatch: "Vòi sen tắm tăng áp Mặt inox Cụm bát sen 3 chế độ",
    modelMatch: "SEN-TA-03",
    exactDescription: "Bát sen tắm tăng áp lực nước mặt đĩa Inox 304 khoan lỗ laser siêu mịn. Tăng áp lực nước phun mạnh gấp 300% ngay cả ở các tầng nhà nước yếu.",
    highlights: [
      "Mặt đĩa Inox 304 khoan lỗ công nghệ Laser tăng áp lực nước phun cực mạnh.",
      "Có nút bấm chuyển 3 chế độ phun: Phun sương massage, Phun mưa, Phun kết hợp.",
      "Tiết kiệm 30% lượng nước tiêu thụ so với bát sen thường.",
    ],
    usage: [
      "Vặn trực tiếp chân bát sen vào dây dẫn sen tắm chuẩn ren Ø21 (G1/2 inch).",
      "Có thể tháo rời mặt inox để vệ sinh nếu nước có cặn bẩn.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "SEN-TA-03" },
      { label: "Chất liệu mặt bát", value: "Inox 304 không gỉ" },
      { label: "Tính năng", value: "Tăng áp 300% + 3 Chế độ phun" },
      { label: "Chuẩn ren kết nối", value: "Ø21mm (G1/2 inch)" },
    ],
  },

  // 22. MH-MIHA-21
  "MH-MIHA-21": {
    nameMatch: "Van khóa nước đồng thau Minh Hòa phi 21 (D15)",
    modelMatch: "MH-MIHA-21",
    exactDescription: "Van bi khóa nước tay gạt bằng chất liệu đồng thau đúc Miha Minh Hòa đường kính phi 21 (D15 / 1/2 inch). Dùng làm van khóa chặn nước tổng hoặc van khóa nhánh.",
    highlights: [
      "Thân van bằng đồng thau đúc dày dặn chống nứt vỡ rò nước.",
      "Bi van inox đóng mở êm ái kín tuyệt đối.",
      "Tay gạt thép bọc nhựa màu đỏ bám tay dễ vặn.",
    ],
    usage: [
      "Vặn ren van vào đường ống nước phi 21.",
      "Nên quấn băng tan (băng keo non) ở các vòng ren ngoài trước khi xoáy van.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "MH-MIHA-21 (D15)" },
      { label: "Thương hiệu", value: "Minh Hòa (Việt Nam)" },
      { label: "Kích thước ren", value: "Phi 21mm (D15 - 1/2 inch)" },
      { label: "Áp lực chịu đựng", value: "PN16 (16 Bar)" },
    ],
  },

  // 23. VH-INOX-21
  "VH-INOX-21": {
    nameMatch: "Vòi hồ xả nước inox 304 tay gạt phi 21",
    modelMatch: "VH-INOX-21",
    exactDescription: "Vòi xả nước chân tường / vòi máy giặt inox 304 tay gạt phi 21mm (G1/2). Dùng xả nước vào chậu rửa, xô chậu, hồ nước hoặc gắn dây cấp nước máy giặt.",
    highlights: [
      "Inox 304 mờ cao cấp chống gỉ sét tuyệt đối trong môi trường nước.",
      "Đầu vòi có gờ ren chuẩn vừa vặn khớp nối dây cấp nước máy giặt.",
      "Lõi van đĩa sứ khóa nước kín 100% không nhỏ giọt.",
    ],
    usage: [
      "Xoáy ren chân vòi vào ổ ren tường phi 21mm.",
      "Cắm khớp nối máy giặt vào đầu vòi nếu dùng cho máy giặt.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "VH-INOX-21" },
      { label: "Chất liệu", value: "Inox 304 nguyên khối" },
      { label: "Ren chân tường", value: "Phi 21mm (G1/2)" },
      { label: "Loại tay vặn", value: "Tay gạt xoay 90 độ" },
    ],
  },

  // 24. Tolsen-10028
  "Tolsen-10028": {
    nameMatch: "Kìm tuốt dây điện đa năng Tolsen 0.6-2.6mm",
    modelMatch: "Tolsen-10028",
    exactDescription: "Kìm tuốt và cắt dây điện tự động Tolsen kích thước 7 inch (180mm). Chuyên dùng tuốt vỏ dây điện từ 0.6mm² đến 2.6mm² chính xác không làm đứt lõi đồng.",
    highlights: [
      "Thép hợp kim CR-V sắc bén tuốt dứt khoát không phạm lõi.",
      "Các lỗ cắt tuốt chuẩn xác thông số từ 0.6 - 2.6mm².",
      "Cán bọc nhựa PVC dẻo 2 màu chống trượt chống đau tay.",
    ],
    usage: [
      "Đặt dây điện vào lỗ khe có cỡ tương ứng trên lưỡi kìm.",
      "Bóp nhẹ cán và kéo tách vỏ dây.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "Tolsen-10028" },
      { label: "Thương hiệu", value: "Tolsen Tools" },
      { label: "Dải cỡ tuốt dây", value: "0.6 - 2.6mm²" },
      { label: "Chất liệu lưỡi", value: "Thép hợp kim CR-V" },
    ],
  },

  // 25. TV-LCD-01
  "TV-LCD-01": {
    nameMatch: "Tua vít thử điện điện tử hiện màn hình LCD",
    modelMatch: "TV-LCD-01",
    exactDescription: "Bút thử điện cảm ứng kiểm tra điện áp tử thông minh dải đo 12V - 250V AC/DC có màn hình hiển thị số LCD và đèn báo LED đỏ.",
    highlights: [
      "Hiển thị con số điện áp chính xác trên màn hình LCD điện tử.",
      "Đo cảm ứng xuyên vỏ nhựa kiểm tra dây điện ngầm bị đứt dứt đoạn.",
      "Đo được cả dòng điện xoay chiều AC và dòng điện một chiều DC.",
    ],
    usage: [
      "Chạm đầu vít vào điểm cần đo điện.",
      "Đặt ngón tay vào cực cảm ứng ở đuôi bút để xem chỉ số V trên màn hình.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "TV-LCD-01" },
      { label: "Dải đo điện áp", value: "12V - 250V AC/DC" },
      { label: "Màn hình", value: "LCD điện tử số" },
      { label: "Thân bút", value: "Nhựa ABS cách điện" },
    ],
  },

  // 26. Nano-Black-20
  "Nano-Black-20": {
    nameMatch: "Băng dính điện Nano PVC Chống cháy màu đen (Cuộn 20y)",
    modelMatch: "Nano-Black-20",
    exactDescription: "Băng keo cách điện Nano PVC khổ rộng 18mm chiều dài 20 yard màu đen. Chuyên dùng quấn bảo vệ mối nối dây điện chống rò rỉ điện và chống thấm nước.",
    highlights: [
      "Độ co dãn đàn hồi 200% quấn ôm sát mối nối.",
      "Lớp keo Rubber độ dính cao không bong tróc.",
      "Khả năng chống cháy và cách điện tới 600V.",
    ],
    usage: [
      "Quấn đè 50% vòng băng dính lên nhau quanh mối nối dây điện 3-5 lớp.",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "Nano-Black-20" },
      { label: "Chiều dài", value: "20 Yard (~18m)" },
      { label: "Khổ rộng", value: "18mm" },
      { label: "Cách điện", value: "Điện áp < 600V" },
    ],
  },

  // 27. Kyoritsu-1009
  "Kyoritsu-1009": {
    nameMatch: "Đồng hồ đo điện vạn năng Kyoritsu 1009 Nhật Bản",
    modelMatch: "Kyoritsu-1009",
    exactDescription: "Đồng hồ đo điện vạn năng điện tử VOM Kyoritsu 1009 chính hãng Kyoritsu Nhật Bản. Thiết bị đo điện áp AC/DC, dòng điện 10A, điện trở 40MΩ, điện dung, tần số và còi báo thông mạch.",
    highlights: [
      "Độ chính xác cực cao chuẩn CAT III 300V Nhật Bản.",
      "Tính năng Auto-ranging tự động chọn dải đo thông minh.",
      "Đo thông mạch còi kêu to, màn hình LCD 4000 counts rõ nét.",
    ],
    usage: [
      "Cắm que đen vào COM, que đỏ vào V/Ω/Hz.",
      "Xoay núm chọn thang đo cần đo (V, A, Ω, F, Hz).",
    ],
    specs: [
      { label: "Mã sản phẩm / Model", value: "Kyoritsu 1009" },
      { label: "Thương hiệu", value: "Kyoritsu (Nhật Bản - Japan)" },
      { label: "Đo điện áp AC/DC", value: "Tối đa 600V" },
      { label: "Đo dòng AC/DC", value: "Tối đa 10A" },
      { label: "Đo điện trở", value: "Tối đa 40MΩ" },
    ],
  },
};
