import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import { formatCurrency } from "~/utils/formatos";
import { useFinanciacionDetalle } from "~/hooks/useCredit";

type Props = {
    open: boolean;
    financiacionId?: string;
    onClose: () => void;
};

export function FinanciacionDetailDialog({
    open,
    financiacionId,
    onClose,
}: Props) {
    const { data, isLoading, error } =
        useFinanciacionDetalle(financiacionId);

    if (!open) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Detalle del crédito</DialogTitle>

            <DialogContent dividers className="space-y-4">
                {isLoading && <p>Cargando...</p>}
                {error && <p>Error al cargar</p>}

                {data && (
                    <>
                        {/* 📄 DATOS GENERALES */}
                        <section className="space-y-2">
                            <h3 className="font-semibold">Información general</h3>
                            <p><strong>Cliente:</strong> {data.cliente_cedula}</p>
                            <p><strong>Tipo:</strong> {data.tipo}</p>
                            <p><strong>Total financiado:</strong> {formatCurrency(data.total_financiado)}</p>
                            <p><strong>Cuota:</strong> {formatCurrency(data.cuota)}</p>
                            <p><strong>Plazo:</strong> {data.plazos_totales}</p>
                            <p><strong>Frecuencia:</strong> {data.frecuencia}</p>
                            <p><strong>Estado:</strong> {data.estado}</p>
                        </section>

                        {/* 💳 SOLO SI ES CRÉDITO */}
                        {data.tipo === "credito" && data.financiaciones_credito && (
                            <section className="space-y-2 border-t pt-3">
                                <h3 className="font-semibold">
                                    Información del crédito
                                </h3>

                                <p>
                                    <strong>Interés:</strong>{" "}
                                    {data.financiaciones_credito.porcentaje_interes}%
                                </p>
                            </section>
                        )}
                    </>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}
