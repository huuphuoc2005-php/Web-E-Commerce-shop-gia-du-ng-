"use client"; // Quan trọng: Dòng này biến nó thành Client Component

import { logoutSystem } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    // 1. Gọi hành động xóa cookie phía server
    await logoutSystem();
    
    // 2. Thông báo
    toast.success("Đã đăng xuất thành công");
    
    // 3. Chuyển hướng về trang đăng nhập
    router.push("/admin/login");
    router.refresh(); // Làm mới lại dữ liệu để đảm bảo sạch sẽ
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={
        className ||
        "w-full flex items-center justify-center gap-2 text-red-600 bg-red-50 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition cursor-pointer"
      }
    >
      <LogOut size={16} /> Đăng xuất
    </button>
  );
}