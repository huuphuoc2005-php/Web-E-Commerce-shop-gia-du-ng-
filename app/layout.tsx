import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AIChatAssistant from "@/app/components/AIChatAssistant";
import SocialProofPopup from "@/app/components/SocialProofPopup";
import QuickContactBar from "@/app/components/QuickContactBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phú Lâm Store - Thiết bị điện dân dụng & Smart Home chính hãng",
  description: "Cửa hàng điện nước Phú Lâm - Chuyên cung cấp công tắc, ổ cắm, bóng đèn LED, thiết bị điện thông minh Tuya/Sino chính hãng tại Hải Phòng và toàn quốc.",
  keywords: ["Phú Lâm Store", "Thiết bị điện", "Công tắc Sino", "Smart Home Tuya", "Điện dân dụng Hải Phòng", "Vật tư nước Tiền Phong"],
  openGraph: {
    title: "Phú Lâm Store - Thiết bị điện dân dụng & Smart Home chính hãng",
    description: "Cung cấp vật tư điện nước, công tắc, bóng đèn LED, thiết bị nhà thông minh uy tín hàng đầu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {children}
        <AIChatAssistant />
        <SocialProofPopup />
        <QuickContactBar />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}