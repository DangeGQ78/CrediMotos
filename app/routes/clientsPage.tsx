import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface Cliente {
    cedula: number;
    nombre: string;
    email: string;
    telefono?: string;
    direccion: string;
    ciudad: string;
}

export default function ClientsPage() {
    const [clientes, setClientes] = useState<Cliente[]>([
        { cedula: 1, nombre: "Juan Perez", email: "juan@email.com", telefono: "3001234567", direccion: "calle x # x-12", ciudad: "valledupar" },
        { cedula: 2, nombre: "Maria Gomez", email: "maria@email.com", telefono: "3001234567", direccion: "calle x # x-12", ciudad: "valledupar" },
    ]);

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newCliente, setNewCliente] = useState<Cliente>({ cedula: 0, ciudad: "", direccion: "", email: "", nombre: "", telefono: "" });

    const filteredClientes = clientes.filter(c =>
        c.nombre.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validaciones básicas
        if (!newCliente.cedula || !newCliente.nombre) return;

        setClientes(prev => [...prev, newCliente]);

        setNewCliente({
            cedula: 0,
            nombre: "",
            email: "",
            telefono: "",
            direccion: "",
            ciudad: "",
        });

        setShowForm(false);
    };

    const handleDeleteClient = (cedula: number) => {
        setClientes(clientes.filter(cliente => cliente.cedula !== cedula));
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <h1 className="text-2xl font-bold text-black">Clientes</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border-(--primary-300) border-2 rounded px-3 py-2placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-(--primary-500)"
                    />
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-(--primary-500) cursor-pointer text-(--neutral-50) px-4 py-2 rounded transition hover:bg-(--primary-600)"
                    >
                        Añadir Cliente
                    </button>
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead className="bg-(--primary-500)">
                        <tr>
                            <th className="px-4 py-2 text-left">Nombre</th>
                            <th className="px-4 py-2 text-left">cedula</th>
                            <th className="px-4 py-2 text-left">Teléfono</th>
                            <th className="px-4 py-2 text-left">Correo</th>
                            <th className="px-4 py-2 text-left">Direccion</th>
                            <th className="px-4 py-2 text-left">Ciudad</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClientes.map(c => (
                            <tr key={c.cedula} className="border-b hover:bg-(--primary-50)">
                                <td className="px-4 py-2 text-(--primary-800)">{c.nombre}</td>
                                <td className="px-4 py-2 text-(--primary-800)">{c.cedula || "-"}</td>
                                <td className="px-4 py-2 text-(--primary-800)">{c.telefono || "-"}</td>
                                <td className="px-4 py-2 text-(--primary-800)">{c.email}</td>
                                <td className="px-4 py-2 text-(--primary-800)">{c.direccion || "-"}</td>
                                <td className="px-4 py-2 text-(--primary-800)">{c.ciudad || "-"}</td>
                                <td className="px-4 py-2 flex gap-2 justify-center">
                                    <button className="text-blue-500 hover:underline cursor-pointer" >Editar</button>
                                    <button className="text-red-500 hover:underline cursor-pointer" onClick={() => handleDeleteClient(c.cedula)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal / Formulario */}
            {showForm && (
                <Dialog
                    open={showForm}
                    onClose={() => setShowForm(false)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Nuevo Cliente</DialogTitle>

                    {/* FORM */}
                    <Box component="form" onSubmit={handleSubmit}>
                        <DialogContent dividers >
                            <TextField
                                label="Cédula"
                                type="number"
                                fullWidth
                                margin="normal"
                                value={newCliente.cedula}
                                onChange={(e) =>
                                    setNewCliente({
                                        ...newCliente,
                                        cedula: Number(e.target.value)
                                    })
                                }
                            />

                            <TextField
                                label="Nombre"
                                fullWidth
                                margin="normal"
                                value={newCliente.nombre}
                                onChange={(e) =>
                                    setNewCliente({ ...newCliente, nombre: e.target.value })
                                }
                            />

                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                value={newCliente.email}
                                onChange={(e) =>
                                    setNewCliente({ ...newCliente, email: e.target.value })
                                }
                            />

                            <TextField
                                label="Teléfono"
                                type="tel"
                                fullWidth
                                margin="normal"
                                value={newCliente.telefono}
                                onChange={(e) =>
                                    setNewCliente({ ...newCliente, telefono: e.target.value })
                                }
                            />

                            <TextField
                                label="Dirección"
                                type=""
                                fullWidth
                                margin="normal"
                                value={newCliente.direccion}
                                onChange={(e) =>
                                    setNewCliente({ ...newCliente, direccion: e.target.value })
                                }
                            />

                            <TextField
                                label="Ciudad"
                                fullWidth
                                margin="normal"
                                value={newCliente.ciudad}
                                onChange={(e) =>
                                    setNewCliente({ ...newCliente, ciudad: e.target.value })
                                }
                            />

                            {/* ACCIONES */}
                            <DialogActions sx={{ px: 0, pt: 2 }}>
                                <Button variant="outlined" onClick={() => setShowForm(false)}>
                                    Cancelar
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Guardar
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    </Box>
                </Dialog>


            )}
        </div>
    );
}
