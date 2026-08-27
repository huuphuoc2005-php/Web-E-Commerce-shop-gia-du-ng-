"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  Settings,
  Globe,
  Menu,
  X,
  Shield,
  ArrowLeft,
  Store,
} from "lucide-react";
import LogoutButton from "../components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const getPageTitle = () => {
    if (pathname === "/admin") return "Tổng quan hệ thống";
    if (pathname.startsWith("/admin/orders")) return "Quản lý đơn hàng";
    if (pathname.startsWith("/admin/products")) return "Quản lý sản phẩm";
    if (pathname.startsWith("/admin/categories")) return "Quản lý danh mục";
    if (pathname.startsWith("/admin/customers")) return "Quản lý khách hàng";
    if (pathname.startsWith("/admin/settings")) return "Cài đặt hệ thống";
    return "Trang quản trị";
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* MOBILE SIDEBAR BACKDROP */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* SIDEBAR NAVIGATION (DESKTOP & MOBILE SLIDE-OUT) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* LOGO BRANDING */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 border border-white/10">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                PHÚ LÂM <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">ADMIN</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium">Bảng Điều Hành Cửa Hàng</p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* NÚT VỀ TRANG CHỦ MUA HÀNG (STOREFRONT BUTTON IN SIDEBAR) */}
        <div className="px-4 pt-4 pb-2">
          <Link
            href="/"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-bold transition group shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <Globe size={15} className="text-blue-400 group-hover:rotate-12 transition" />
              Xem Trang Chủ Cửa Hàng
            </span>
            <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        {/* MENU ITEMS */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Quản lý chính
          </p>
          <MenuItem
            href="/admin"
            icon={<LayoutDashboard size={18} />}
            label="Tổng quan"
            active={pathname === "/admin"}
            onClick={() => setMobileOpen(false)}
          />
          <MenuItem
            href="/admin/orders"
            icon={<ShoppingBag size={18} />}
            label="Đơn hàng"
            active={pathname.startsWith("/admin/orders")}
            onClick={() => setMobileOpen(false)}
          />
          <MenuItem
            href="/admin/products"
            icon={<Package size={18} />}
            label="Sản phẩm"
            active={pathname.startsWith("/admin/products")}
            onClick={() => setMobileOpen(false)}
          />
          <MenuItem
            href="/admin/categories"
            icon={<Layers size={18} />}
            label="Danh mục"
            active={pathname.startsWith("/admin/categories")}
            onClick={() => setMobileOpen(false)}
          />
          <MenuItem
            href="/admin/customers"
            icon={<Users size={18} />}
            label="Khách hàng"
            active={pathname.startsWith("/admin/customers")}
            onClick={() => setMobileOpen(false)}
          />

          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Cấu hình
            </p>
            <MenuItem
              href="/admin/settings"
              icon={<Settings size={18} />}
              label="Cài đặt hệ thống"
              active={pathname.startsWith("/admin/settings")}
              onClick={() => setMobileOpen(false)}
            />
          </div>
        </nav>

        {/* USER PROFILE & LOGOUT FOOTER */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-inner shrink-0">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-200 truncate">Super Admin</p>
              <p className="text-[11px] text-slate-400 truncate">admin@phulam.com</p>
            </div>
          </div>
          <LogoutButton className="w-full flex items-center justify-center gap-2 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 py-2 rounded-xl text-xs font-semibold transition cursor-pointer" />
        </div>
      </aside>

      {/* RIGHT MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP HEADER BAR */}
        <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu size={20} />
            </button>

            <div>
              <h1 className="text-base md:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                {getPageTitle()}
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">Hệ thống điều hành Phú Lâm Store</p>
            </div>
          </div>

          {/* TOP RIGHT ACTIONS - PROMINENT RETURN TO STORE BUTTON */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2 cursor-pointer border border-blue-400/30 group"
            >
              <Store size={16} className="group-hover:scale-110 transition" />
              <span>Quay về Trang Chủ Cửa Hàng</span>
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-900/60">
          {children}
        </main>
      </div>
    </div>
  );
}

// MENU ITEM HELPER
type MenuItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
};

function MenuItem({ href, icon, label, active, onClick }: MenuItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 font-bold"
          : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}