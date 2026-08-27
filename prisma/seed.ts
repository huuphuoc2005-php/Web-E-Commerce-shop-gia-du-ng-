import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";
const prisma = new PrismaClient()

async function main() {
  console.log("Bắt đầu gieo mầm dữ liệu hệ thống Phú Lâm Store...");
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  const userPasswordHash = await bcrypt.hash("user123", 10);

  console.log("1. Đang kiểm tra và tạo tài khoản mẫu...");
  await prisma.user.upsert({
    where: { email: 'admin@phulam.com' },
    update: {},
    create: {
      email: 'admin@phulam.com',
      password: adminPasswordHash,
      role: 'ADMIN',
      name: 'Phạm Hữu Phước (Admin)',
      phone: '0869001296',
      address: '103, QL37 TT Vĩnh Bảo, Hải Phòng',
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@phulam.com' },
    update: {},
    create: {
      email: 'user@phulam.com',
      password: userPasswordHash,
      role: 'USER',
      name: 'Nguyễn Văn Anh',
      phone: '0987654321',
      address: 'Số 45, Đường Lê Hồng Phong, Ngô Quyền, Hải Phòng',
    },
  });

  console.log("2. Đang tạo Cài đặt Cửa hàng mẫu (StoreSetting)...");
  await prisma.storeSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      storeName: "Phú Lâm Store",
      phone: "0869001296",
      address: "103, QL37 TT Vĩnh Bảo, TP. Hải Phòng",
      email: "phulamphuocphuong4@gmail.com",
      shippingFee: 15000,
      freeShipThreshold: 200000,
      bannerAnnouncement: "🔥 Siêu ưu đãi tháng này: Miễn phí vận chuyển cho đơn hàng từ 200.000đ!",
      maintenanceMode: false,
    },
  });

  console.log("3. Dọn dẹp dữ liệu cũ...");
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("4. Đang tạo Danh mục & Kho hàng hơn 40 sản phẩm phong phú...");
  const catDien = await prisma.category.create({ data: { name: "Thiết bị điện" } });
  const catNuoc = await prisma.category.create({ data: { name: "Vật tư nước" } });
  const catIot = await prisma.category.create({ data: { name: "Smart Home & IoT" } });
  const catDen = await prisma.category.create({ data: { name: "Đèn chiếu sáng & Trang trí" } });
  const catDoNghe = await prisma.category.create({ data: { name: "Dụng cụ & Đồ nghề" } });

  const products = [
    // --- Thiết bị điện ---
    {
      name: "Sino S18 Series Công tắc 1 nút vuông Trắng",
      modelNumber: "S181",
      price: 25000,
      stock: 45,
      image: "/images/congtacdoi2chieusino.png",
      description: "Công tắc điện Sino S181 màu trắng, chuẩn lắp âm tường hạt nhỏ êm ái.",
      aiLabels: "màu trắng, hình vuông, 1 nút vuông, sino, công tắc, s18",
      categoryId: catDien.id
    },
    {
      name: "Sino S18 Series Công tắc đôi 2 chiều Trắng",
      modelNumber: "S182/2C",
      price: 48000,
      stock: 35,
      image: "/images/congtacdoi2chieusino.png",
      description: "Công tắc đôi đảo chiều Sino S18, mặt chữ nhật nhựa chống cháy.",
      aiLabels: "màu trắng, 2 nút, công tắc đảo chiều, sino, s18",
      categoryId: catDien.id
    },
    {
      name: "Ổ cắm đôi 3 chấu Sino Vanlock Trắng",
      modelNumber: "S1830K",
      price: 65000,
      stock: 60,
      image: "/images/banner-ocam.png",
      description: "Ổ cắm điện đôi 3 chấu Sino Vanlock có màng che an toàn cho trẻ em.",
      aiLabels: "ổ cắm đôi, 3 chấu, sino, vanlock, s1830k",
      categoryId: catDien.id
    },
    {
      name: "Aptomat Cầu dao tự động Panasonic 2P 32A",
      modelNumber: "MCB-BBN2322",
      price: 135000,
      stock: 25,
      image: "/images/banner-premium-plumbing-3.png",
      description: "Aptomat ngắt mạch tự động Panasonic 32A chính hãng Nhật Bản.",
      aiLabels: "aptomat, cầu dao, panasonic, 32a, mcb",
      categoryId: catDien.id
    },
    {
      name: "Aptomat Chống giật RCCB Schneider 2P 40A 30mA",
      modelNumber: "EZ9R33240",
      price: 490000,
      stock: 18,
      image: "/images/congtacdoi2chieusino.png",
      description: "Cầu dao chống giật RCCB Schneider bảo vệ gia đình an toàn tuyệt đối.",
      aiLabels: "aptomat chống giật, schneider, 40a, rccb",
      categoryId: catDien.id
    },
    {
      name: "Phích cắm điện cao su chịu tải đúc liền 4000W",
      modelNumber: "P-4000W",
      price: 22000,
      stock: 55,
      image: "/images/banner-ocam.png",
      description: "Phích cắm cao su đúc nguyên khối chống vỡ, chịu tải công suất lớn.",
      aiLabels: "phích cắm, chịu tải, 4000w, cao su",
      categoryId: catDien.id
    },
    {
      name: "Ổ cắm dây nối dài 6 lỗ Sopoka 5m Chịu tải cao",
      modelNumber: "SK-6L5M",
      price: 155000,
      stock: 30,
      image: "/images/banner-ocam.png",
      description: "Ổ cắm kéo dài Sopoka 6 cắm, dây dài 5 mét lõi đồng nguyên chất.",
      aiLabels: "ổ cắm dây dài, sopoka, 6 lỗ, 5m",
      categoryId: catDien.id
    },

    // --- Đèn chiếu sáng & Trang trí ---
    {
      name: "Bóng đèn LED Bulb Trụ Nhôm 20W Rạng Đông",
      modelNumber: "LED-A80/20W",
      price: 45000,
      stock: 65,
      image: "/images/LED-buildtru-nhomnhua20W.jpg",
      description: "Bóng đèn LED 20W tiết kiệm điện, ánh sáng trắng 6500K chiếu sáng siêu sáng.",
      aiLabels: "tròn, bóng đèn, led, rạng đông, 20w, màu trắng",
      categoryId: catDen.id
    },
    {
      name: "Bóng đèn LED Bulb Trụ Nhôm 30W Rạng Đông",
      modelNumber: "LED-A100/30W",
      price: 75000,
      stock: 50,
      image: "/images/LED-buildtru-nhomnhua20W.jpg",
      description: "Bóng LED trụ nhôm nhựa 30W tỏa nhiệt tốt, tuổi thọ lên tới 25.000 giờ.",
      aiLabels: "bóng led 30w, rạng đông, siêu sáng, ánh sáng trắng",
      categoryId: catDen.id
    },
    {
      name: "Đèn LED Âm trần Downlight 9W 3 Màu Rạng Đông",
      modelNumber: "AT10-9W3M",
      price: 85000,
      stock: 40,
      image: "/images/LED-buildtru-nhomnhua20W.jpg",
      description: "Đèn âm trần 9W đổi 3 màu (Trắng/Vàng/Trung tính) công nghệ viền nhôm.",
      aiLabels: "đèn âm trần, downlight, rạng đông, 9w, 3 màu",
      categoryId: catDen.id
    },
    {
      name: "Đèn Bán nguyệt LED Tuýp 1.2m 40W Điện Quang",
      modelNumber: "DQ-BN12M40W",
      price: 110000,
      stock: 32,
      image: "/images/LED-buildtru-nhomnhua20W.jpg",
      description: "Đèn tuýp LED bán nguyệt tràn viền 40W 1m2 góc chiếu sáng rộng 180 độ.",
      aiLabels: "đèn tuýp led, bán nguyệt, 1.2m, 40w, điện quang",
      categoryId: catDen.id
    },
    {
      name: "Đèn Rọi ray LED COB 20W Thân đen Vỏ kim loại",
      modelNumber: "RR-COB-20W",
      price: 145000,
      stock: 20,
      image: "/images/LED-buildtru-nhomnhua20W.jpg",
      description: "Đèn rọi điểm COB 20W chuyên dùng cho shop thời trang, quán cafe.",
      aiLabels: "đèn rọi ray, cob, 20w, thân đen, trang trí shop",
      categoryId: catDen.id
    },
    {
      name: "Đèn LED Pha Chống nước IP66 50W Ngoại thất",
      modelNumber: "PHA-IP66-50W",
      price: 260000,
      stock: 15,
      image: "/images/LED-buildtru-nhomnhua20W.jpg",
      description: "Đèn pha LED 50W chuẩn chống nước bụi IP66 chiếu sáng sân vườn, biển hiệu.",
      aiLabels: "đèn pha led, ip66, 50w, chống nước, chiếu sáng sân",
      categoryId: catDen.id
    },

    // --- Smart Home & IoT ---
    {
      name: "Tuya Smart Wifi Ổ cắm âm tường đơn US Trắng",
      modelNumber: "Tuya-WUS-1P",
      price: 210000,
      stock: 30,
      image: "/images/banner-ocam.png",
      description: "Ổ cắm thông minh Tuya Wifi điều khiển bật tắt từ xa qua app Smart Life.",
      aiLabels: "ổ cắm wifi, thông minh, smart home, tuya, màu trắng",
      categoryId: catIot.id
    },
    {
      name: "Công tắc cảm ứng Tuya Smart Wifi 3 Nút Kính đen",
      modelNumber: "Tuya-SW3-BLK",
      price: 320000,
      stock: 22,
      image: "/images/congtacdoi2chieusino.png",
      description: "Công tắc cảm ứng mặt kính cường lực màu đen 3 nút kết nối Wifi Smart Life.",
      aiLabels: "công tắc cảm ứng, tuya, wifi, 3 nút, kính đen",
      categoryId: catIot.id
    },
    {
      name: "Sonoff Basic R2 Rơ le điều khiển thông minh Wifi",
      modelNumber: "Sonoff-R2",
      price: 115000,
      stock: 50,
      image: "/images/congtacdoi2chieusino.png",
      description: "Module rơ le công tắc Wifi Sonoff Basic R2 chính hãng eWeLink.",
      aiLabels: "sonoff, rơ le wifi, ewelink, công tắc thông minh",
      categoryId: catIot.id
    },
    {
      name: "Cảm biến Cửa & Cửa sổ Thông minh Tuya Zigbee",
      modelNumber: "Tuya-Z-Door",
      price: 180000,
      stock: 28,
      image: "/images/banner-ocam.png",
      description: "Cảm biến báo động mở cửa chuẩn Zigbee báo chuông và thông báo điện thoại.",
      aiLabels: "cảm biến cửa, tuya zigbee, báo động, an ninh",
      categoryId: catIot.id
    },
    {
      name: "Camera Wifi Yoosee 3.0MP Xoay 360 độ Trong nhà",
      modelNumber: "Yoosee-3MP-360",
      price: 380000,
      stock: 16,
      image: "/images/banner-ocam.png",
      description: "Camera quan sát Yoosee độ phân giải 3.0 Megapixel xoay ngang dọc đàm thoại 2 chiều.",
      aiLabels: "camera wifi, yoosee, 3mp, xoay 360, giám sát",
      categoryId: catIot.id
    },

    // --- Vật tư nước ---
    {
      name: "Ống nhựa PVC Tiền Phong phi 27 Class 1 (4m/cây)",
      modelNumber: "TP-PVC-27-C1",
      price: 38000,
      stock: 50,
      image: "/images/banner-premium-plumbing-3.png",
      description: "Ống nhựa PVC Tiền Phong phi 27 dày dặn, chịu áp lực nước tốt.",
      aiLabels: "ống nhựa, pvc, phi 27, tiền phong, thoát nước",
      categoryId: catNuoc.id
    },
    {
      name: "Ống nhựa PPR Tiền Phong D25 Dẫn nước nóng (4m/cây)",
      modelNumber: "TP-PPR-25-HOT",
      price: 78000,
      stock: 40,
      image: "/images/banner-premium-plumbing-3.png",
      description: "Ống hàn nhiệt PPR D25 Tiền Phong chuyên dùng dẫn nước nóng thái dương năng.",
      aiLabels: "ống ppr, hàn nhiệt, nước nóng, tiền phong, d25",
      categoryId: catNuoc.id
    },
    {
      name: "Vòi sen tắm tăng áp Mặt inox Cụm bát sen 3 chế độ",
      modelNumber: "SEN-TA-03",
      price: 95000,
      stock: 35,
      image: "/images/banner-premium-plumbing-3.png",
      description: "Bát sen tắm tăng áp lực nước mạnh mẽ mặt inox 304 có núm chỉnh chế độ phun.",
      aiLabels: "vòi sen tắm, tăng áp, inox 304, bát sen",
      categoryId: catNuoc.id
    },
    {
      name: "Van khóa nước đồng thau Minh Hòa phi 21 (D15)",
      modelNumber: "MH-MIHA-21",
      price: 85000,
      stock: 48,
      image: "/images/banner-premium-plumbing-3.png",
      description: "Van bi tay gạt đồng thau Miha Minh Hòa sản xuất tại Việt Nam siêu bền.",
      aiLabels: "van khóa nước, van đồng, minh hòa, phi 21",
      categoryId: catNuoc.id
    },
    {
      name: "Vòi hồ xả nước inox 304 tay gạt phi 21",
      modelNumber: "VH-INOX-21",
      price: 68000,
      stock: 42,
      image: "/images/banner-premium-plumbing-3.png",
      description: "Vòi xả chậu rửa / vòi máy giặt inox 304 chuẩn không rỉ sét.",
      aiLabels: "vòi xả nước, inox 304, vòi hồ, phi 21",
      categoryId: catNuoc.id
    },

    // --- Dụng cụ & Đồ nghề ---
    {
      name: "Kìm tuốt dây điện đa năng Tolsen 0.6-2.6mm",
      modelNumber: "Tolsen-10028",
      price: 125000,
      stock: 30,
      image: "/images/congtacdoi2chieusino.png",
      description: "Kìm cắt và tuốt dây điện tự động Tolsen chất liệu thép CR-V cao cấp.",
      aiLabels: "kìm tuốt dây, tolsen, cắt dây điện, đồ nghề",
      categoryId: catDoNghe.id
    },
    {
      name: "Tua vít thử điện điện tử hiện màn hình LCD",
      modelNumber: "TV-LCD-01",
      price: 35000,
      stock: 60,
      image: "/images/congtacdoi2chieusino.png",
      description: "Bút thử điện thông minh đo dải điện áp từ 12V - 250V hiện số màn hình LCD.",
      aiLabels: "bút thử điện, tua vít, đo điện tử, lcd",
      categoryId: catDoNghe.id
    },
    {
      name: "Băng dính điện Nano PVC Chống cháy màu đen (Cuộn 20y)",
      modelNumber: "Nano-Black-20",
      price: 12000,
      stock: 70,
      image: "/images/congtacdoi2chieusino.png",
      description: "Băng keo cách điện Nano chính hãng độ dính cực cao, khả năng co dãn chịu nhiệt tốt.",
      aiLabels: "băng dính điện, nano, cách điện, màu đen",
      categoryId: catDoNghe.id
    },
    {
      name: "Đồng hồ đo điện vạn năng Kyoritsu 1009 Nhật Bản",
      modelNumber: "Kyoritsu-1009",
      price: 890000,
      stock: 12,
      image: "/images/congtacdoi2chieusino.png",
      description: "Đồng hồ VOM vạn năng Kyoritsu đo điện áp, dòng điện, điện trở chính xác cao.",
      aiLabels: "đồng hồ vạn năng, kyoritsu, đo điện, kyoritsu 1009",
      categoryId: catDoNghe.id
    }
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log("5. Đang gieo mầm Mã giảm giá (Vouchers)...");
  await prisma.voucher.deleteMany();
  await prisma.voucher.createMany({
    data: [
      { code: "PHULAM10", discountPercent: 10, minOrderAmount: 100000, active: true },
      { code: "GIAM50K", discountAmount: 50000, minOrderAmount: 200000, active: true },
      { code: "FREESHIP", discountAmount: 15000, minOrderAmount: 0, active: true },
      { code: "WELCOME20K", discountAmount: 20000, minOrderAmount: 50000, active: true },
    ],
  });

  console.log("✅ Gieo mầm thành công! Đã cập nhật cơ sở dữ liệu phong phú.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
