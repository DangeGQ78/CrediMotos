import { useState } from "react";

type Credit = {
    id: number;
    cliente: string;
    monto: number;
    interes: number;
    plazo: number;
    cuota: number;
    fechaInicio: string;
    proximaFechaPago: string;
};

export default function CreditsPage() {
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
                        <tr>
                            <th className="p-3 bg-(--primary-500) text-(--neutral-50) text-left">Cliente</th>
                            <th className="p-3 bg-(--primary-500) text-(--neutral-50) text-left">Monto</th>
                            <th className="p-3 bg-(--primary-500) text-(--neutral-50) text-left">Cuota</th>
                            <th className="p-3 bg-(--primary-500) text-(--neutral-50) text-left">Próximo pago</th>
                            <th className="p-3 bg-(--primary-500) text-(--neutral-50) text-left">Acciones</th>
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

function calcularCredito(
    monto: number,
    interes: number,
    plazo: number,
    fechaInicio: string
) {
    const montoTotal = monto + monto * (interes / 100);
    const cuota = +(montoTotal / plazo).toFixed(2);

    const fechasPago = Array.from({ length: plazo }, (_, i) => {
        const fecha = new Date(fechaInicio);
        fecha.setMonth(fecha.getMonth() + i + 1);
        return fecha.toISOString().split("T")[0];
    });

    return { cuota, fechasPago };
}
