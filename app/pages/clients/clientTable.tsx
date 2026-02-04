import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useClientes, useEliminarCliente } from "~/hooks/useClient";
import type { Cliente } from "~/types/types";

type Props = {
    clientes?: Cliente[];
    isLoading: boolean;
    error: unknown;
    onEdit: (cliente: Cliente) => void;
};


export default function ClientTable({ onEdit, isLoading, error, clientes }: Props) {

    const { mutate, isPending } = useEliminarCliente();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [clienteAEliminar, setClienteAEliminar] = useState<Cliente | null>(null);


    if (isLoading) {
        return <div className="p-6 text-center text-slate-500">Cargando clientes...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">Ocurrió un error al cargar los clientes</div>;
    }

    if (!clientes?.length) {
        return <div className="p-6 text-center text-slate-500">No hay clientes registrados</div>;
    }

    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm">
                <thead className="bg-(--primary-500) text-(--neutral-50)">
                    <tr>
                        {["Nombre", "Cédula", "Teléfono", "Correo", "Dirección", "Ciudad"].map(
                            (h) => (
                                <th key={h} className="px-4 py-3 text-left font-medium">
                                    {h}
                                </th>
                            )
                        )}
                        <th className="px-4 py-3 text-center font-medium">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {clientes.map((c) => (
                        <tr key={c.cedula} className="hover:bg-(--neutral-50)">
                            <td className="px-4 py-3 font-medium text-(--primary-700)">{c.nombre}</td>
                            <td className="px-4 py-3 text-(--primary-700)">{c.cedula}</td>
                            <td className="px-4 py-3 text-(--primary-700)">{c.telefono || "-"}</td>
                            <td className="px-4 py-3 text-(--primary-700)">{c.email}</td>
                            <td className="px-4 py-3 text-(--primary-700)">{c.direccion || "-"}</td>
                            <td className="px-4 py-3 text-(--primary-700)">{c.ciudad || "-"}</td>

                            <td className="px-4 py-3">
                                <div className="flex gap-3 justify-center">
                                    <button
                                        className="text-blue-600 hover:underline cursor-pointer hover:text-blue-800 font-medium"
                                        onClick={() => onEdit(c)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        disabled={isPending}
                                        className="text-red-600 hover:underline cursor-pointer hover:text-red-800 disabled:opacity-50"
                                        onClick={() => {
                                            setClienteAEliminar(c);
                                            setOpenConfirm(true);
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
            >
                <DialogTitle>Confirmar eliminación</DialogTitle>

                <DialogContent>
                    ¿Estás seguro de que deseas eliminar al cliente{" "}
                    <strong>{clienteAEliminar?.nombre}</strong>?
                    <br />
                    Esta acción no se puede deshacer.
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenConfirm(false)}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        disabled={isPending}
                        onClick={() => {
                            if (clienteAEliminar) {
                                mutate(Number(clienteAEliminar.cedula));
                            }
                            setOpenConfirm(false);
                            setClienteAEliminar(null);
                        }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
