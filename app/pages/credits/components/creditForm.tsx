import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useOfertaCreditoStore } from "~/stores/ofertaCreditosStore";
import { formatCurrency } from "~/utils/formatos";
import { useCrearCredito } from "~/hooks/useCredit";
import { useClientes } from "~/hooks/useClient"; // 👈 asumo que ya lo tienes
import { useState } from "react";
import { useDebounce } from "use-debounce";


type Props = {
    open: boolean;
    onClose: () => void;
};

type CreditFormValues = {
    cliente_cedula: string;
};

export function CreditFormDialog({ open, onClose }: Props) {
    const { oferta, clearOferta } = useOfertaCreditoStore();
    const { mutate, isPending } = useCrearCredito();
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);
    const { data: clientes, isLoading, error } = useClientes(debouncedSearch);
    const { register, handleSubmit, reset, control } = useForm<CreditFormValues>();

    if (!oferta) return null;

    const onSubmit: SubmitHandler<CreditFormValues> = (data) => {
        mutate(
            {
                financiacion: {
                    cliente_cedula: data.cliente_cedula,
                    tipo: "credito",
                    total_financiado: oferta.monto,
                    cuota: oferta.cuota,
                    plazos_totales: oferta.plazo,
                    frecuencia: oferta.frecuencia,
                    fecha_inicio: oferta.fecha_inicio,
                },
                credito: {
                    porcentaje_interes: oferta.interes,
                },
            },
            {
                onSuccess: () => {
                    clearOferta();
                    reset();
                    onClose();
                },
            }
        );
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Formalizar crédito</DialogTitle>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers className="space-y-4">

                    {/* 📊 OFERTA (SOLO LECTURA) */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                        <p><strong>Monto:</strong> {formatCurrency(oferta.monto)}</p>
                        <p><strong>Cuota:</strong> {formatCurrency(oferta.cuota)}</p>
                        <p><strong>Plazo:</strong> {oferta.plazo}</p>
                        <p><strong>Frecuencia:</strong> {oferta.frecuencia}</p>
                        <p><strong>Interés:</strong> {oferta.interes}%</p>
                    </div>

                    {/* 👤 CLIENTE */}
                    <Controller
                        name="cliente_cedula"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Autocomplete
                                options={clientes ?? []}
                                loading={isLoading}
                                inputValue={search}                     // 👈 AQUÍ
                                onInputChange={(_, value) => {
                                    setSearch(value);                   // 👈 AQUÍ
                                }}
                                getOptionLabel={(option) =>
                                    `${option.nombre} — ${option.cedula}`
                                }
                                isOptionEqualToValue={(option, value) =>
                                    option.cedula === value.cedula
                                }
                                onChange={(_, value) => {
                                    field.onChange(value?.cedula ?? "");
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Buscar cliente"
                                        placeholder="Escribe nombre"
                                    />
                                )}
                            />
                        )}
                    />


                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isPending}
                    >
                        {isPending ? "Creando..." : "Formalizar"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
