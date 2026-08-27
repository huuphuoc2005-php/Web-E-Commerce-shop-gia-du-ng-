import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Search, Filter } from "lucide-react";
import DeleteProductButton from "../components/DeleteProductButton";

type ProductsPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = searchParams ? await searchParams : {};
  const query = (params.q ?? "").trim();

  const products = await db.product.findMany({
    where: query
      ? {
          name: {
            contains: query,
          },
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const formatPrice = (value: number) => new Intl.NumberFormat("vi-VN").format(value);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">Danh sách sản phẩm</h1>
          <p className="text-gray-500 text-sm">Quản lý kho hàng và giá bán tại đây</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <Plus size={18} /> Thêm sản phẩm mới
        </Link>
      </div>

      <form className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            name="q"
            defaultValue={query}
            placeholder="Tìm tên sản phẩm, mã SKU..."
            className="w-full text-black pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 font-medium"
        >
          <Filter size={18} /> Tìm kiếm
        </button>
      </form>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>Chưa có sản phẩm nào. Hãy thêm mới ngay!</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Danh mục</th>
                <th className="px-6 py-4">Giá bán</th>
                <th className="px-6 py-4">Kho hàng</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg border border-gray-200 bg-white p-1 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image || "/images/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="font-medium text-gray-800 group-hover:text-blue-600 transition">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                      {product.category?.name || "Chưa phân loại"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">{formatPrice(product.price)}₫</td>
                  <td className="px-6 py-4">
                    {product.stock > 0 ? (
                      <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                        ● Còn {product.stock} cái
                      </span>
                    ) : (
                      <span className="text-red-500 text-sm font-medium bg-red-50 px-2 py-1 rounded">
                        Hết hàng
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Sửa"
                      >
                        <Edit size={18} />
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}