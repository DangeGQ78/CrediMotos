import { useState } from "react";
import type { Credit } from "~/types/types";

export default function CreditsManagmentsPage() {
    const [credits, setCredits] = useState<Credit[]>([
        {
            id: 1,
            cliente: "Juan Pérez",
            monto: 1000,
            interes: 10,
            plazo: 10,
            cuota: 110,
            fechaInicio: "2024-01-01",
            proximaFechaPago: "2024-02-01",
        },
        {
            id: 2,
            cliente: "dange galvis",
            monto: 1000,
            interes: 10,
            plazo: 10,
            cuota: 110,
            fechaInicio: "2024-01-01",
            proximaFechaPago: "2024-02-01",
        },
    ]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Créditos</h1>
                    <p className="text-gray-600">Gestión de créditos</p>
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr className="bg-(--primary-500) text-(--neutral-50)">
                            <th className="p-3 text-left">Cliente</th>
                            <th className="p-3 text-left">Monto</th>
                            <th className="p-3 text-left">Cuota</th>
                            <th className="p-3 text-left">Próximo pago</th>
                            <th className="p-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {credits
                            .sort(
                                (a, b) =>
                                    new Date(a.proximaFechaPago).getTime() -
                                    new Date(b.proximaFechaPago).getTime()
                            )
                            .map((credit) => (
                                <tr key={credit.id} className="border-t">
                                    <td className="p-3 text-gray-500">{credit.cliente}</td>
                                    <td className="p-3 text-gray-500">${credit.monto}</td>
                                    <td className="p-3 text-gray-500">${credit.cuota}</td>
                                    <td className="p-3 text-gray-500">{credit.proximaFechaPago}</td>
                                    <td className="p-3 text-gray-500 space-x-2">
                                        <button className="text-blue-600">✏️</button>
                                        <button className="text-red-600">🗑</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

