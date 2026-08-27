import { getStoreSettings } from "@/lib/actions";
import StoreSettingForm from "@/app/admin/components/StoreSettingForm";

export default async function SettingsPage() {
  const settings = await getStoreSettings();

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Cài đặt Cửa hàng & Hệ thống</h1>
        <p className="text-gray-500 text-sm">Quản lý thông tin liên hệ, phí vận chuyển và thông báo chung</p>
      </div>

      <StoreSettingForm settings={settings} />
    </div>
  );
}
