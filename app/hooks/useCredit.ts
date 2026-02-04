import type { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "~/components/common/alert";
import { supabase } from "~/stores/supabase";
import type { CreateCreditoDTO, CreateCuotaDTO, CreateFinanciacionDTO, CreateFinanciacionElectroDTO, CreateFinanciacionMotoDTO, FinanciacionDTO } from "~/types/types";





export function useFinanciaciones(clienteCedula?: string) {
    return useQuery<FinanciacionDTO[], PostgrestError>({
        queryKey: ["financiaciones", clienteCedula],
        queryFn: async () => {
            let query = supabase
                .from("financiaciones")
                .select("*")
                .order("creado_en", { ascending: false });

            if (clienteCedula) {
                query = query.eq("cliente_cedula", clienteCedula);
            }

            const { data, error } = await query;
            if (error) throw error;

            return data ?? [];
        }
    });
}

export function useCrearCredito() {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (payload: {
            financiacion: CreateFinanciacionDTO;
            credito: CreateCreditoDTO;
        }) => {
            /* 1️⃣ Crear financiación */
            const { data: fin, error } = await supabase
                .from("financiaciones")
                .insert(payload.financiacion)
                .select()
                .single();

            if (error) throw error;

            /* 2️⃣ Crear crédito */
            const { error: credError } = await supabase
                .from("financiaciones_credito")
                .insert({
                    financiacion_id: fin.id,
                    porcentaje_interes: payload.credito.porcentaje_interes
                });

            if (credError) throw credError;

            return fin;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["financiaciones"] });
            queryClient.invalidateQueries({ queryKey: ["cuotas"] });
            showSnackbar("Crédito creado correctamente", "success");
        },
        onError: (error: PostgrestError) => {
            showSnackbar(error.message, "error");
        }
    });
}

export function usePagarCuota() {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (cuotaId: string) => {
            const { error } = await supabase
                .from("cuotas")
                .update({
                    estado: "pagada",
                    fecha_pago: new Date().toISOString()
                })
                .eq("id", cuotaId);

            if (error) throw error;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cuotas"] });
            queryClient.invalidateQueries({ queryKey: ["financiaciones"] });
            showSnackbar("Cuota pagada", "success");
        }
    });
}


export function useCrearMoto() {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (payload: {
            financiacion: CreateFinanciacionDTO;
            moto: CreateFinanciacionMotoDTO;
        }) => {
            /* 1️⃣ Crear financiación */
            const { data: fin, error } = await supabase
                .from("financiaciones")
                .insert({
                    ...payload.financiacion,
                    tipo: "moto"
                })
                .select()
                .single();

            if (error) throw error;

            /* 2️⃣ Crear moto */
            const { error: motoError } = await supabase
                .from("financiaciones_moto")
                .insert({
                    financiacion_id: fin.id,
                    valor_moto: payload.moto.valor_moto,
                    factor_pago: payload.moto.factor_pago ?? 2,
                    marca: payload.moto.marca,
                    modelo: payload.moto.modelo
                });

            if (motoError) throw motoError;

            return fin;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["financiaciones"] });
            queryClient.invalidateQueries({ queryKey: ["cuotas"] });
            showSnackbar("Financiación de moto creada correctamente", "success");
        },

        onError: (error: PostgrestError) => {
            showSnackbar(error.message, "error");
        }
    });
}


export function useCrearElectro() {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (payload: {
            financiacion: CreateFinanciacionDTO;
            electro: CreateFinanciacionElectroDTO;
        }) => {
            /* 1️⃣ Crear financiación */
            const { data: fin, error } = await supabase
                .from("financiaciones")
                .insert({
                    ...payload.financiacion,
                    tipo: "electrodomestico"
                })
                .select()
                .single();

            if (error) throw error;

            /* 2️⃣ Crear electro */
            const { error: electroError } = await supabase
                .from("financiaciones_electro")
                .insert({
                    financiacion_id: fin.id,
                    valor_producto: payload.electro.valor_producto,
                    porcentaje_markup: payload.electro.porcentaje_markup
                });

            if (electroError) throw electroError;

            return fin;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["financiaciones"] });
            queryClient.invalidateQueries({ queryKey: ["cuotas"] });
            showSnackbar("Financiación de electrodoméstico creada correctamente", "success");
        },

        onError: (error: PostgrestError) => {
            showSnackbar(error.message, "error");
        }
    });
}

export function useFinanciacionDetalle(id?: string) {
    return useQuery({
        queryKey: ["financiacion-detalle", id],
        enabled: !!id,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("financiaciones")
                .select(`
                    *,
                    financiaciones_credito (*)
                `)
                .eq("id", id!)
                .single();

            if (error) throw error;
            return data;
        },
    });
}

export function useCuotas(financiacionId?: string) {
    return useQuery({
        queryKey: ["cuotas", financiacionId],
        enabled: !!financiacionId,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("cuotas")
                .select("*")
                .eq("financiacion_id", financiacionId!)
                .order("numero_cuota");

            if (error) throw error;
            return data ?? [];
        },
    });
}

