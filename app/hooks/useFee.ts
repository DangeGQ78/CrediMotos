import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/stores/supabase";
import type { CuotaDTO } from "~/types/types";


export function useCuotasVencidas(clienteCedula?: string) {
    return useQuery<CuotaDTO[], PostgrestError>({
        queryKey: ["cuotas", "vencidas", clienteCedula],
        queryFn: async () => {
            const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

            let query = supabase
                .from("cuotas")
                .select("*")
                .is("fecha_pago", null) // no pagadas
                .lt("fecha_vencimiento", today) // vencidas
                .order("fecha_vencimiento", { ascending: true });

            if (clienteCedula) {
                query = query.eq("cliente_cedula", clienteCedula);
            }

            const { data, error } = await query;
            if (error) throw error;

            return data ?? [];
        },
    });
}


export function useCuotasPorVencer(
    clienteCedula?: string,
    dias = 3
) {
    return useQuery<CuotaDTO[], PostgrestError>({
        queryKey: ["cuotas", "por-vencer", clienteCedula, dias],
        queryFn: async () => {
            const today = new Date();
            const from = today.toISOString().split("T")[0];

            const future = new Date();
            future.setDate(today.getDate() + dias);
            const to = future.toISOString().split("T")[0];

            let query = supabase
                .from("cuotas")
                .select("*")
                .is("fecha_pago", null) // no pagadas
                .gte("fecha_vencimiento", from) // desde hoy
                .lte("fecha_vencimiento", to)   // hasta X días
                .order("fecha_vencimiento", { ascending: true });

            if (clienteCedula) {
                query = query.eq("cliente_cedula", clienteCedula);
            }

            const { data, error } = await query;
            if (error) throw error;

            return data ?? [];
        },
    });
}