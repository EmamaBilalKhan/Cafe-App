import { create } from 'zustand'

export const useProductStore = create((set) => ({
  cart: [],
  Total: 0,
  Location: "Allama Iqbal Town Lahore, Pakistan",
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (itemToRemove) => set((state) => ({
    cart: state.cart.filter((item) => JSON.stringify(item) !== JSON.stringify(itemToRemove))
  })),
  setTotal:(total)=> set({Total: total}),
  setLocation:(Location)=> set({Location: Location}),
  emptyCart:()=>set({cart:[]})
}))

