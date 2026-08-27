"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProductAction } from "@/lib/actions";

const initialState = { success: false, message: "" };

export default function DeleteProductButton({ productId, productName }: { productId: string; productName: string }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(deleteProductAction, initialState);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      router.refresh();
      return;
    }
    toast.error(state.message);
  }, [state, router]);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        const ok = window.confirm(`Bạn có chắc muốn xóa sản phẩm "${productName}"?`);
        if (!ok) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="productId" value={productId} />
      <button
        type="submit"
        disabled={isPending}
        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-60"
        title="Xóa"
      >
        <Trash2 size={18} />
      </button>
    </form>
  );
}
