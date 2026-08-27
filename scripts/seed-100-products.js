const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const rawProducts = [
  // ==========================================
  // DANH MỤC 1: Thiết bị điện (25 sản phẩm)
  // ==========================================
  {
    category: "Thiết bị điện",
    name: "Công tắc 1 nút vuông Sino S18 Trắng",
    modelNumber: "S181",
    price: 25000,
    stock: 80,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Công tắc điện Sino S181 hạt vuông màu trắng, nhựa ABS chống cháy, phím bấm êm ái.",
    aiLabels: "công tắc, sino, s18, màu trắng, 1 nút, hạt vuông"
  },
  {
    category: "Thiết bị điện",
    name: "Công tắc đôi 2 chiều Sino Vanlock S18",
    modelNumber: "S182/2C",
    price: 48000,
    stock: 65,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Công tắc đảo chiều Sino S182 dùng cho mạch cầu thang hoặc điều khiển 2 vị trí.",
    aiLabels: "công tắc đảo chiều, cầu thang, sino, s18, 2 chiều"
  },
  {
    category: "Thiết bị điện",
    name: "Ổ cắm đôi 3 chấu có màng che Sino S1830K",
    modelNumber: "S1830K",
    price: 65000,
    stock: 120,
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80",
    description: "Ổ cắm đôi 3 chấu Sino có nắp che an toàn trẻ em, chân cắm bằng đồng nguyên chất.",
    aiLabels: "ổ cắm 3 chấu, sino, vanlock, s1830k, màng che an toàn"
  },
  {
    category: "Thiết bị điện",
    name: "Aptomat Cầu dao tự động Panasonic 2P 32A",
    modelNumber: "MCB-BBN2322",
    price: 135000,
    stock: 45,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Aptomat ngắt mạch tự động Panasonic 32A ngắt mạch nhanh chóng, độ bền 10.000 lần đóng cắt.",
    aiLabels: "aptomat, cầu dao, panasonic, 32a, mcb, ngắt mạch"
  },
  {
    category: "Thiết bị điện",
    name: "Aptomat Chống giật RCCB Schneider 2P 40A 30mA",
    modelNumber: "EZ9R33240",
    price: 490000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Cầu dao chống rò điện Schneider 40A dòng rò 30mA bảo vệ gia đình an toàn tuyệt đối.",
    aiLabels: "aptomat chống giật, rccb, schneider, 40a, 30ma"
  },
  {
    category: "Thiết bị điện",
    name: "Phích cắm cao su đúc nguyên khối chịu tải 4000W",
    modelNumber: "P-4000W",
    price: 22000,
    stock: 150,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    description: "Phích cắm điện vỏ cao su đúc nguyên khối chống va đập vỡ, chân cắm đúc liền chịu tải lớn.",
    aiLabels: "phích cắm cao su, 4000w, chịu tải, va đập"
  },
  {
    category: "Thiết bị điện",
    name: "Ổ cắm kéo dài Sopoka 6 lỗ dây 5m Chịu tải cao",
    modelNumber: "SK-6L5M",
    price: 155000,
    stock: 50,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    description: "Ổ cắm dây nối dài Sopoka 6 cắm lõi sứ chịu nhiệt 2200W, có công tắc nguồn bảo vệ quá tải.",
    aiLabels: "ổ cắm kéo dài, sopoka, 6 lỗ, dây 5m, chịu tải"
  },
  {
    category: "Thiết bị điện",
    name: "Ổ cắm điện đa năng 4 cổng USB + 4 ổ cắm 2.5m",
    modelNumber: "OC-USB4P",
    price: 185000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    description: "Ổ cắm đa năng tích hợp 4 cổng sạc USB thông minh tự điều chỉnh dòng cho điện thoại, máy tính bảng.",
    aiLabels: "ổ cắm usb, thông minh, sạc nhanh, đài đa năng"
  },
  {
    category: "Thiết bị điện",
    name: "Công tắc ổ cắm kết hợp Panasonic Wide Series",
    modelNumber: "WEV5001",
    price: 85000,
    stock: 75,
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80",
    description: "Mặt công tắc kết hợp ổ cắm Panasonic Wide màu trắng tuyết cao cấp sang trọng.",
    aiLabels: "panasonic, wide series, công tắc ổ cắm, mặt trắng"
  },
  {
    category: "Thiết bị điện",
    name: "Cầu chì ống sứ 10A 250V bảo vệ thiết bị",
    modelNumber: "CC-10A",
    price: 5000,
    stock: 300,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Cầu chì sứ ngắt mạch bảo vệ quá dòng cho các bảng điện gia đình.",
    aiLabels: "cầu chì, 10a, bảo vệ điện"
  },
  {
    category: "Thiết bị điện",
    name: "Mặt che mưa ổ cắm ngoài trời Sino IP55",
    modelNumber: "S18-IP55",
    price: 35000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80",
    description: "Nắp che mưa chống nước chuẩn IP55 lắp ngoài trời cho ổ cắm công tắc Sino.",
    aiLabels: "nắp che mưa, ip55, chống nước, ngoài trời, sino"
  },
  {
    category: "Thiết bị điện",
    name: "Băng keo điện Nano chống cháy 20 mét Chính hãng",
    modelNumber: "BKD-N20",
    price: 12000,
    stock: 500,
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
    description: "Băng dính cách điện PVC Nano dẻo dai cách điện 600V chống cháy bám dính cực tốt.",
    aiLabels: "băng keo điện, nano, cách điện, 20m, chống cháy"
  },
  {
    category: "Thiết bị điện",
    name: "Cầu dao đảo chiều 2P 63A khoang đúc",
    modelNumber: "CDD-63A",
    price: 175000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Cầu dao đảo chiều 2 cực 63A dùng chuyển nguồn máy phát điện hoặc điện lưới.",
    aiLabels: "cầu dao đảo chiều, 63a, máy phát điện"
  },
  {
    category: "Thiết bị điện",
    name: "Bảng điện nổi bọc sứ 3 công tắc 1 ổ cắm",
    modelNumber: "BDN-3C1O",
    price: 45000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80",
    description: "Bảng điện lắp nổi trên tường đính sẵn công tắc và ổ cắm tiện lợi cho nhà tắm, phòng ngủ.",
    aiLabels: "bảng điện nổi, công tắc ổ cắm nổi"
  },
  {
    category: "Thiết bị điện",
    name: "Hộp ổ cắm công trường cao su đúc 4 ổ 16A",
    modelNumber: "HO-CT4",
    price: 260000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    description: "Hộp chia điện công trình vỏ cao su chịu va đập kèm aptomat chống rò an toàn.",
    aiLabels: "ổ cắm công trường, cao su đúc, chịu va đập"
  },
  {
    category: "Thiết bị điện",
    name: "Phích cắm chuyển đổi 3 chấu sang 2 chấu tròn",
    modelNumber: "PC-3S2",
    price: 15000,
    stock: 200,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    description: "Đầu chuyển đổi phích cắm 3 chân sang 2 chân cắm chuẩn Việt Nam gọn nhẹ.",
    aiLabels: "phích chuyển đổi, 3 chấu sang 2 chấu"
  },
  {
    category: "Thiết bị điện",
    name: "Bộ hẹn giờ cơ tự động 24h Kerde TC-932",
    modelNumber: "Kerde-TC932",
    price: 125000,
    stock: 35,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Ổ cắm hẹn giờ dạng cơ 24 tiếng tự động bật tắt máy bơm, đèn quảng cáo, sạc xe điện.",
    aiLabels: "hẹn giờ cơ, ổ cắm timer, kerde, 24h"
  },
  {
    category: "Thiết bị điện",
    name: "Công tắc máy bơm phao điện tự động Radar ST-70AB",
    modelNumber: "Radar-ST70AB",
    price: 95000,
    stock: 55,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Phao điện tự động bơm nước chống cạn chống tràn chính hãng Radar Đài Loan.",
    aiLabels: "phao điện, máy bơm, radar st70ab, chống tràn"
  },
  {
    category: "Thiết bị điện",
    name: "Ống nẹp điện vuông dán tường 20x10mm 2m",
    modelNumber: "ND-2010",
    price: 12000,
    stock: 200,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Nẹp luồn dây điện chất liệu nhựa dẻo PVC chống cháy có sẵn keo dán 2 mặt.",
    aiLabels: "nẹp điện vuông, luồn dây, 20x10"
  },
  {
    category: "Thiết bị điện",
    name: "Đế âm đơn vuông nhựa chống cháy Sino E157",
    modelNumber: "E157",
    price: 6000,
    stock: 500,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Đế âm tường nhựa vuông Sino chôn trong gạch dùng gá lắp công tắc ổ cắm.",
    aiLabels: "đế âm vuông, sino, chôn tường"
  },
  {
    category: "Thiết bị điện",
    name: "Dây điện đôi dẹt Cadivi 2x1.5 mm2 Cu/PVC 100m",
    modelNumber: "Cadivi-2x1.5",
    price: 780000,
    stock: 15,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Dây điện bọc nhựa Cadivi lõi đồng nguyên chất 99.99% dẫn điện tốt không chập cháy.",
    aiLabels: "dây điện cadivi, 2x1.5, ruột đồng"
  },
  {
    category: "Thiết bị điện",
    name: "Công tắc cảm biến chuyển động hồng ngoại gắn trần",
    modelNumber: "CB-HN-360",
    price: 145000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Công tắc tự bật đèn khi có người đi vào vùng cảm ứng góc rộng 360 độ.",
    aiLabels: "cảm biến chuyển động, bật đèn tự động, hồng ngoại"
  },
  {
    category: "Thiết bị điện",
    name: "Tủ điện nổi nhựa 2-4 đường chứa Aptomat",
    modelNumber: "TD-4P",
    price: 45000,
    stock: 50,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Vỏ tủ điện chứa aptomat nhựa mờ nắp đóng mở tiện lợi dùng lắp trong gia đình.",
    aiLabels: "tủ điện nhựa, 4p, tủ chứa aptomat"
  },
  {
    category: "Thiết bị điện",
    name: "Khóa van ngắt gas tự động an toàn điện từ",
    modelNumber: "VG-AUTO",
    price: 320000,
    stock: 12,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Van ngắt khóa gas tự động kết nối cảm biến rò rỉ gas bảo vệ căn bếp an toàn.",
    aiLabels: "khóa van gas, ngắt gas tự động, an toàn nhà bếp"
  },
  {
    category: "Thiết bị điện",
    name: "Kẹp xiết dây điện cáp vặn xoắn nhựa PVC",
    modelNumber: "KX-25",
    price: 8000,
    stock: 300,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Kẹp siết cáp treo dây điện ngoài cột đảm bảo an toàn chịu tải kéo.",
    aiLabels: "kẹp xiết dây điện, kẹp xiết cáp"
  },

  // ==========================================
  // DANH MỤC 2: Đèn chiếu sáng & Trang trí (25 sản phẩm)
  // ==========================================
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Bóng đèn LED Bulb Trụ Nhôm 20W Rạng Đông",
    modelNumber: "LED-A80/20W",
    price: 45000,
    stock: 90,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Bóng đèn LED trụ 20W tiết kiệm điện 85%, ánh sáng trắng 6500K siêu sáng không chớp nháy.",
    aiLabels: "bóng đèn led, 20w, rạng đông, siêu sáng, trụ nhôm"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Bóng đèn LED Bulb Trụ Nhôm 30W Rạng Đông",
    modelNumber: "LED-A100/30W",
    price: 75000,
    stock: 70,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Bóng LED 30W chóa nhôm tản nhiệt nhanh, tuổi thọ chiếu sáng hơn 25.000 giờ.",
    aiLabels: "bóng led 30w, rạng đông, ánh sáng trắng"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn LED Âm trần Downlight 9W 3 Màu Rạng Đông",
    modelNumber: "AT10-9W3M",
    price: 85000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "Đèn âm trần 9W đổi 3 chế độ màu (Trắng / Vàng / Trung tính) chỉ bằng thao tác bật tắt công tắc.",
    aiLabels: "đèn âm trần, downlight, 9w, 3 màu, rạng đông"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn Bán nguyệt LED Tuýp 1.2m 40W Điện Quang",
    modelNumber: "DQ-BN12M40W",
    price: 110000,
    stock: 45,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Đèn tuýp bán nguyệt Mica mờ tán quang rộng 180 độ 40W 1m2 siêu sáng cho phòng khách.",
    aiLabels: "đèn tuýp led, bán nguyệt, 1.2m, 40w, điện quang"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn Rọi ray LED COB 20W Thân đen Vỏ kim loại",
    modelNumber: "RR-COB-20W",
    price: 145000,
    stock: 35,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    description: "Đèn rọi điểm COB 20W rọi tranh, trang trí shop thời trang, quán cafe hiện đại.",
    aiLabels: "đèn rọi ray, cob 20w, rọi shop, trang trí"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn LED Pha Chống nước IP66 50W Ngoại thất",
    modelNumber: "PHA-IP66-50W",
    price: 260000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Đèn pha LED 50W vỏ nhôm đúc chịu nước IP66 chiếu sáng sân vườn, kho bãi, biển hiệu.",
    aiLabels: "đèn pha led, 50w, ip66, chống nước, ngoài trời"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn bàn học sinh bảo vệ thị lực chống cận Điện Quang",
    modelNumber: "DQ-LDL05",
    price: 215000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80",
    description: "Đèn học để bàn công nghệ LED chống cận thị, không gây mỏi mắt, điều chỉnh góc xoay linh hoạt.",
    aiLabels: "đèn bàn học, chống cận, điện quang, bảo vệ mắt"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn sưởi nhà tắm 3 bóng hồng ngoại Kottmann",
    modelNumber: "Kottmann-K3B",
    price: 680000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "Đèn sưởi phòng tắm 3 bóng mạ vàng không chói mắt, làm ấm tức thì vào mùa đông.",
    aiLabels: "đèn sưởi nhà tắm, 3 bóng, kottmann, hồng ngoại"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Bóng đèn tích điện thông minh 80W có móc treo",
    modelNumber: "LED-TD-80W",
    price: 85000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Bóng đèn sạc pin tích điện sáng liên tục 6-8 tiếng tiện lợi khi mất điện hoặc đi dã ngoại.",
    aiLabels: "bóng đèn tích điện, sạc pin, 80w, móc treo"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Dây đèn LED trang trí chớp nháy nhiều màu 10m",
    modelNumber: "LED-CN-10M",
    price: 35000,
    stock: 100,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    description: "Dây đèn nhấp nháy nhiều màu 10 mét trang trí cây thông Noel, quán ăn, tiệc sinh nhật.",
    aiLabels: "dây đèn led, chớp nháy, trang trí, 10m"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn bắt muỗi và côn trùng thông minh Đại Kiềm",
    modelNumber: "BM-DK01",
    price: 195000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80",
    description: "Đèn diệt muỗi bằng tia cực tím UV và quạt hút an toàn tuyệt đối không hóa chất độc hại.",
    aiLabels: "đèn bắt muỗi, diệt côn trùng, tia uv"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Bóng đèn LED Năng lượng mặt trời 100W kèm Remote",
    modelNumber: "NLMT-100W",
    price: 420000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Đèn chiếu sáng năng lượng mặt trời 100W tấm pin rời, tự động bật ban đêm tắt ban ngày.",
    aiLabels: "đèn năng lượng mặt trời, 100w, điều khiển từ xa"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn Ốp trần LED Mica Nổi 18W Tròn Rạng Đông",
    modelNumber: "ON02-18W",
    price: 165000,
    stock: 35,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "Đèn ốp nổi ban công, hành lang 18W chống côn trùng xâm nhập vỏ nhôm sơn tĩnh điện.",
    aiLabels: "đèn ốp trần, 18w, tròn, rạng đông"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn Tuýp LED T8 1.2m 22W Thủy tinh Rạng Đông",
    modelNumber: "LED-T8-1.2M",
    price: 65000,
    stock: 80,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Đèn tuýp LED thủy tinh T8 thay thế bóng huỳnh quang cũ, ánh sáng chân thực CRI > 80.",
    aiLabels: "đèn tuýp t8, 1.2m, 22w, rạng đông"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn LED Dây Cảm ứng thông minh dán gầm giường 2m",
    modelNumber: "LED-CU-2M",
    price: 135000,
    stock: 45,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    description: "Dây LED dán chân giường tự phát sáng khi đặt chân xuống đất ban đêm, ánh sáng dịu êm.",
    aiLabels: "dây led dán, cảm ứng bước chân, gầm giường"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn LED Trang trí thả trần phong cách Retro",
    modelNumber: "TH-RETRO-01",
    price: 245000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    description: "Đèn thả trang trí bằng đồng cổ điển thích hợp không gian bàn ăn, quầy bar.",
    aiLabels: "đèn thả trang trí, cổ điển, retro, bàn ăn"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn ngủ cắm tường cảm ứng ánh sáng tự động",
    modelNumber: "DN-CU-01",
    price: 25000,
    stock: 150,
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80",
    description: "Đèn ngủ cắm trực tiếp ổ điện tự bật khi phòng tối và tự tắt khi trời sáng.",
    aiLabels: "đèn ngủ, cảm ứng ánh sáng, cắm tường"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Máng đèn tuýp đôi 1.2m chóa sơn tĩnh điện",
    modelNumber: "MD-2X1.2M",
    price: 55000,
    stock: 50,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Máng đèn tuýp đôi dùng lắp 2 bóng LED T8 1m2 siêu chắc chắn.",
    aiLabels: "máng đèn tuýp đôi, 1.2m"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn LED cảm biến gắn tủ quần áo sạc USB",
    modelNumber: "LED-TU-30CM",
    price: 95000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "Đèn thanh dán tủ quần áo tự động sáng khi mở cửa tủ, tích hợp pin sạc nam châm hít.",
    aiLabels: "đèn cảm ứng tủ quần áo, dán tủ, sạc usb"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn tường ngoài trời chống nước đúc nhôm 12W",
    modelNumber: "DT-IP65-12W",
    price: 290000,
    stock: 18,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    description: "Đèn hắt tường 2 đầu hắt sáng trang trí cột cổng, vách tường ngoài trời cao cấp.",
    aiLabels: "đèn tường ngoài trời, hắt tường, chống nước"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn pin sạc siêu sáng chiếu xa 500m Đèn LED XML-T6",
    modelNumber: "DP-T6-500M",
    price: 185000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80",
    description: "Đèn pin cầm tay vỏ hợp kim nhôm chống nước chiếu xa 500m zoom xa gần tiện bảo vệ.",
    aiLabels: "đèn pin siêu sáng, xml t6, chiếu xa 500m"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn quay cảnh báo sự cố 12V 24V màu đỏ",
    modelNumber: "DQ-CB-RED",
    price: 110000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Đèn xoay cảnh báo công trường nguy hiểm phát âm thanh và còi hú đỏ báo hiệu.",
    aiLabels: "đèn quay cảnh báo, còi hú, màu đỏ"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Bóng đèn LED nến quả nhót đuôi E14 5W",
    modelNumber: "LED-E14-5W",
    price: 28000,
    stock: 100,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Bóng đèn LED hình ngọn nến đuôi xoáy E14 chuyên trang trí đèn chùm, bàn thờ.",
    aiLabels: "bóng nến, led e14, trang trí đèn chùm"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Đèn hào quang LED bàn thờ Phật 30cm phát sáng",
    modelNumber: "HQ-LED-30CM",
    price: 220000,
    stock: 22,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    description: "Đèn hào quang LED xoay nhiều màu trang trí tượng Phật bàn thờ gia tiên.",
    aiLabels: "đèn hào quang, bàn thờ phật, trang trí"
  },
  {
    category: "Đèn chiếu sáng & Trang trí",
    name: "Bóng đèn hồng ngoại sưởi ấm gia súc 150W",
    modelNumber: "HN-150W",
    price: 95000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Bóng đèn tỏa nhiệt hồng ngoại sưởi ấm gia cầm, thú cưng chống rét mùa đông.",
    aiLabels: "bóng sưởi hồng ngoại, 150w, sưởi ấm gia súc"
  },

  // ==========================================
  // DANH MỤC 3: Vật tư nước (20 sản phẩm)
  // ==========================================
  {
    category: "Vật tư nước",
    name: "Vòi rửa chén bát Inox 304 Cần mềm quay 360 độ",
    modelNumber: "VR-304-M",
    price: 340000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    description: "Vòi bồn rửa bát Inox 304 chuẩn mờ không gỉ sét, đầu vòi có 2 chế độ xịt rửa mạnh mẽ.",
    aiLabels: "vòi rửa chén, inox 304, cần mềm, xoay 360"
  },
  {
    category: "Vật tư nước",
    name: "Vòi sen tắm tăng áp Inox mặt mạ crom siêu mạnh",
    modelNumber: "ST-TA-01",
    price: 125000,
    stock: 50,
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
    description: "Bát sen tắm tăng áp 300 lỗ siêu mịn giúp dòng nước chảy mạnh gấp 3 lần tốn ít nước.",
    aiLabels: "vòi sen tắm, tăng áp, bát sen, inox"
  },
  {
    category: "Vật tư nước",
    name: "Van khóa nước tay gạt đồng thau Minh Hòa 21mm",
    modelNumber: "MH-V21",
    price: 55000,
    stock: 80,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Van bi khóa nước ren trong 21 tay gạt bằng đồng thau dày dặn Minh Hòa chính hãng.",
    aiLabels: "van khóa nước, van bi đồng, minh hòa, phi 21"
  },
  {
    category: "Vật tư nước",
    name: "Dây cấp nước Inox 304 chống xoắn 60cm đai đồng",
    modelNumber: "DC-INOX-60",
    price: 45000,
    stock: 100,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Dây dẫn nước mềm bọc lưới Inox chịu áp lực nước cao dùng cho bồn cầu, vòi lavabo.",
    aiLabels: "dây cấp nước, inox 304, 60cm, bồn cầu"
  },
  {
    category: "Vật tư nước",
    name: "Vòi hồ xịt xả nước đồng thau mạ crom mỏ dài",
    modelNumber: "VH-CR01",
    price: 75000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    description: "Vòi xả nước gắn tường dùng đấu nối máy giặt, tưới cây sân vườn cực tiện lợi.",
    aiLabels: "vòi hồ, vòi xả máy giặt, đồng mạ crom"
  },
  {
    category: "Vật tư nước",
    name: "Cuộn băng tan cao su suôn Tombo Nhật Bản 10m",
    modelNumber: "Tombo-9082",
    price: 15000,
    stock: 300,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Băng keo lụa quấn ren ống nước chống rò rỉ nước nhập khẩu chính hãng Tombo.",
    aiLabels: "băng tan, băng quấn ren, tombo, ống nước"
  },
  {
    category: "Vật tư nước",
    name: "Phao cơ chống tràn bể nước bồn inox ren 21mm",
    modelNumber: "PC-INOX-21",
    price: 110000,
    stock: 45,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Phao ngắt nước cơ học bồn chứa nước inox thế hệ mới ngắt nước tuyệt đối.",
    aiLabels: "phao cơ, chống tràn bồn nước, ren 21"
  },
  {
    category: "Vật tư nước",
    name: "Bộ vòi xịt vệ sinh Inox 304 dây lò xo ruột đồng",
    modelNumber: "VX-304",
    price: 135000,
    stock: 55,
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
    description: "Đầu xịt toilet Inox 304 xịt rửa tăng áp lực nước kèm dây và cài treo gắn tường.",
    aiLabels: "vòi xịt vệ sinh, xịt toilet, inox 304"
  },
  {
    category: "Vật tư nước",
    name: "Vòi lavabo nóng lạnh Inox 304 vuông mờ",
    modelNumber: "LV-NL-304",
    price: 480000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    description: "Vòi rửa mặt lavabo 2 đường nước nóng lạnh dáng vuông hiện đại chống bám bẩn.",
    aiLabels: "vòi lavabo, nóng lạnh, inox 304"
  },
  {
    category: "Vật tư nước",
    name: "Ống xả ruột gà bồn rửa chén bát đôi chống hôi",
    modelNumber: "XG-DOI",
    price: 85000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Bộ xi phông thoát nước 2 hộc chậu rửa chén chống trào ngược và ngăn mùi hôi.",
    aiLabels: "xi phông chậu rửa, ruột gà xả nước, chống hôi"
  },
  {
    category: "Vật tư nước",
    name: "Keo dán ống nhựa PVC Tiền Phong 100g",
    modelNumber: "Keo-TP100",
    price: 18000,
    stock: 120,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Keo dán ống nhựa dính chặt không rò rỉ nước chính hãng nhựa Tiền Phong.",
    aiLabels: "keo dán ống nhựa, pvc, tiền phong"
  },
  {
    category: "Vật tư nước",
    name: "Củ sen tắm nóng lạnh mạ Crom kèm chân zíc zắc",
    modelNumber: "CS-NL-CR",
    price: 390000,
    stock: 15,
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
    description: "Củ củ sen chia nước nóng lạnh bằng đồng đúc mạ crom sáng bóng bền bỉ.",
    aiLabels: "củ sen tắm, nóng lạnh, đồng mạ crom"
  },
  {
    category: "Vật tư nước",
    name: "Thoát sàn ngắt mùi hôi Inox 304 đúc vuông 12x12cm",
    modelNumber: "TS-304-12",
    price: 95000,
    stock: 50,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Phễu thu nước thoát sàn nhà tắm chống côn trùng ngắt mùi bằng van một chiều.",
    aiLabels: "phễu thoát sàn, inox 304, chống mùi hôi"
  },
  {
    category: "Vật tư nước",
    name: "Súng xịt tăng áp rửa xe và tưới cây 8 chế độ",
    modelNumber: "SX-8M",
    price: 115000,
    stock: 35,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    description: "Đầu vòi xịt nước rửa xe ô tô xe máy có nấc điều chỉnh 8 kiểu phun linh hoạt.",
    aiLabels: "súng xịt rửa xe, tưới cây, 8 chế độ"
  },
  {
    category: "Vật tư nước",
    name: "Van một chiều đồng lá lật phi 27mm Minh Hòa",
    modelNumber: "V1C-27",
    price: 78000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Van 1 chiều lò xo đồng thau bảo vệ đường ống chống dồn áp ngược.",
    aiLabels: "van 1 chiều, đồng lá lật, phi 27"
  },
  {
    category: "Vật tư nước",
    name: "Bơm tăng áp nước nóng tự động Panasonic 125W",
    modelNumber: "A-130JAK",
    price: 1550000,
    stock: 8,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Máy bơm tăng ápPanasonic chính hãng đẩy nước cực mạnh cho vòi sen, máy giặt gia đình.",
    aiLabels: "máy bơm tăng áp, panasonic, 125w, tự động"
  },
  {
    category: "Vật tư nước",
    name: "Ống nước dẻo phi 18mm chịu áp lực 10m",
    modelNumber: "OD-18-10M",
    price: 85000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Dây ống nhựa dẻo trong suốt tưới cây rửa sân chịu nắng mưa không gập xoắn.",
    aiLabels: "ống nước dẻo, phi 18, 10m"
  },
  {
    category: "Vật tư nước",
    name: "Bình lọc nước tại vòi 7 tầng lọc công nghệ than hoạt tính",
    modelNumber: "BL-TV7",
    price: 165000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    description: "Đầu lọc nước gắn trực tiếp vòi bồn rửa bát loại bỏ cặn bẩn, clo dư cho nguồn nước sạch.",
    aiLabels: "đầu lọc nước tại vòi, than hoạt tính"
  },
  {
    category: "Vật tư nước",
    name: "Nút bịt hố ga thoát nước silicone ngắt mùi hôi",
    modelNumber: "NB-SL01",
    price: 25000,
    stock: 120,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Nắp silicone ngăn mùi trào ngược và gián côn trùng từ cống rãnh bò lên.",
    aiLabels: "nút bịt silicone, ngắt mùi hôi cống"
  },
  {
    category: "Vật tư nước",
    name: "Xi phông bồn cầu chặn mùi hôi kèm keo dán",
    modelNumber: "XP-BC01",
    price: 45000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    description: "Vòng đệm cao su chặn mùi rò rỉ chân bồn cầu tiêu chuẩn dễ lắp đặt.",
    aiLabels: "vòng đệm bồn cầu, chặn mùi hôi"
  },

  // ==========================================
  // DANH MỤC 4: Smart Home & IoT (15 sản phẩm)
  // ==========================================
  {
    category: "Smart Home & IoT",
    name: "Ổ cắm Wifi thông minh Tuya 16A hẹn giờ",
    modelNumber: "Tuya-SP16",
    price: 165000,
    stock: 50,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
    description: "Ổ cắm điều khiển bật tắt bằng thoại qua Google Assistant & Alexa, app Smart Life.",
    aiLabels: "ổ cắm wifi, tuya, smart home, hẹn giờ"
  },
  {
    category: "Smart Home & IoT",
    name: "Công tắc cảm ứng Wifi Tuya 3 Nút Kính đen",
    modelNumber: "Tuya-SW3B",
    price: 310000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
    description: "Công tắc cảm ứng điện dung mặt kính cường lực điều khiển chiếu sáng từ xa qua điện thoại.",
    aiLabels: "công tắc cảm ứng, tuya wifi, 3 nút, kính đen"
  },
  {
    category: "Smart Home & IoT",
    name: "Camera Wifi Yoosee 3.0MP Xoay 360 độ Đàm thoại",
    modelNumber: "Yoosee-3MP",
    price: 380000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    description: "Camera quan sát Yoosee hình ảnh Full HD 3.0M xoay ngang 355 độ, xem đêm rõ nét.",
    aiLabels: "camera wifi, yoosee 3mp, xoay 360, đàm thoại"
  },
  {
    category: "Smart Home & IoT",
    name: "Rơ le điều khiển Sonoff Basic R2 Wifi eWeLink",
    modelNumber: "Sonoff-R2",
    price: 115000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
    description: "Công tắc rơ le nhỏ gọn biến thiết bị thường thành thiết bị thông minh hẹn giờ bật tắt.",
    aiLabels: "sonoff r2, rơ le wifi, ewelink"
  },
  {
    category: "Smart Home & IoT",
    name: "Cảm biến báo mở cửa và cửa sổ Tuya Zigbee",
    modelNumber: "Tuya-Z-Door",
    price: 175000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    description: "Cảm biến tách cửa báo động đột nhập tức thì về điện thoại an ninh gia đình.",
    aiLabels: "cảm biến cửa, tuya zigbee, báo động đột nhập"
  },
  {
    category: "Smart Home & IoT",
    name: "Chuông cửa không dây không dùng pin Linbell G2",
    modelNumber: "Linbell-G2",
    price: 280000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
    description: "Nút bấm chuông cửa tự sinh điện năng khi ấn không cần thay pin, truyền sóng xa 50m.",
    aiLabels: "chuông cửa không pin, linbell g2, chống nước"
  },
  {
    category: "Smart Home & IoT",
    name: "Bóng đèn LED thông minh RGB Tuya Wifi 9W E27",
    modelNumber: "Tuya-RGB-9W",
    price: 145000,
    stock: 45,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
    description: "Đổi 16 triệu màu sắc cảm ứng nháy theo nhịp nhạc điều khiển giọng nói Alexa.",
    aiLabels: "bóng đèn rgb, tuya wifi, đổi màu, nháy theo nhạc"
  },
  {
    category: "Smart Home & IoT",
    name: "Cảm biến chuyển động hồng ngoại Tuya Zigbee",
    modelNumber: "Tuya-Z-PIR",
    price: 195000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    description: "Phát hiện chuyển động người tạo ngữ cảnh tự động bật đèn khi bước vào phòng.",
    aiLabels: "cảm biến hồng ngoại, tuya pir, bật đèn tự động"
  },
  {
    category: "Smart Home & IoT",
    name: "Bộ trung tâm Gateway Zigbee Tuya Hub kết nối 50 thiết bị",
    modelNumber: "Tuya-Z-Hub",
    price: 350000,
    stock: 15,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
    description: "Bộ điều khiển trung tâm sóng Zigbee phản hồi nhanh không tốn băng thông Wifi nhà.",
    aiLabels: "hub zigbee, tuya gateway, trung tâm smart home"
  },
  {
    category: "Smart Home & IoT",
    name: "Camera Wifi ngoài trời EZVIZ C3N 1080P Xem đêm màu",
    modelNumber: "EZVIZ-C3N",
    price: 850000,
    stock: 12,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    description: "Camera thân ngoài trời chống nước IP67 nhận diện người AI và phát hiện chuyển động.",
    aiLabels: "camera ezviz c3n, ngoài trời, ban đêm có màu"
  },
  {
    category: "Smart Home & IoT",
    name: "Khóa cửa thông minh vân tay mật khẩu thẻ từ Tuya H2",
    modelNumber: "Tuya-H2",
    price: 1890000,
    stock: 8,
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
    description: "Khóa điện tử vân tay bán dẫn sinh trắc học sang trọng quản lý mật khẩu mở từ xa.",
    aiLabels: "khóa vân tay, khóa cửa thông minh, tuya h2"
  },
  {
    category: "Smart Home & IoT",
    name: "Điều khiển hồng ngoại thông minh Tuya S06 học lệnh TV Điều hòa",
    modelNumber: "Tuya-S06",
    price: 155000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
    description: "Biến smartphone thành điều khiển đa năng thay thế tất cả remote TV, quạt, máy lạnh.",
    aiLabels: "mắt hồng ngoại tuya, điều khiển máy lạnh tv"
  },
  {
    category: "Smart Home & IoT",
    name: "Cảm biến khói báo cháy thông minh Tuya Wifi 85dB",
    modelNumber: "Tuya-Smoke",
    price: 240000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    description: "Cảm biến báo khói âm thanh hú còi cực lớn 85dB kết hợp tin nhắn báo nguy khẩn cấp.",
    aiLabels: "báo khói thông minh, báo cháy tuya"
  },
  {
    category: "Smart Home & IoT",
    name: "Van nước hẹn giờ tự động thông minh Tuya Wifi tưới cây",
    modelNumber: "Tuya-Water-Valve",
    price: 520000,
    stock: 10,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
    description: "Bộ khóa van nước tưới cây tự động theo lịch hẹn giờ sẵn dùng cho sân vườn.",
    aiLabels: "van nước wifi, tưới cây tự động"
  },
  {
    category: "Smart Home & IoT",
    name: "Công tắc bình nóng lạnh công suất cao Tuya 40A 8000W",
    modelNumber: "Tuya-WH40A",
    price: 390000,
    stock: 18,
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
    description: "Công tắc cảm ứng công suất lớn hẹn giờ bật bình nóng lạnh trước khi về nhà.",
    aiLabels: "công tắc bình nóng lạnh, 40a, 8000w"
  },

  // ==========================================
  // DANH MỤC 5: Dụng cụ & Đồ nghề (15 sản phẩm)
  // ==========================================
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Máy khoan pin Makita 21V không chổi than kèm 2 pin",
    modelNumber: "Makita-21V-BL",
    price: 780000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    description: "Máy khoan vặn vít 3 chức năng khoan búa, bắt vít, động cơ không chổi than siêu bền.",
    aiLabels: "máy khoan pin, makita 21v, động cơ brushless"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Bộ tua vít đa năng 31 chi tiết mở điện thoại laptop",
    modelNumber: "TV-31IN1",
    price: 65000,
    stock: 80,
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
    description: "Bộ đầu tua vít nam châm thép CR-V sửa chữa đồ điện tử nhỏ gọn chính xác.",
    aiLabels: "bộ tua vít, 31 chi tiết, mở điện thoại laptop"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Kìm điện đa năng cắt tuốt dây điện cách điện 1000V",
    modelNumber: "KD-1000V",
    price: 95000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
    description: "Kìm răng thép rèn chịu lực tay bọc cao su cách điện an toàn 1000V cho thợ điện.",
    aiLabels: "kìm điện, cách điện 1000v, tuốt dây"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Bút thử điện thông minh báo điện không tiếp xúc",
    modelNumber: "BTD-NCV",
    price: 45000,
    stock: 100,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80",
    description: "Bút thử điện cảm ứng phát tiếng kêu còi tít tít và đèn báo ngay ngoài vỏ dây điện.",
    aiLabels: "bút thử điện thông minh, ncv, thử điện không tiếp xúc"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Thước cuộn thép vỏ bọc cao su chổng vỡ Komelon 5m",
    modelNumber: "Komelon-5M",
    price: 55000,
    stock: 90,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80",
    description: "Thước cuộn 5 mét mặt thước in rõ nét vỏ rèn cao su chống va đập rơi từ trên cao.",
    aiLabels: "thước cuộn 5m, komelon, chống vỡ"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Đĩa cắt sắt hợp kim Bosch 100mm mỏng 1mm hộp 25 viên",
    modelNumber: "Bosch-100x1",
    price: 190000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    description: "Đĩa cắt inox sắt bén ngọt không để lại bavia chuẩn chính hãng Bosch.",
    aiLabels: "đá cắt sắt, bosch 100mm, mỏng 1mm"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Cờ lê mỏ lết bọc nhựa 8 inch mở 0-30mm",
    modelNumber: "ML-8INCH",
    price: 85000,
    stock: 50,
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
    description: "Mỏ lết bằng thép hợp kim chrome vanadi ngàm kẹp chắc chắn mạ chống gỉ.",
    aiLabels: "mỏ lết 8 inch, mỏ lết mở ống nước"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Mỏ hàn nhiệt 60W kèm dây thiếc hàn và nhựa thông",
    modelNumber: "MH-60W-SET",
    price: 95000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
    description: "Tay mỏ hàn chì 60W nóng nhanh tặng kèm cuộn chì hàn và hộp nhựa thông tẩy mối hàn.",
    aiLabels: "mỏ hàn nhiệt 60w, thiếc hàn, nhựa thông"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Búa đinh cán thép bọc cao su 0.5kg gia đình",
    modelNumber: "BD-05KG",
    price: 65000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80",
    description: "Búa nhổ đinh rèn nguyên khối cán bọc cao su giảm chấn cầm nắm êm tay.",
    aiLabels: "búa đinh, nhổ đinh, 0.5kg"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Đồng hồ đo điện vạn năng kỹ thuật số Kyoritsu 1009",
    modelNumber: "Kyoritsu-1009",
    price: 890000,
    stock: 12,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80",
    description: "Đồng hồ VOM đo điện áp AC/DC, điện trở, tụ điện chính xác cao cho kỹ thuật viên.",
    aiLabels: "đồng hồ vạn năng, kyoritsu 1009, vom"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Bộ lục giác hoa thị 9 chi tiết thép bọc màu",
    modelNumber: "LG-9PC",
    price: 75000,
    stock: 45,
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
    description: "Bộ lục giác chữ L từ 1.5mm đến 10mm thép tráng màu phân biệt kích thước vặn mở ốc nội thất.",
    aiLabels: "bộ lục giác, 9 chi tiết, thép cứng"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Súng bắn keo nến 60W tặng kèm 10 cây keo nến",
    modelNumber: "SKN-60W",
    price: 70000,
    stock: 70,
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
    description: "Súng dán keo nến nóng chảy nhanh có công tắc gia nhiệt thích hợp làm thủ công dán đồ trang trí.",
    aiLabels: "súng bắn keo nến, 60w, keo nến"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Kìm bấm chết 10 inch thép hợp kim cao cấp",
    modelNumber: "KC-10INCH",
    price: 110000,
    stock: 35,
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
    description: "Kìm chết khóa lực kẹp giữ phôi kim loại cứng cáp điều chỉnh độ mở dễ dàng.",
    aiLabels: "kìm chết, 10 inch, kẹp lực"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Bộ mũi khoan đa năng khoét tường gạch kính 5 món",
    modelNumber: "MK-DN5",
    price: 60000,
    stock: 80,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    description: "Mũi khoan đầu hợp kim định tâm sắc bén khoan gạch men, kính, tường bê tông mỏng.",
    aiLabels: "mũi khoan đa năng, khoan gạch kính"
  },
  {
    category: "Dụng cụ & Đồ nghề",
    name: "Hộp đồ nghề sửa chữa nhựa 2 tầng 17 inch",
    modelNumber: "HDN-17INCH",
    price: 165000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
    description: "Thùng đựng dụng cụ xách tay nhựa PP chịu tải 30kg có khay phân loại ốc vít gọn gàng.",
    aiLabels: "thùng đựng đồ nghề, hộp dụng cụ 17 inch"
  }
];

