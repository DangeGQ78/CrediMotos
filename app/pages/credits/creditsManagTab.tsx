import { useOfertaCreditoStore } from "~/stores/ofertaCreditosStore";
import { formatCurrency } from "~/utils/formatos";
import { useCrearCredito, useFinanciaciones } from "~/hooks/useCredit";

import { useState } from "react";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FinanciacionDetailDialog } from "./components/detailDialog";
import { CreditFormDialog } from "./components/creditForm";

export default function CreditsManagmentsPage() {
    const { oferta, clearOferta } = useOfertaCreditoStore();
    const { data: financiaciones = [], isLoading } = useFinanciaciones();
    const { mutate } = useCrearCredito()
    const [openForm, setOpenForm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedId, setSelectedId] = useState<string>("");


    if (isLoading) {
        return <p>Cargando créditos...</p>;
    }

    return (
        <div className="space-y-6">

            {/* 🔔 SIMULACIÓN ACTIVA */}

            {oferta && (
                <div className="bg-(--primary-100) border border-(--primary-300) rounded-xl p-4 flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-lg text-(--primary-800)">
                            Simulación lista para formalizar
                        </h2>
                        <p className="text-sm text-slate-700">
                            Monto: {formatCurrency(oferta.monto)} ·
                            Cuota: {formatCurrency(oferta.cuota)} ·
                            Plazo: {oferta.plazo} meses
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setOpenForm(true)}
                            className="
      px-4 py-2 rounded-lg
      cursor-pointer
      bg-(--primary-500)
      text-(--neutral-50)
      transition-all duration-200
      hover:bg-(--primary-600)
      active:bg-(--primary-700)
    "
                        >
                            {isLoading ? "Creando..." : "Formalizar crédito"}
                        </button>

                        <button
                            onClick={clearOferta}
                            className="
      px-4 py-2 rounded-lg
      cursor-pointer
      bg-(--primary-200)
      text-(--primary-800)
      border
      transition-all duration-200
      hover:bg-(--primary-300)
      active:bg-(--primary-400)
    "
                        >
                            Descartar
                        </button>
                    </div>

                    <CreditFormDialog
                        open={openForm}
                        onClose={() => setOpenForm(false)}
                    />
                </div>


            )}

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold">Créditos</h1>
                <p className="text-gray-600">Gestión de créditos</p>
            </div>

            {/* TABLA */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-sm">
                    <thead className="bg-(--primary-500) text-(--neutral-50)">
                        <tr>
                            <th className="p-3 text-left">Cliente</th>
                            <th className="p-3 text-left">Monto</th>
                            <th className="p-3 text-left">Cuota</th>
                            <th className="p-3 text-left">Fecha inicio</th>
                            <th className="p-3 text-left">Estado</th>
                            <th className="p-3 text-left">Acciones</th>
                            <th className="p-3 text-left">Detalle</th>
                        </tr>
                    </thead>

                    <tbody>
                        {financiaciones.map((f) => (
                            <tr key={f.id} className="border-t">
                                <td className="p-3 text-gray-600">
                                    {f.cliente_cedula}
                                </td>
                                <td className="p-3 text-gray-600">
                                    {formatCurrency(f.total_financiado)}
                                </td>
                                <td className="p-3 text-gray-600">
                                    {formatCurrency(f.cuota)}
                                </td>
                                <td className="p-3 text-gray-600">
                                    {f.fecha_inicio}
                                </td>
                                <td className="p-3 text-gray-600 capitalize">
                                    {f.estado}
                                </td>
                                <td className="p-3 space-x-2">
                                    <button className="text-blue-600">✏️</button>
                                    <button className="text-red-600">🗑</button>
                                </td>
                                <td className="p-3 space-x-2">
                                    <IconButton aria-label="Detalle"
                                        onClick={() => {
                                            setSelectedId(f.id);
                                            setOpenDetail(true);
                                        }}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </IconButton>


                                </td>

                            </tr>
                        ))}


                        {financiaciones.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-gray-500">
                                    No hay créditos registrados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <FinanciacionDetailDialog
                    open={openDetail}
                    financiacionId={selectedId}
                    onClose={() => setOpenDetail(false)}
                />
            </div>
        </div>
    );
}
