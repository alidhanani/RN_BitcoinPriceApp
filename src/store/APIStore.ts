import { create } from "zustand";

interface APIStoreState {
  didRefresh: boolean;
  setDidRefresh: () => void;
}

const useAPIStore = create<APIStoreState>((set) => ({
  didRefresh: false,
  setDidRefresh: () => set((state) => ({ didRefresh: !state.didRefresh }))
}));

export default useAPIStore;
