import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoryImages: Record<string, string[]> = {
  "Thiết bị điện": [
    "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  ],
  "Đèn chiếu sáng & Trang trí": [
    "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
  ],
  "Vật tư nước": [
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
  ],
  "Smart Home & IoT": [
    "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
  ],
  "Dụng cụ & Đồ nghề": [
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80",
  ],
};

function getImageUrlForProduct(name: string, categoryName: string, index: number): string {
  const lowerName = name.toLowerCase();

  // Keyword specific matching for hyper-accuracy
  if (lowerName.includes("bóng đèn") || lowerName.includes("led bulb")) {
    return "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80";
  }
  if (lowerName.includes("đèn học") || lowerName.includes("bàn")) {
    return "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80";
  }
  if (lowerName.includes("đèn âm trần") || lowerName.includes("downlight")) {
    return "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80";
  }
  if (lowerName.includes("vòi") || lowerName.includes("sen")) {
    return "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80";
  }
  if (lowerName.includes("khoan") || lowerName.includes("máy khoan")) {
    return "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80";
  }
  if (lowerName.includes("kìm") || lowerName.includes("tua vít") || lowerName.includes("bộ đồ nghề")) {
    return "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80";
  }
  if (lowerName.includes("camera")) {
    return "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80";
  }
  if (lowerName.includes("ổ cắm") || lowerName.includes("phích cắm")) {
    return "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80";
  }
  if (lowerName.includes("công tắc") || lowerName.includes("aptomat")) {
    return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80";
  }

  // Fallback to Category Pool
  const pool = categoryImages[categoryName] || categoryImages["Thiết bị điện"];
  return pool[index % pool.length];
}

async function main() {
  console.log("Đang cập nhật ảnh sản phẩm thật cho toàn bộ hệ thống...");
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  let count = 0;
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const newImage = getImageUrlForProduct(product.name, product.category?.name || "", i);

    await prisma.product.update({
      where: { id: product.id },
      data: { image: newImage },
    });
    count++;
  }

  console.log(`Đã cập nhật ảnh đẹp sắc nét cho ${count} sản phẩm thành công!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
