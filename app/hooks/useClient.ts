import { useQuery, useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { supabase } from "~/stores/supabase";
import type { Cliente } from "~/types/types";
import { useSnackbar } from "~/components/common/alert";
import type { PostgrestError } from "@supabase/supabase-js";




/// ===================
/// READ - Obtener clientes
/// ===================
export function useClientes(search: string = "") {

    return useQuery<Cliente[], PostgrestError>({
        queryKey: ["clientes", search],
        queryFn: async () => {
            let query = supabase.from("clientes").select("*");

            if (search.trim()) {
                query = query.or(
                    `nombre.ilike.%${search}%`
                );
            }


            const { data, error } = await query;

            if (error) {
                console.log(error)
                throw error;
            }
            return data ?? [];
        },

        enabled: search.length === 0 || search.length >= 2,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });
}


/// ===================
/// CREATE - Crear cliente
/// ===================
export function useCrearCliente() {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar()
    return useMutation({
        mutationFn: async (nuevoCliente: Cliente) => {
            const { data, error } = await supabase.from("clientes").insert(nuevoCliente).select().single();
            if (error) throw error;
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientes"] });

            showSnackbar("Usuario creado correctamente", "success");
        },
        onError: (error: PostgrestError) => {
            if (error.message.includes("duplicate"))
                showSnackbar("El usuario ya existe", "error");
        }
    });
}

/// ===================
/// UPDATE - Actualizar cliente
/// ===================
export function useActualizarCliente() {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar()
    return useMutation({
        mutationFn: async (cliente: Cliente) => {
            const { data, error } = await supabase
                .from("clientes")
                .update(cliente)
                .eq("cedula", cliente.cedula);
            if (error) throw error;
            return data!;
        },
        onSuccess: (_data, cliente) => {
            queryClient.setQueryData<Cliente[]>(["clientes"], (old = []) =>
                old.map((c) =>
                    c.cedula === cliente.cedula ? cliente : c
                )
            );
            showSnackbar("Cliente actualizado correctamente", "success");

        },
        onError: (error: PostgrestError) => {
            showSnackbar(error.message, "error");
        }
    });
}

/// ===================
/// DELETE - Eliminar cliente
/// ===================
export function useEliminarCliente() {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar()
    return useMutation({
        mutationFn: async (cedula: Number) => {
            const { data, error } = await supabase
                .from("clientes")
                .delete()
                .eq("cedula", cedula);
            if (error) throw error;
            return data!;
        },
        onSuccess: (_data, cedulaEliminada) => {
            showSnackbar("Usuario eliminado", "error");
            queryClient.setQueryData<Cliente[]>(["clientes"], (old) =>
                old ? old.filter(c => Number(c.cedula) !== cedulaEliminada) : []);

        },
        onError: (error: PostgrestError) => {
            showSnackbar(error.message, "error");
        }
    });

}

export function useClientesFilter(search: string) {
    return useQuery<Cliente[], PostgrestError>({
        queryKey: ["clientes", search],
        queryFn: async () => {
            let query = supabase.from("clientes").select("*");

            if (search.trim()) {
                query = query.or(
                    `nombre.ilike.%${search}%,
                     cedula.ilike.%${search}%,
                     email.ilike.%${search}%,
                     telefono.ilike.%${search}%`
                );
            }

            const { data, error } = await query;

            if (error) throw error;
            return data ?? [];
        },

        enabled: search.length === 0 || search.length >= 2,
    });
}
