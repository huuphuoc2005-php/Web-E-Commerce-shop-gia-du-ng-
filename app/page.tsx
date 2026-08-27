import { db } from "@/lib/db";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import ElectricalCalculator from "./components/ElectricalCalculator";
import { ChevronRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import HeroCarousel from "./components/HeroCarousel";


// 1. Định nghĩa kiểu dữ liệu cho tham số tìm kiếm (URL)
interface HomeProps {
  searchParams: Promise<{
    query?: string;
    categoryId?: string;
    sort?: string;
    priceRange?: string;
  }>;
}

export default async function Home(props: HomeProps) {
  // 2. Lấy tham số từ URL
  const searchParams = await props.searchParams;
  const query = searchParams.query || "";
  const categoryId = searchParams.categoryId || "";
  const sort = searchParams.sort || "newest";
  const priceRange = searchParams.priceRange || "all";

  // 3. Lấy danh sách danh mục để làm bộ lọc
  let categories: any[] = [];
  try {
    categories = await db.category.findMany();
  } catch (e) {
    console.error("Lỗi kết nối DB (Categories), dùng fallback:", e);
    categories = [
      { id: "cat-1", name: "Công tắc & Ổ cắm" },
      { id: "cat-2", name: "Bóng đèn LED & Chiếu sáng" },
      { id: "cat-3", name: "Aptomat & Thiết bị bảo vệ" },
      { id: "cat-4", name: "Thiết bị Nước & Sen vòi" },
    ];
  }

  // Xác định cách sắp xếp
  let orderByCondition: Record<string, "asc" | "desc"> = { createdAt: "desc" };
  if (sort === "price-asc") {
    orderByCondition = { price: "asc" };
  } else if (sort === "price-desc") {
    orderByCondition = { price: "desc" };
  }

  // Điều kiện lọc giá
  let priceFilter = {};
  if (priceRange === "under-50k") {
    priceFilter = { price: { lte: 50000 } };
  } else if (priceRange === "50k-200k") {
    priceFilter = { price: { gte: 50000, lte: 200000 } };
  } else if (priceRange === "over-200k") {
    priceFilter = { price: { gte: 200000 } };
  }

  // Helper tạo URL với tham số search
  const createFilterUrl = (newParams: { categoryId?: string; sort?: string; priceRange?: string }) => {
    const params = new URLSearchParams();
    const targetCategory = newParams.categoryId !== undefined ? newParams.categoryId : categoryId;
    const targetSort = newParams.sort !== undefined ? newParams.sort : sort;
    const targetPrice = newParams.priceRange !== undefined ? newParams.priceRange : priceRange;

    if (query) params.set("query", query);
    if (targetCategory) params.set("categoryId", targetCategory);
    if (targetSort && targetSort !== "newest") params.set("sort", targetSort);
    if (targetPrice && targetPrice !== "all") params.set("priceRange", targetPrice);

    const queryString = params.toString();
    return queryString ? `/?${queryString}#products` : "/#products";
  };

  // 4. Lấy sản phẩm (Có điều kiện lọc & try-catch dự phòng)
  let products: any[] = [];
  try {
    products = await db.product.findMany({
      where: {
        AND: [
          query
            ? {
                OR: [
                  { name: { contains: query } },
                  { modelNumber: { contains: query } },
                  { aiLabels: { contains: query } },
                  { description: { contains: query } },
                ],
              }
            : {},
          categoryId ? { categoryId } : {},
          priceFilter,
        ],
      },
      include: { category: true },
      orderBy: orderByCondition,
    });
  } catch (e) {
    console.error("Lỗi kết nối DB (Products), dùng fallback sản phẩm mẫu:", e);
    products = [
      {
        id: "cm-01",
        name: "Aptomat Chống giật RCCB Schneider 2P 40A 30mA",
        price: 490000,
        originalPrice: 580000,
        image: "/images/congtacdoi2chieusino.png",
        modelNumber: "EZ9R33240",
        description: "Aptomat chống rò điện Schneider 40A 30mA chính hãng, ngắt điện trong 0.03s.",
        category: { name: "Aptomat & Thiết bị bảo vệ" },
        stock: 50,
      },
      {
        id: "cm-02",
        name: "Aptomat Cầu dao tự động Panasonic 2P 32A",
        price: 135000,
        originalPrice: 160000,
        image: "/images/banner-premium-plumbing-3.png",
        modelNumber: "MCB-BBN2322",
        description: "Cầu dao tự động ngắt khi quá tải ngắn mạch Panasonic 32A 2P.",
        category: { name: "Aptomat & Thiết bị bảo vệ" },
        stock: 100,
      },
      {
        id: "cm-03",
        name: "Bóng đèn LED Bulb Trụ Nhôm 20W Rạng Đông",
        price: 45000,
        originalPrice: 60000,
        image: "/images/LED-buildtru-nhomnhua20W.jpg",
        modelNumber: "LED-A80/20W",
        description: "Bóng đèn LED 20W siêu sáng, tiết kiệm 85% điện năng, chip Samsung.",
        category: { name: "Bóng đèn LED & Chiếu sáng" },
        stock: 200,
      },
      {
        id: "cm-04",
        name: "Đèn LED Âm trần Downlight 9W 3 Màu Rạng Đông",
        price: 85000,
        originalPrice: 110000,
        image: "/images/LED-buildtru-nhomnhua20W.jpg",
        modelNumber: "AT10-9W3M",
        description: "Đèn âm trần 9W đổi 3 màu ánh sáng (Trắng - Vàng - Trung tính).",
        category: { name: "Bóng đèn LED & Chiếu sáng" },
        stock: 150,
      },
      {
        id: "cm-05",
        name: "Công tắc cảm ứng Tuya Smart Wifi 3 Nút Kính đen",
        price: 320000,
        originalPrice: 390000,
        image: "/images/congtacdoi2chieusino.png",
        modelNumber: "Tuya-SW3-BLK",
        description: "Công tắc cảm ứng thông minh Tuya Wifi bật tắt từ xa qua app điện thoại.",
        category: { name: "Công tắc & Ổ cắm" },
        stock: 80,
      },
      {
        id: "cm-06",
        name: "Tuya Smart Wifi Ổ cắm âm tường đơn US Trắng",
        price: 210000,
        originalPrice: 260000,
        image: "/images/banner-ocam.png",
        modelNumber: "Tuya-WUS-1P",
        description: "Ổ cắm thông minh hẹn giờ tự động ngắt sạc qua Wifi 16A.",
        category: { name: "Công tắc & Ổ cắm" },
        stock: 90,
      },
      {
        id: "cm-07",
        name: "Vòi sen tắm tăng áp Mặt inox Cụm bát sen 3 chế độ",
        price: 95000,
        originalPrice: 130000,
        image: "/images/banner-premium-plumbing-3.png",
        modelNumber: "SEN-TA-03",
        description: "Bát sen tắm inox 304 tăng áp lực nước 300% cho nguồn nước yếu.",
        category: { name: "Thiết bị Nước & Sen vòi" },
        stock: 120,
      },
      {
        id: "cm-08",
        name: "Sino S18 Series Công tắc 1 nút vuông Trắng",
        price: 25000,
        originalPrice: 32000,
        image: "/images/congtacdoi2chieusino.png",
        modelNumber: "S181",
        description: "Công tắc đơn Sino S181 nhựa PC chống cháy cách điện chính hãng.",
        category: { name: "Công tắc & Ổ cắm" },
        stock: 300,
      }
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main>
        {!query && !categoryId && (
          <HeroCarousel categories={categories.map((cat) => ({ id: cat.id, name: cat.name }))} />
        )}
        <section className="bg-white border-b">
          <div className="max-w-screen-2xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50">
               <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Truck size={24} /></div>
               <div><p className="font-bold text-gray-800">Giao hàng</p><p className="text-xs text-gray-500">Nội thành - Ngoại tỉnh</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50">
               <div className="bg-green-100 p-3 rounded-full text-green-600"><ShieldCheck size={24} /></div>
               <div><p className="font-bold text-gray-800">Chính hãng</p><p className="text-xs text-gray-500">Bồi thường nếu hàng giả</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-orange-50">
               <div className="bg-orange-100 p-3 rounded-full text-orange-600"><RefreshCw size={24} /></div>
               <div><p className="font-bold text-gray-800">Đổi trả miễn phí</p><p className="text-xs text-gray-500">Trong vòng 7 ngày</p></div>
            </div>
          </div>
        </section>

        {/* CATEGORY & PRODUCTS */}
        <div id="products" className="max-w-screen-2xl mx-auto px-4 py-12">
          
          {/* Bộ lọc Danh mục */}
          <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
            <Link
              href={createFilterUrl({ categoryId: "" })}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition border ${
                !categoryId 
                ? "bg-gray-900 text-white border-gray-900" 
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              Tất cả sản phẩm
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={createFilterUrl({ categoryId: cat.id })}
                className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition border ${
                  categoryId === cat.id 
                  ? "bg-blue-600 text-white border-blue-600" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Tiêu đề & Nút Sắp xếp + Bộ lọc Khoảng giá */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {query ? `Kết quả tìm kiếm: "${query}"` : (categoryId ? "Sản phẩm theo danh mục" : "Gợi ý hôm nay")}
              <span className="text-sm font-normal text-gray-500">({products.length} sản phẩm)</span>
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium text-gray-600">
              {/* Lọc Giá */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-gray-400 whitespace-nowrap">Giá:</span>
                {[
                  { key: "all", label: "Tất cả" },
                  { key: "under-50k", label: "< 50k" },
                  { key: "50k-200k", label: "50k - 200k" },
                  { key: "over-200k", label: "> 200k" },
                ].map((p) => (
                  <Link
                    key={p.key}
                    href={createFilterUrl({ priceRange: p.key })}
                    className={`px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
                      priceRange === p.key
                        ? "bg-gray-900 text-white border-gray-900 font-bold"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>

              {/* Sắp xếp */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 border-l border-gray-200 pl-3">
                <span className="text-gray-400 whitespace-nowrap">Sắp xếp:</span>
                <Link
                  href={createFilterUrl({ sort: "newest" })}
                  className={`px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
                    sort === "newest"
                      ? "bg-blue-50 text-blue-600 border-blue-200 font-bold"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Mới nhất
                </Link>
                <Link
                  href={createFilterUrl({ sort: "price-asc" })}
                  className={`px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
                    sort === "price-asc"
                      ? "bg-blue-50 text-blue-600 border-blue-200 font-bold"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Giá ↑
                </Link>
                <Link
                  href={createFilterUrl({ sort: "price-desc" })}
                  className={`px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
                    sort === "price-desc"
                      ? "bg-blue-50 text-blue-600 border-blue-200 font-bold"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Giá ↓
                </Link>
              </div>
            </div>
          </div>

          {/* Grid Sản phẩm */}
          {products.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
               <p className="text-gray-400 text-lg">Không tìm thấy sản phẩm phù hợp.</p>
               <Link href="/" className="text-blue-600 underline mt-2 block">Xóa bộ lọc</Link>
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {products.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer/>
    </div>
  );
}