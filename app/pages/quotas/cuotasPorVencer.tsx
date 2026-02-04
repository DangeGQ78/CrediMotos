import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { formatCurrency } from "~/utils/formatos";
import type { CuotaDTO } from "~/types/types";
import { useCuotasPorVencer } from "~/hooks/useFee";



export default function CuotasPorVencerTab() {
    const { data: cuotasPorVencer } = useCuotasPorVencer()
    if (cuotasPorVencer?.length === 0) {
        return (
            <Paper className="p-6 text-center text-gray-500">
                ✔️ No hay cuotas próximas a vencer
            </Paper>
        );
    }

    return (
        <Paper className="p-4">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Vence</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="right">Acción</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {cuotasPorVencer?.map((c) => (
                        <TableRow
                            key={c.id}
                            hover
                            className="cursor-pointer"
                        >
                            <TableCell>{c.numero_cuota}</TableCell>
                            <TableCell>{c.fecha_vencimiento}</TableCell>
                            <TableCell>{formatCurrency(c.monto)}</TableCell>
                            <TableCell>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                    Por vencer
                                </span>
                            </TableCell>
                            <TableCell align="right">
                                <button className="text-yellow-700 font-semibold hover:underline">
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
