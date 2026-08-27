"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/actions";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";

type Category = {
  id: string;
  name: string;
};

type NewProductFormProps = {
  categories: Category[];
};

export default function NewProductForm({ categories }: NewProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Vui lòng chọn ảnh nhỏ hơn 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          setImageUrl(base64Url);
          toast.success("Đã tải ảnh lên thành công!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await createProduct(formData);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Đã thêm sản phẩm thành công!");
      router.push("/admin/products");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 hover:bg-black-100 rounded-full transition">
          <ArrowLeft size={20} className="text-black-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Thêm sản phẩm mới</h1>
          <p className="text-gray-500 text-sm">Điền thông tin chi tiết về món hàng</p>
        </div>
      </div>

      <form action={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
          <select
            name="categoryId"
            required
            defaultValue={categories[0]?.id}
            className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {categories.length === 0 ? (
              <option value="">Chưa có danh mục</option>
            ) : (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm</label>
          <input
            name="name"
            required
            placeholder="Ví dụ: Bóng đèn Rạng Đông 20W"
            className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giá bán (VNĐ)</label>
            <input
              name="price"
              type="number"
              required
              placeholder="0"
              className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng trong kho</label>
            <input
              name="stock"
              type="number"
              required
              defaultValue="100"
              className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Hình ảnh sản phẩm</label>
            <label
              htmlFor="product-image-file"
              className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              Tải ảnh từ máy tính
            </label>
            <input
              id="product-image-file"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              name="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Dán URL ảnh hoặc chọn nút 'Tải ảnh từ máy tính'..."
              className="w-full text-black pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
          {imageUrl && (
            <div className="mt-3 w-24 h-24 rounded-xl overflow-hidden border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả sản phẩm</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Thông số kỹ thuật, bảo hành..."
            className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || categories.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          Lưu sản phẩm
        </button>
      </form>
    </div>
  );
}
