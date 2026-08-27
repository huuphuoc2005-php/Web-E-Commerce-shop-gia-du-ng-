import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductActions from "@/app/components/ProductActions";
import ProductCard from "@/app/components/ProductCard";
import ProductReviewSection from "@/app/components/ProductReviewSection";
import ProductDetailTabs from "@/app/components/ProductDetailTabs";
import { ShieldCheck, Truck, RefreshCw, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// 1. Định nghĩa kiểu dữ liệu cho params là Promise
interface ProductPageProps {
  params: Promise<{ productID: string }>;
}

export async function generateMetadata(props: ProductPageProps) {
  const params = await props.params;
  const product = await db.product.findUnique({
    where: { id: params.productID },
    select: { name: true, description: true, image: true },
  });

  if (!product) return { title: "Sản phẩm không tồn tại - Phú Lâm Store" };

  return {
    title: `${product.name} - Phú Lâm Store`,
    description: product.description || `Mua ${product.name} chính hãng, bảo hành 12 tháng tại Phú Lâm Store.`,
    openGraph: {
      title: product.name,
      description: product.description || `Mua ${product.name} chính hãng tại Phú Lâm Store.`,
      images: product.image ? [{ url: product.image }] : [],
    },
  };
}

export default async function ProductPage(props: ProductPageProps) {
  // 2. QUAN TRỌNG: Phải await params trước khi dùng
  const params = await props.params;
  const productID = params.productID;

  // 3. Lấy thông tin sản phẩm từ Database (Bao gồm danh mục & reviews)
  const product = await db.product.findUnique({
    where: { id: productID },
    include: {
      category: true,
      reviews: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) return notFound();

  // 4. Lấy sản phẩm liên quan
  const relatedProducts = await db.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 5,
  });

  return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Header />
        <main className="max-w-screen-2xl mx-auto px-4 py-8">
            <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                <Link href="/" className="hover:text-blue-600">Trang chủ</Link> 
                <span>/</span>
                <span className="text-gray-800 font-medium">{product.category?.name || "Sản phẩm"}</span>
                <span>/</span>
                <span className="truncate max-w-[200px]">{product.name}</span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8 border border-gray-100 h-[400px] md:h-[500px]">
                    {product.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                    ) : (
                        <div className="text-4xl font-bold text-gray-300">NO IMG</div>
                    )}
                </div>

                <div>
                    <div className="mb-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
                        {product.category?.name || "Chính hãng"}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {product.name}
                    </h1>
                    
                    <div className="flex items-end gap-4 mb-6 pb-6 border-b border-gray-100">
                        <span className="text-4xl font-bold text-red-600">
                            {new Intl.NumberFormat("vi-VN").format(product.price)}₫
                        </span>
                        <span className="text-gray-400 line-through text-lg mb-1">
                            {new Intl.NumberFormat("vi-VN").format(product.price * 1.2)}₫
                        </span>
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full mb-2">
                            -20%
                        </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description ||
                      "Sản phẩm chính hãng, thiết kế bền bỉ, an toàn, phù hợp cho mọi công trình dân dụng và công nghiệp."}
                    </p>

                    <div className={`flex items-center gap-2 font-medium mb-8 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                        <CheckCircle2 size={20} />
                        <span>
                          {product.stock > 0
                            ? `Còn hàng (${product.stock} sp) - Sẵn sàng giao ngay`
                            : "Hết hàng - Liên hệ để đặt trước"}
                        </span>
                    </div>

                    <ProductActions product={product} />

                    <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100">
                        <div className="text-center">
                            <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-2">
                                <ShieldCheck size={20} />
                            </div>
                            <p className="text-xs font-bold text-gray-700">Bảo hành 12 tháng</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center text-green-600 mx-auto mb-2">
                                <Truck size={20} />
                            </div>
                            <p className="text-xs font-bold text-gray-700">Giao nhanh 2h</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-orange-50 w-10 h-10 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-2">
                                <RefreshCw size={20} />
                            </div>
                            <p className="text-xs font-bold text-gray-700">Đổi trả 7 ngày</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* MÔ TẢ CHI TIẾT SẢN PHẨM & THÔNG SỐ KỸ THUẬT */}
            <ProductDetailTabs product={product} />

            {/* PHẦN ĐÁNH GIÁ SẢN PHẨM */}
            <ProductReviewSection productId={product.id} reviews={product.reviews} />

            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Sản phẩm liên quan</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {relatedProducts.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </div>
            )}
        </main>
        <Footer />
      </div>
  );
}