import { useClientes, useEliminarCliente } from "~/hooks/useClient"

export default function ClientTable() {
    const { data: clientes, isLoading, error } = useClientes()
    const { mutate } = useEliminarCliente()

    const handleDeleteClient = (cedula: number) => {
        mutate(cedula);
    }

    if (isLoading)
        return (
            <div className="p-6 text-center text-slate-500">
                Cargando clientes...
            </div>
        );

    if (error)
        return (
            <div className="p-6 text-center text-red-500">
                Ocurrió un error al cargar los clientes
            </div>
        );

    if (clientes?.length === 0)
        return (
            <div className="p-6 text-center text-slate-500">
                No hay clientes registrados
            </div>
        );

    return (

        <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm">
                <thead className="bg-(--primary-500) text-(--neutral-50)">
                    <tr>
                        {[
                            "Nombre",
                            "Cédula",
                            "Teléfono",
                            "Correo",
                            "Dirección",
                            "Ciudad",
                            "Acciones",
                        ].map((h) => (
                            <th key={h} className="px-4 py-3 text-left font-medium">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {clientes?.map((c) => (
                        <tr
                            key={c.cedula}
                            className="hover:bg-(--neutral-50) transition-colors"
                        >
                            <td className="px-4 py-3 text-(--primary-700) font-medium">
                                {c.nombre}
                            </td>
                            <td className="px-4 py-3 text-(--primary-700)">{c.cedula}</td>
                            <td className="px-4 py-3 text-(--primary-700)">{c.telefono || "-"}</td>
                            <td className="px-4 py-3 text-(--primary-700)">{c.email}</td>
                            <td className="px-4 py-3 text-(--primary-700)">{c.direccion || "-"}</td>
                            <td className="px-4 py-3 text-(--primary-700)">{c.ciudad || "-"}</td>

                            <td className="px-4 py-3">
                                <div className="flex gap-3 justify-center">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
                                        Editar
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                                        onClick={() => handleDeleteClient(Number(c.cedula))}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}