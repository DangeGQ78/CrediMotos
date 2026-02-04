// ~/stores/paymentsStore.ts
import { create } from "zustand";
import type { Cliente, FinanciacionDTO } from "~/types/types";

type PaymentsState = {
    cliente: Cliente | null;
    credito: FinanciacionDTO | null;
    setCliente: (cliente: Cliente | null) => void;
    setCredito: (credito: FinanciacionDTO | null) => void;
    clear: () => void;
};

export const usePaymentsStore = create<PaymentsState>((set) => ({
    cliente: null,
    credito: null,

    setCliente: (cliente) =>
        set({ cliente, credito: null }), // reset crédito si cambia cliente

    setCredito: (credito) => set({ credito }),

    clear: () => set({ cliente: null, credito: null }),
}));
