import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Cliente } from "~/types/types";

type Props = {
    open: boolean;
    title: string;
    cliente?: Cliente | null;
    onClose: () => void;
    onCreate: SubmitHandler<Cliente>;
    onUpdate: SubmitHandler<Cliente>;
};



export function ClienteFormDialog({
    open,
    title,
    cliente,
    onClose,
    onCreate,
    onUpdate,
}: Props) {
    const {
        handleSubmit,
        register,
        reset,
    } = useForm<Cliente>({
        defaultValues: cliente ?? {
            cedula: "",
            nombre: "",
            email: "",
            telefono: "",
            direccion: "",
            ciudad: "",
        },
    });

    // 🔁 Cuando llega un cliente (editar)
    useEffect(() => {
        if (cliente) {
            reset(cliente);
        } else {
            reset({
                cedula: "",
                nombre: "",
                email: "",
                telefono: "",
                direccion: "",
                ciudad: "",
            });
        }
    }, [cliente, reset]);

    const submitHandler = (data: Cliente) => {
        if (cliente) {
            onUpdate(data); // ✏️ editar
        } else {
            onCreate(data); // ➕ crear
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>

            <Box component="form" onSubmit={handleSubmit(submitHandler)}>
                <DialogContent dividers>
                    <TextField
                        label="Cédula"
                        fullWidth
                        margin="normal"
                        {...register("cedula")}
                        disabled={!!cliente} // opcional
                    />

                    <TextField
                        label="Nombre"
                        fullWidth
                        margin="normal"
                        {...register("nombre")}
                    />

                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        {...register("email")}
                    />

                    <TextField
                        label="Teléfono"
                        fullWidth
                        margin="normal"
                        {...register("telefono")}
                    />

                    <TextField
                        label="Dirección"
                        fullWidth
                        margin="normal"
                        {...register("direccion")}
                    />

                    <TextField
                        label="Ciudad"
                        fullWidth
                        margin="normal"
                        {...register("ciudad")}
                    />
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained">
                        {cliente ? "Actualizar" : "Guardar"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
