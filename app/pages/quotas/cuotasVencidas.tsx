import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { formatCurrency } from "~/utils/formatos";
import type { CuotaDTO } from "~/types/types";
import { useCuotasVencidas } from "~/hooks/useFee";




export default function CuotasVencidasTab() {
    const { data: Cuotas } = useCuotasVencidas()
    if (Cuotas?.length === 0) {
        return (
            <Paper className="p-6 text-center text-gray-500">
                🎉 No tienes cuotas vencidas
            </Paper>
        );
    }

    return (
        <Paper className="p-4">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Vencimiento</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="right">Acción</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Cuotas?.map((c) => (
                        <TableRow
                            key={c.id}
                            hover
                            className="cursor-pointer"
                        >
                            <TableCell>{c.numero_cuota}</TableCell>
                            <TableCell>{c.fecha_vencimiento}</TableCell>
                            <TableCell>{formatCurrency(c.monto)}</TableCell>
                            <TableCell>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                    Vencida
                                </span>
                            </TableCell>
                            <TableCell align="right">
                                <button className="text-red-600 font-semibold hover:underline">
                                    Pagar
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
