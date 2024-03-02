import { create } from "zustand";

interface APIStoreState {
  selectCurrency: string;
  setSelectCurrency: (currency: string) => void;
}

const useAPIStore = create<APIStoreState>((set) => ({
  selectCurrency: "USD",
  setSelectCurrency: (currency: string) =>
    set((state) => ({ selectCurrency: currency }))
}));

export default useAPIStore;
