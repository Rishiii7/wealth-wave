import { create } from "zustand";

type OpenEditAccountState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
}
type OpenNewAccountState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useOpenEditAccount = create<OpenEditAccountState>((set) =>({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false , id: undefined})
}));


export const useOpenNewAccountButton = create<OpenNewAccountState>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({ isOpen: false})
}));