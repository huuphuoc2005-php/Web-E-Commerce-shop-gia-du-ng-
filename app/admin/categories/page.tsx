import { db } from "@/lib/db";
import CategoryManager from "@/app/admin/components/CategoryManager";

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Danh mục sản phẩm</h1>
        <p className="text-gray-500 text-sm">Thêm, sửa, xóa các danh mục cho cửa hàng</p>
      </div>

      <CategoryManager categories={categories} />
    </div>
  );
}
