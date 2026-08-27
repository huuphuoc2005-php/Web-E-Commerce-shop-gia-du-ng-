"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { updateProductAction } from "@/lib/actions";

const initialState = { success: false, message: "" };

type CategoryOption = { id: string; name: string };
type ProductDetail = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string | null;
  categoryId: string;
};

export default function EditProductForm({
  product,
  categories,
}: {
  product: ProductDetail;
  categories: CategoryOption[];
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(updateProductAction, initialState);
  const [imageUrl, setImageUrl] = useState(product.image || "");

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

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/products");
      router.refresh();
      return;
    }
    toast.error(state.message);
  }, [state, router]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cập nhật sản phẩm</h1>
          <p className="text-gray-500 text-sm">Chỉnh sửa thông tin và lưu thay đổi</p>
        </div>
      </div>

      <form action={formAction} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
        <input type="hidden" name="productId" value={product.id} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm</label>
          <input
            name="name"
            required
            defaultValue={product.name}
            className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
          <select
            name="categoryId"
            required
            defaultValue={product.categoryId}
            className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giá bán (VNĐ)</label>
            <input
              name="price"
              type="number"
              min={1}
              required
              defaultValue={product.price}
              className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng trong kho</label>
            <input
              name="stock"
              type="number"
              min={0}
              required
              defaultValue={product.stock}
              className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Hình ảnh sản phẩm</label>
            <label
              htmlFor="edit-product-image-file"
              className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              Tải ảnh từ máy tính
            </label>
            <input
              id="edit-product-image-file"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <input
            name="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Dán URL ảnh hoặc chọn nút 'Tải ảnh từ máy tính'..."
            className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
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
            defaultValue={product.description ?? ""}
            className="w-full text-black p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-70"
        >
          <Save size={20} />
          {isPending ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}
