import { create } from "zustand";

type OpenEditTransactionState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useOpenEditTransaction = create<OpenEditTransactionState>((set) =>({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false , id: undefined})
}));