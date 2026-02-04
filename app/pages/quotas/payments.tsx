import {
    Autocomplete,
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useClientes } from "~/hooks/useClient";
import { useFinanciaciones, usePagarCuota } from "~/hooks/useCredit";
import { useCuotas } from "~/hooks/useCredit";
import { formatCurrency } from "~/utils/formatos";
import { usePaymentsStore } from "~/stores/paymentStore";

export default function PaymentsPage() {
    const { cliente, credito, setCliente, setCredito } = usePaymentsStore();

    const { mutate } = usePagarCuota()
    /* 🔍 búsqueda cliente */
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);
    const { data: clientes = [] } = useClientes(debouncedSearch);

    /* 💳 créditos activos del cliente */
    const { data: financiaciones = [] } = useFinanciaciones(cliente?.cedula);

    /* 📆 cuotas del crédito */
    const { data: cuotas = [] } = useCuotas(credito?.id);

    return (
        <Box className="space-y-6 ">

            {/* 👤 CLIENTE */}
            <Paper className="p-4">
                <Autocomplete
                    options={clientes}
                    inputValue={search}
                    onInputChange={(_, value) => setSearch(value)}
                    getOptionLabel={(c) => `${c.nombre} — ${c.cedula}`}
                    onChange={(_, value) => {
                        setCliente(value);
                        setCredito(null);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Buscar cliente" />
                    )}
                />
            </Paper>

            {/* 💳 CRÉDITOS */}
            {cliente && (
                <Paper className="p-4">
                    <h3 className="font-semibold mb-2">Créditos activos</h3>

                    {financiaciones.length > 0 ? <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Monto</TableCell>
                                <TableCell>Cuota</TableCell>
                                <TableCell>Plazos</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {financiaciones.map((f) => (
                                <TableRow
                                    key={f.id}
                                    hover
                                    selected={credito?.id === f.id}
                                    onClick={() => setCredito(f)}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <TableCell>
                                        {formatCurrency(f.total_financiado)}
                                    </TableCell>
                                    <TableCell>
                                        {formatCurrency(f.cuota)}
                                    </TableCell>
                                    <TableCell>{f.plazos_totales}</TableCell>
                                    <TableCell>{f.estado}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table> : <h1 className="text-center py-6 text-gray-500"> Este cliente no tiene financiaciones activas</h1>}
                </Paper>
            )}

            {/* 📆 CUOTAS */}
            {credito && (
                <Paper className="p-4">
                    <h3 className="font-semibold mb-2">
                        Cuotas del crédito
                    </h3>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Vencimiento</TableCell>
                                <TableCell>Monto</TableCell>
                                <TableCell >Estado</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {cuotas.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell>{c.numero_cuota}</TableCell>
                                    <TableCell>{c.fecha_vencimiento}</TableCell>
                                    <TableCell>
                                        {formatCurrency(c.monto)}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            onClick={() => {
                                                if (c.estado === "pendiente") {
                                                    mutate(c.id);
                                                }
                                            }}
                                            className={`
      inline-flex items-center
      px-3 py-1
      rounded-full
      text-xs font-semibold
      transition-all duration-200
      cursor-pointer
      select-none

      ${c.estado === "pagada"
                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                    : "bg-red-100 text-red-700 hover:bg-red-200"
                                                }
    `}
                                        >
                                            {c.estado}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Box>
    );
}
