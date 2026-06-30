import { create } from 'zustand';

interface ModalState {
  openModals: Set<string>;
  open: (id: string) => void;
  close: (id: string) => void;
  isOpen: (id: string) => boolean;
}

export const useModalStore = create<ModalState>((set, get) => ({
  openModals: new Set(),
  open: (id) =>
    set((s) => ({ openModals: new Set([...s.openModals, id]) })),
  close: (id) =>
    set((s) => {
      const next = new Set(s.openModals);
      next.delete(id);
      return { openModals: next };
    }),
  isOpen: (id) => get().openModals.has(id),
}));
