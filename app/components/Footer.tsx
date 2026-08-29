interface FooterProps {
  settings?: {
    storeName?: string;
    phone?: string;
    address?: string;
    email?: string;
  } | null;
}

export default function Footer({ settings }: FooterProps) {
  const storePhone = settings?.phone || "0869.001.296";
  const storeAddress = settings?.address || "Số 103, QL37, Thị trấn Vĩnh Bảo, Huyện Vĩnh Bảo, TP. Hải Phòng";
  const storeEmail = settings?.email || "phulamphuocphuong4@gmail.com";
  const storeName = settings?.storeName || "PHÚ LÂM STORE";

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 border-t-4 border-blue-600 font-sans text-sm">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* CHIA LƯỚI 4 CỘT ĐỂ DÀN NGANG */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* CỘT 1: THƯƠNG HIỆU */}
          <div className="flex flex-col gap-3">
            <div>
              {(() => {
                const nameParts = storeName.trim().split(" ");
                const lastPart = nameParts.length > 1 ? nameParts.pop() : "";
                const firstPart = nameParts.join(" ");
                return (
                  <h3 className="text-white text-xl font-bold tracking-tighter uppercase">
                    {firstPart} {lastPart ? <span className="text-orange-500">{lastPart}</span> : null}
                  </h3>
                );
              })()}
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                Thiết bị điện dân dụng chính hãng - Uy tín tạo niềm tin.
              </p>
            </div>
            
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 bg-white/10 hover:bg-blue-600 rounded flex items-center justify-center transition text-white">f</a>
              <a href="#" className="w-8 h-8 bg-white/10 hover:bg-red-600 rounded flex items-center justify-center transition text-white">G</a>
              <a href="#" className="w-8 h-8 bg-white/10 hover:bg-black rounded flex items-center justify-center transition text-white">X</a>
            </div>
          </div>

          {/* CỘT 2: LIÊN KẾT NHANH */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider border-b border-gray-700 pb-2 inline-block">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition">• Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">• Chính sách giao hàng</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">• Chính sách bảo hành</a></li>
              <li><a href="/tracking" className="hover:text-blue-400 transition">• Tra cứu đơn hàng</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">• Bảo mật thông tin</a></li>
            </ul>
          </div>

          {/* CỘT 3: LIÊN HỆ */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider border-b border-gray-700 pb-2 inline-block">
              Thông tin 
            </h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex gap-2 items-start">
                <span className="shrink-0">📍</span> 
                <span>{storeAddress}</span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="shrink-0">📞</span> 
                <span className="text-white text-sm">{storePhone}</span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="shrink-0">✉️</span> 
                <span>{storeEmail}</span>
              </li>
                <li className="flex gap-2 items-center">
                  <span className="shrink-0">⏰</span> 
                  <span>Open 7:00 - 20:00 (hàng ngày)</span>
                </li>
              </ul>
            </div>
  
            {/* CỘT 4: BẢN ĐỒ (ĐÃ SỬA LINK KHÔNG BAO GIỜ LỖI) */}
          <div className="flex flex-col h-full">
             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider border-b border-gray-700 pb-2 inline-block">
               Bản đồ chỉ đường
            </h4>
            <div className="rounded-lg overflow-hidden border border-gray-700 flex-1 min-h-[150px] relative bg-gray-800">
               {/* Cách nhúng bản đồ ổn định nhất: Dùng Google Maps Embed API dạng search */}
               <iframe 
                 src="https://maps.google.com/maps?q=Điện%20dân%20dụng%20Phú%20Lâm%2C%20103%20QL37%2C%20Tân%20Hưng%2C%20Vĩnh%20Bảo%2C%20Hải%20Phòng&t=&z=15&ie=UTF8&iwloc=&output=embed"
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                 loading="lazy" 
               ></iframe>
            </div>
             
             {/* Link mở ra tab mới dẫn thẳng đến Google Maps */}
            <a 
                href="https://www.google.com/maps/search/?api=1&query=Điện+dân+dụng+Phú+Lâm+103+QL37+Vĩnh+Bảo+Hải+Phòng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-blue-400 mt-2 hover:underline text-right block flex items-center justify-end gap-1"
            >
               Xem bản đồ lớn trên Google Maps ↗
            </a>
          </div>
          </div>
        </div>
        
        {/* Dòng bản quyền */}
        <div className="max-w-7xl mx-auto px-4 pt-6 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
          <p>© 2024 Phú Lâm Store. Bản quyền thuộc về Cửa hàng điện nước Phú Lâm.</p>
          <p>Designed by Pham Huu Phuoc</p>
        </div>
      </footer>
    );
  }