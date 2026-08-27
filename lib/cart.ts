import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Định nghĩa kiểu dữ liệu cho 1 món hàng
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  quantity: number;
  selected?: boolean;
}

// Định nghĩa các hành động của Giỏ hàng
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; // <--- Dòng này giúp hết gạch đỏ
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      // Thêm hàng vào giỏ
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          // Nếu hàng đã có -> Chỉ tăng số lượng
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + data.quantity }
                : item
            ),
          });
        } else {
          // Nếu hàng chưa có -> Thêm mới vào
          set({ items: [...currentItems, data] });
        }
      },

      // Xóa hàng khỏi giỏ
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      // Cập nhật số lượng (Hàm mới thêm)
      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item
          ),
        });
      },

      // Xóa sạch giỏ
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // Tên key lưu trong LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);