async function main() {
  console.log("Bắt đầu khởi tạo dữ liệu chuẩn 100 sản phẩm Phú Lâm Store...");

  // 1. Tìm hoặc tạo danh mục
  const categoryMap = {};
  const categoryNames = [
    "Thiết bị điện",
    "Đèn chiếu sáng & Trang trí",
    "Vật tư nước",
    "Smart Home & IoT",
    "Dụng cụ & Đồ nghề"
  ];

  for (const name of categoryNames) {
    let cat = await prisma.category.findFirst({ where: { name } });
    if (!cat) {
      cat = await prisma.category.create({ data: { name } });
    }
    categoryMap[name] = cat.id;
  }

  // 2. Xóa các sản phẩm cũ
  console.log("Dọn dẹp dữ liệu sản phẩm cũ...");
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();

  // 3. Tạo 100 sản phẩm mới
  console.log(`Đang nạp 100 sản phẩm thực tế vào cơ sở dữ liệu...`);

  let count = 0;
  for (const item of rawProducts) {
    const categoryId = categoryMap[item.category];
    if (!categoryId) continue;

    await prisma.product.create({
      data: {
        name: item.name,
        modelNumber: item.modelNumber,
        price: item.price,
        stock: item.stock,
        image: item.image,
        description: item.description,
        aiLabels: item.aiLabels,
        categoryId: categoryId,
      },
    });
    count++;
  }

  console.log(`🎉 ĐÃ TẠO THÀNH CÔNG VÀ NẠP ĐẦY ĐỦ ${count} SẢN PHẨM THẬT VÀO HỆ THỐNG!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
