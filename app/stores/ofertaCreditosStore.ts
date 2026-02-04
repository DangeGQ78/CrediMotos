import { create } from "zustand";
import type { OfertaCreditoDTO } from "~/types/ofertaCredito";

interface OfertaCreditoState {
    oferta: OfertaCreditoDTO | null;

    // acciones
    setOferta: (oferta: OfertaCreditoDTO) => void;
    clearOferta: () => void;

    // helpers
    hasOferta: () => boolean;
}

export const useOfertaCreditoStore = create<OfertaCreditoState>((set, get) => ({
    oferta: null,

    setOferta: (oferta) => set({ oferta }),

    clearOferta: () => set({ oferta: null }),

    hasOferta: () => get().oferta !== null,
}));
