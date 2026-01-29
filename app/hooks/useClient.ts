import { useQuery, useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { supabase } from "~/stores/supabase";
import type { Cliente } from "~/types/types";

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
/// ===================
/// READ - Obtener clientes
/// ===================
export function useClientes() {


    // usarla
    // 5 segundos

    return useQuery<Cliente[], Error>({
        queryKey: ["clientes"],
        queryFn: async () => {
            await sleep(5000);
            const { data, error } = await supabase.from("clientes").select("*");
            if (error) throw error;
            return data!;
        },
        staleTime: 1000 * 60, // 1 minuto
        refetchOnWindowFocus: false,
    });
}

/// ===================
/// CREATE - Crear cliente
/// ===================
export function useCrearCliente(): UseMutationResult<Cliente, Error, Cliente> {
    const queryClient = useQueryClient();

    return useMutation<Cliente, Error, Cliente>({
        mutationFn: async (nuevoCliente) => {
            const { data, error } = await supabase.from("clientes").insert(nuevoCliente).select().single();
            if (error) {
                console.log(error)
                throw error;
            }
            return data!;
        },
        onSuccess: (nuevoCliente) => {
            queryClient.setQueryData<Cliente[]>(["clientes"], (old) =>
                old ? [...old, nuevoCliente] : [nuevoCliente]
            );
        },
    });
}

/// ===================
/// UPDATE - Actualizar cliente
/// ===================
export function useActualizarCliente(): UseMutationResult<Cliente[], Error, Cliente> {
    const queryClient = useQueryClient();

    return useMutation<Cliente[], Error, Cliente>({
        mutationFn: async (cliente) => {
            const { data, error } = await supabase
                .from("clientes")
                .update(cliente)
                .eq("cedula", cliente.cedula);
            if (error) throw error;
            return data!;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientes"] });
        },
    });
}

/// ===================
/// DELETE - Eliminar cliente
/// ===================
export function useEliminarCliente(): UseMutationResult<Number, Error, number> {
    const queryClient = useQueryClient();

    return useMutation<Number, Error, number>({
        mutationFn: async (cedula) => {
            const { data, error } = await supabase
                .from("clientes")
                .delete()
                .eq("cedula", cedula);
            if (error) throw error;
            return data!;
        },
        onSuccess: (cedulaEliminada) => {
            queryClient.setQueryData<Cliente[]>(["clientes"], (old) =>
                old ? old.filter(c => Number(c.cedula) !== cedulaEliminada) : []);
        },
    });
}
