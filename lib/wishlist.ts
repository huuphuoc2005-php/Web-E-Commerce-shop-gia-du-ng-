import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: { name: string };
  stock: number;
}

interface WishlistStore {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => boolean;
  isInWishlist: (id: string) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (item) => {
        const current = get().wishlist;
        const exists = current.some((i) => i.id === item.id);
        if (exists) {
          set({ wishlist: current.filter((i) => i.id !== item.id) });
          return false;
        } else {
          set({ wishlist: [...current, item] });
          return true;
        }
      },
      isInWishlist: (id) => get().wishlist.some((i) => i.id === id),
    }),
    {
      name: "phulam-wishlist-storage",
    }
  )
);
