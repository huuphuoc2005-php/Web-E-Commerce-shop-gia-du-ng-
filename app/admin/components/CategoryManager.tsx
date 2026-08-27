"use client";

import { useState } from "react";
import { createCategory, updateCategory, deleteCategory } from "@/lib/actions";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, FolderPlus, Layers } from "lucide-react";

interface CategoryWithCount {
  id: string;
  name: string;
  _count: { products: number };
}

interface CategoryManagerProps {
  categories: CategoryWithCount[];
}

export default function CategoryManager({ categories }: CategoryManagerProps) {
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryWithCount | null>(null);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await createCategory(formData);
      if (res.success) {
        toast.success(res.message);
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Lỗi tạo danh mục");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCategory) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("id", editingCategory.id);

    try {
      const res = await updateCategory(formData);
      if (res.success) {
        toast.success(res.message);
        setEditingCategory(null);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Lỗi cập nhật danh mục");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`)) return;

    const formData = new FormData();
    formData.append("id", id);
    try {
      const res = await deleteCategory(formData);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Lỗi xóa danh mục");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* FORM THÊM / SỬA DANH MỤC */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
          <FolderPlus className="text-blue-600" size={20} />
          {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        </h2>

        {editingCategory ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tên danh mục</label>
              <input
                name="name"
                defaultValue={editingCategory.name}
                required
                className="w-full text-black px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-bold text-xs hover:bg-blue-700 transition"
              >
                Lưu thay đổi
              </button>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="px-4 bg-gray-100 text-gray-600 py-2 rounded-xl text-xs font-bold hover:bg-gray-200"
              >
                Hủy
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tên danh mục</label>
              <input
                name="name"
                required
                placeholder="Ví dụ: Đèn trang trí..."
                className="w-full text-black px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-blue-700 transition flex items-center justify-center gap-1.5"
            >
              <Plus size={16} /> {loading ? "Đang xử lý..." : "Thêm danh mục"}
            </button>
          </form>
        )}
      </div>

      {/* DANH SÁCH DANH MỤC */}
      <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <span className="font-bold text-gray-700 text-sm flex items-center gap-2">
            <Layers size={18} className="text-blue-600" /> Danh sách danh mục ({categories.length})
          </span>
        </div>

        {categories.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">Chưa có danh mục nào.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-gray-50/60 transition">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{cat.name}</h3>
                  <span className="text-xs text-gray-400 font-medium">
                    {cat._count.products} sản phẩm thuộc danh mục này
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingCategory(cat)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Chỉnh sửa"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
