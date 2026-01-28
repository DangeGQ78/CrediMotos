import { useState, useMemo } from "react";

export default function SimulatorPage() {
    const [monto, setMonto] = useState("0");
    const [plazo, setPlazo] = useState("12");
    const [interes, setInteres] = useState("0");
    const [fechaInicio, setFechaInicio] = useState(
        new Date().toISOString().split("T")[0]
    );

    const resultado = useMemo(() => {
        const montoNum = Number(monto) || 0;
        const interesDecimal = Number(interes) / 100 || 0;
        const plazoNum = Number(plazo) || 0;

        // 🛑 Validación
        if (montoNum <= 0 || interesDecimal <= 0 || plazoNum <= 0) {
            return {
                montoTotal: "0.00",
                cuota: "0.00",
                plazos: 0,
                fechas: [],
                detalle: [],
                error: null,
            };
        }

        // 📐 Cuota automática (sistema francés)
        const cuota =
            (montoNum * interesDecimal) /
            (1 - Math.pow(1 + interesDecimal, -plazoNum));

        let saldo = montoNum;
        let totalIntereses = 0;

        const fechas: string[] = [];
        const detalle: any[] = [];

        for (let periodo = 1; periodo <= plazoNum; periodo++) {
            const interesPeriodo = saldo * interesDecimal;
            let capitalPagado = cuota - interesPeriodo;
            totalIntereses += interesPeriodo;

            // 🔧 Ajuste último mes
            if (periodo === plazoNum) {
                capitalPagado = saldo;
            }

            const cuotaReal = capitalPagado + interesPeriodo;
            const saldoFinal = saldo - capitalPagado;

            detalle.push({
                periodo,
                saldoInicial: saldo.toFixed(2),
                cuota: cuotaReal.toFixed(2),
                interes: interesPeriodo.toFixed(2),
                capital: capitalPagado.toFixed(2),
                saldoFinal: Math.max(0, saldoFinal).toFixed(2),
            });

            saldo = saldoFinal;

            const f = new Date(fechaInicio);
            f.setMonth(f.getMonth() + periodo);
            fechas.push(f.toISOString().split("T")[0]);
        }

        return {
            montoTotal: (montoNum + totalIntereses).toFixed(2),
            cuota: cuota.toFixed(2),
            plazos: plazoNum,
            fechas,
            detalle,
            error: null,
        };
    }, [monto, interes, plazo, fechaInicio]);

    return (
        <div className="max-w-5xl mx-auto space-y-6 text-slate-900">
            {/* Header */}
            <section className="bg-(--primary-100) p-4 rounded-2xl">
                <div>
                    <h1 className="text-2xl font-bold">
                        Simulador de Créditos
                    </h1>
                    <p className="text-slate-700">
                        Sistema francés · cuota automática
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Formulario */}
                    <div className="bg-white p-6 rounded-xl shadow space-y-4">
                        <Input
                            label="Monto del crédito"
                            min={100000}
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                        />

                        <Input
                            label="Plazo (meses)"
                            min={1}
                            max={60}
                            value={plazo}
                            onChange={(e) => setPlazo(e.target.value)}
                        />

                        <Input
                            label="Interés mensual (%)"
                            value={interes}
                            onChange={(e) => setInteres(e.target.value)}
                        />

                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Fecha de inicio
                            </label>
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) =>
                                    setFechaInicio(e.target.value)
                                }
                                className="w-full mt-1 border rounded-lg px-3 py-2"
                            />
                        </div>
                    </div>


                    {/* Resultados */}
                    <div className="bg-slate-50 p-6 rounded-xl border space-y-4">
                        <Result
                            label="Monto total a pagar"
                            value={`$ ${resultado.montoTotal}`}
                        />
                        <Result
                            label="Cuota mensual"
                            value={`$ ${resultado.cuota}`}
                        />
                        <Result
                            label="Total de cuotas"
                            value={resultado.plazos.toString()}
                        />
                    </div>
                </div>
            </section>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow">
                <div className="p-4 font-semibold">
                    Calendario de pagos
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Fecha</th>
                            <th className="p-3 text-right">
                                Saldo inicial
                            </th>
                            <th className="p-3 text-right">Cuota</th>
                            <th className="p-3 text-right">Interés</th>
                            <th className="p-3 text-right">
                                Capital
                            </th>
                            <th className="p-3 text-right">
                                Saldo final
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultado.detalle.map((item, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-3">
                                    {item.periodo}
                                </td>
                                <td className="p-3">
                                    {resultado.fechas[i]}
                                </td>
                                <td className="p-3 text-right">
                                    $ {item.saldoInicial}
                                </td>
                                <td className="p-3 text-right">
                                    $ {item.cuota}
                                </td>
                                <td className="p-3 text-right">
                                    $ {item.interes}
                                </td>
                                <td className="p-3 text-right">
                                    $ {item.capital}
                                </td>
                                <td className="p-3 text-right">
                                    $ {item.saldoFinal}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ================= COMPONENTES ================= */

function Input({
    label,
    value,
    onChange,
    min,
    max,
}: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
}) {
    return (
        <div>
            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>
            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="w-full mt-1 border rounded-lg px-3 py-2"
            />
        </div>
    );
}

function Result({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-slate-700">{label}</span>
            <span className="font-bold text-lg">
                {value}
            </span>
        </div>
    );
}


