import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

// Tipe untuk item yang ada di dalam keranjang,
// merupakan gabungan dari Product dengan tambahan properti quantity.
export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  decreaseFromCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const { cart } = get();
        const existringProduct = cart.find((item) => item.id === product.id);

        if (existringProduct) {
          const updateCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
          set({ cart: updateCart });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      decreaseFromCart: (product) => {
        const { cart } = get();
        const existingProduct = cart.find((item) => item.id === product.id);

        if (!existingProduct) return;

        if (existingProduct.quantity === 1) {
          const updateCart = cart.filter((item) => item.id !== product.id);
          set({ cart: updateCart });
        } else {
          const updateCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
          set({ cart: updateCart });
        }
      },

      clearCart: () => set({ cart: [] }),

      removeFromCart(product) {
        const { cart } = get();
        const updateCart = cart.filter((item) => item.id !== product.id);
        set({ cart: updateCart });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
