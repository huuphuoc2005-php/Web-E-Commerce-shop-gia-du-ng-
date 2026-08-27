import { getAllCustomers } from "@/lib/actions";
import CustomerTable from "@/app/admin/components/CustomerTable";

export default async function CustomersPage() {
  const customers = await getAllCustomers();

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Khách hàng</h1>
        <p className="text-gray-500 text-sm">Danh sách tất cả người dùng đã đăng ký trên hệ thống</p>
      </div>

      <CustomerTable customers={customers} />
    </div>
  );
}
