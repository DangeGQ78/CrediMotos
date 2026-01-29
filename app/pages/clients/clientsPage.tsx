import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import { use, useEffect, useState } from "react";
import { useClientes, useCrearCliente, useEliminarCliente } from "~/hooks/useClient";
import type { Cliente } from "~/types/types";
import ClientTable from "./clientTabe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function ClientsPage() {
    const { mutate, error, isError, reset } = useCrearCliente()
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [newCliente, setNewCliente] = useState<Cliente>({ cedula: "", ciudad: "", direccion: "", email: "", nombre: "", telefono: "" });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isError) {
            setOpen(true)
        }
    }, [isError])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(newCliente);
        setNewCliente({ cedula: "", ciudad: "", direccion: "", email: "", nombre: "", telefono: "" });
        setShowForm(false);
    };


    return (
        <div className="p-6">
            {isError && (
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={3000} onClose={() => {
                    setOpen(false);
                    reset(); // 👈 MUY IMPORTANTE
                }}>
                    <Alert
                        severity="error"
                        icon={<FontAwesomeIcon icon="circle-exclamation" />}
                    >
                        {error?.message.includes("duplicate key")
                            ? "Ya existe un cliente con esa cédula"
                            : "Ocurrió un error al guardar el cliente"}
                    </Alert>
                </Snackbar>

            )}
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
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <ClientTable />
            </div>


            {/* Modal / Formulario */}
            {showFormEdit && (
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
                                fullWidth
                                margin="normal"
                                value={newCliente.cedula}
                                onChange={(e) =>
                                    setNewCliente({
                                        ...newCliente,
                                        cedula: e.target.value
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
                                fullWidth
                                margin="normal"
                                value={newCliente.cedula}
                                onChange={(e) =>
                                    setNewCliente({
                                        ...newCliente,
                                        cedula: e.target.value
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
