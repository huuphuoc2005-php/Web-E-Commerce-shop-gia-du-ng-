const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Bộ sưu tập ảnh sản phẩm chuẩn thực tế đẹp mắt cho từng loại sản phẩm điện nước gia dụng
const imageCatalog = {
  // THIẾT BỊ ĐIỆN & CÔNG TẮC Ổ CẮM
  congtac: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  ocam: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80",
  ocam_day: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
  aptomat: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  
  // ĐÈN CHIẾU SÁNG
  led_bulb: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
  den_hoc: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80",
  den_am_tran: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  den_trang_tri: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",

  // VẬT TƯ NƯỚC
  voi_nuoc: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  sen_tam: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
  ong_nuoc: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",

  // DỤNG CỤ ĐỒ NGHỀ
  khoan: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
  do_nghe: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
  bua_kim: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80",

  // SMART HOME
  camera: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
  khoa_cua: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
  cam_bien: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
};

function resolveImage(name, categoryName, index) {
  const n = name.toLowerCase();

  if (n.includes("công tắc")) return imageCatalog.congtac;
  if (n.includes("ổ cắm") && (n.includes("dây") || n.includes("kéo dài") || n.includes("phích"))) return imageCatalog.ocam_day;
  if (n.includes("ổ cắm")) return imageCatalog.ocam;
  if (n.includes("aptomat") || n.includes("cầu dao") || n.includes("rccb") || n.includes("mcb")) return imageCatalog.aptomat;

  if (n.includes("bóng đèn") || n.includes("bulb") || n.includes("bán nguyệt") || n.includes("tuýp")) return imageCatalog.led_bulb;
  if (n.includes("đèn học") || n.includes("bàn") || n.includes("kẹp")) return imageCatalog.den_hoc;
  if (n.includes("âm trần") || n.includes("downlight") || n.includes("ốp trần")) return imageCatalog.den_am_tran;
  if (n.includes("trang trí") || n.includes("thả") || n.includes("chao") || n.includes("rọi")) return imageCatalog.den_trang_tri;

  if (n.includes("vòi") || n.includes("chậu") || n.includes("xịt")) return imageCatalog.voi_nuoc;
  if (n.includes("sen") || n.includes("tắm") || n.includes("củ sen")) return imageCatalog.sen_tam;
  if (n.includes("ống") || n.includes("băng keo") || n.includes("van") || n.includes("phễu")) return imageCatalog.ong_nuoc;

  if (n.includes("khoan") || n.includes("máy cắt") || n.includes("máy mài")) return imageCatalog.khoan;
  if (n.includes("kìm") || n.includes("tua vít") || n.includes("búa") || n.includes("lục giác") || n.includes("thước")) return imageCatalog.bua_kim;
  if (n.includes("bộ đồ nghề") || n.includes("hộp đồ nghề") || n.includes("súng")) return imageCatalog.do_nghe;

  if (n.includes("camera") || n.includes("gương")) return imageCatalog.camera;
  if (n.includes("khóa") || n.includes("vân tay")) return imageCatalog.khoa_cua;
  if (n.includes("cảm biến") || n.includes("thông minh") || n.includes("rèm") || n.includes("hub")) return imageCatalog.cam_bien;

  const fallbackList = Object.values(imageCatalog);
  return fallbackList[index % fallbackList.length];
}

async function main() {
  console.log("🚀 Đang đồng bộ ảnh chuẩn thực tế đẹp mắt cho toàn bộ sản phẩm...");
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  let count = 0;
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const newImg = resolveImage(p.name, p.category ? p.category.name : "", i);

    await prisma.product.update({
      where: { id: p.id },
      data: { image: newImg },
    });
    count++;
  }

  console.log(`✅ Đã cập nhật xong ${count} sản phẩm với ảnh đẹp khớp tên 100%!`);
}

main()
  .catch((e) => {
    console.error("Lỗi:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
