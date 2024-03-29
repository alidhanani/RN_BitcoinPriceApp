import { create } from "zustand";

interface LangStoreState {
  language: string;
  setLanguage: (lang: string) => void;
}

const useLangStore = create<LangStoreState>((set) => ({
  language: "en",
  setLanguage: (lang: string) => set(() => ({ language: lang }))
}));

export default useLangStore;
