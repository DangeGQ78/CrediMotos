import { useDeferredValue, useState } from "react";
import { useActualizarCliente, useClientes, useCrearCliente } from "~/hooks/useClient";
import type { Cliente } from "~/types/types";
import ClientTable from "./clientTable";
import { ClienteFormDialog } from "./clientForm";
import { useDebounce } from "use-debounce"

export default function ClientsPage() {
    const createClient = useCrearCliente();
    const updateClient = useActualizarCliente();
    const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);
    const { data: clientes, isLoading, error } = useClientes(debouncedSearch);
    const handleOpenCreate = () => {
        setEditingCliente(null); // 👈 crear
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingCliente(null);
    };

    const handleCreate = (data: Cliente) => {
        createClient.mutate(data, {
            onSuccess: () => {
                handleCloseForm();
            },
        });
    };

    const handleUpdate = (data: Cliente) => {
        updateClient.mutate(data, {
            onSuccess: () => {
                handleCloseForm();
            },
        });
    };


    return (
        <div className="p-6 min-h-dvh">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <h1 className="text-2xl font-bold text-black">Clientes</h1>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-2 rounded px-3 py-2 text-black"
                    />

                    <button
                        onClick={handleOpenCreate}
                        className="bg-(--primary-500) cursor-pointer text-white px-4 py-2 rounded"
                    >
                        Añadir Cliente
                    </button>
                </div>
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-xl shadow-sm border">
                <ClientTable
                    clientes={clientes}
                    error={error}
                    isLoading={isLoading}
                    onEdit={(cliente) => {
                        setEditingCliente(cliente);
                        setOpenForm(true);
                    }}
                />
            </div>

            {/* MODAL */}
            <ClienteFormDialog
                open={openForm}
                title={editingCliente ? "Editar Cliente" : "Nuevo Cliente"}
                cliente={editingCliente}
                onClose={handleCloseForm}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
            />
        </div>
    );
}
