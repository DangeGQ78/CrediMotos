import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState, useMemo } from "react";
import { CreditSchedulePDF } from "./generatePdf";
import { formatCurrency } from "~/utils/formatos";
import type { FrecuenciaPago } from "~/types/enums";
import { useOfertaCreditoStore } from "~/stores/ofertaCreditosStore";
import { Input, Result } from "./components/inputs";
export default function SimulatorPage() {
    const [monto, setMonto] = useState("0");
    const [plazo, setPlazo] = useState("12");
    const [interes, setInteres] = useState("0");
    const [frecuencia, setFrecuencia] = useState<FrecuenciaPago>("mensual");
    const [fechaInicio, setFechaInicio] = useState(
        new Date().toISOString().split("T")[0]
    );
    const { setOferta } = useOfertaCreditoStore();
    const roundToHundred = (value: number): number => {
        return Math.round(value / 100) * 100;
    };

    const resultado = useMemo(() => {
        const montoNum = Number(monto) || 0;
        const interesBase = Number(interes) / 100 || 0;
        const plazoNum = Number(plazo) || 0;

        if (montoNum <= 0 || interesBase <= 0 || plazoNum <= 0) {
            return {
                montoTotal: "0",
                cuota: "0",
                plazos: 0,
                fechas: [],
                detalle: [],
                error: null,
            };
        }

        // 🔁 Interés por periodo
        const interesPeriodo =
            frecuencia === "mensual"
                ? interesBase
                : interesBase; // semanal ya viene como semanal

        const cuotaBase =
            (montoNum * interesPeriodo) /
            (1 - Math.pow(1 + interesPeriodo, -plazoNum));

        const cuota = roundToHundred(cuotaBase);

        let saldo = montoNum;
        let totalIntereses = 0;

        const fechas: string[] = [];
        const detalle: any[] = [];

        for (let periodo = 1; periodo <= plazoNum; periodo++) {
            const interesPeriodo = saldo * interesBase;

            let capitalPagado = cuota - interesPeriodo;

            // 🛑 Última cuota: cerrar saldo exacto
            if (periodo === plazoNum) {
                capitalPagado = saldo;
            }

            const cuotaReal = capitalPagado + interesPeriodo;
            const saldoFinal = saldo - capitalPagado;

            totalIntereses += interesPeriodo;

            detalle.push({
                periodo,
                saldoInicial: roundToHundred(saldo),
                cuota: roundToHundred(cuotaReal),
                interes: roundToHundred(interesPeriodo),
                capital: roundToHundred(capitalPagado),
                saldoFinal: Math.max(0, roundToHundred(saldoFinal)),
            });

            saldo = saldoFinal;

            const f = new Date(fechaInicio);

            if (frecuencia === "mensual") {
                f.setMonth(f.getMonth() + periodo);
            } else {
                f.setDate(f.getDate() + periodo * 7);
            }

            fechas.push(f.toISOString().split("T")[0]);

        }

        return {
            montoTotal: roundToHundred(montoNum + totalIntereses),
            cuota: cuota,
            plazos: plazoNum,
            fechas,
            detalle,
            error: null,
        };
    }, [monto, interes, plazo, fechaInicio, frecuencia]);

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
                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Tipo de plazo
                            </label>
                            <select
                                value={frecuencia}
                                onChange={(e) => setFrecuencia(e.target.value as FrecuenciaPago)}
                                className="w-full mt-1 border rounded-lg px-3 py-2"
                            >
                                <option value="mensual">Mensual</option>
                                <option value="semanal">Semanal</option>
                            </select>
                        </div>

                        <Input
                            label={`Plazo (${frecuencia === "mensual" ? "meses" : "semanas"})`}
                            min={1}
                            max={frecuencia === "mensual" ? 60 : 260}
                            value={plazo}
                            onChange={(e) => setPlazo(e.target.value)}
                        />

                        <Input
                            label={`Interés ${frecuencia === "mensual" ? "mensual" : "semanal"} (%)`}
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
                            value={` ${formatCurrency(Number(resultado.montoTotal))}`}
                        />
                        <Result
                            label="Total de ganancias"
                            value={` ${(formatCurrency(Number(resultado.montoTotal) - Number(monto)))}`}
                        />
                        <Result
                            label={`Cuota ${frecuencia}`}
                            value={` ${formatCurrency(Number(resultado.cuota))}`}
                        />
                        <Result
                            label={`Total de ${frecuencia === "mensual" ? "meses" : "semanas"}`}
                            value={resultado.plazos.toString()}
                        />
                    </div>
                </div>
            </section>

            {/* Tabla */}
            <section className="bg-(--primary-100) rounded-xl shadow p-4">

                <div className="flex justify-between items-center">
                    <h1 className="p-4 font-bold text-xl"> Calendario de pagos </h1>
                    <button
                        className="bg-(--primary-500) cursor-pointer hover:bg-(--primary-400) text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                            setOferta({
                                monto: Number(monto),
                                cuota: Number(resultado.cuota),
                                plazo: Number(plazo),
                                interes: Number(interes),
                                frecuencia,
                                fecha_inicio: fechaInicio
                            });
                        }}
                    >
                        Guardar simulación
                    </button>

                    <PDFDownloadLink className="bg-(--primary-500) hover:bg-(--primary-400) transition px-4 py-2 rounded-lg text-(--neutral-50)"
                        key={JSON.stringify(resultado.detalle)}
                        document={
                            <CreditSchedulePDF
                                resultado={resultado}
                                montoInicial={+monto}
                                interes={+interes}
                                plazo={+plazo}
                            />
                        }
                        fileName="calendario-pagos-credimotos.pdf"
                    >
                        {({ loading }) =>
                            loading ? "Generando PDF..." : "Descargar PDF"
                        }
                    </PDFDownloadLink>
                </div>

                {/* CONTENEDOR de la tabla */}
                <div className="rounded-lg overflow-hidden border bg-white">
                    <table className="w-full text-sm">
                        {/* HEADER */}
                        <thead className="bg-(--primary-500) text-(--neutral-100)">
                            <tr>
                                <th className="p-3 text-left">
                                    {frecuencia === "mensual" ? "Mes" : "Semana"}
                                </th>
                                <th className="p-3 text-left">Fecha</th>
                                <th className="p-3 text-right">Saldo inicial</th>
                                <th className="p-3 text-right">Pago de Interés</th>
                                <th className="p-3 text-right">Pago de Capital</th>
                                <th className="p-3 text-right">Cuota</th>
                                <th className="p-3 text-right">Saldo pendiente</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                            {resultado.detalle.map((item, i) => (
                                <tr key={i} className={`${i % 2 === 0 ? "bg-(--primary-200)" : ""}`}>
                                    <td className="p-3">{item.periodo}</td>
                                    <td className="p-3">{resultado.fechas[i]}</td>
                                    <td className="p-3 text-right">{formatCurrency(item.saldoInicial)}</td>
                                    <td className="p-3 text-right">{formatCurrency(item.interes)}</td>
                                    <td className="p-3 text-right">{formatCurrency(item.capital)}</td>
                                    <td className="p-3 text-right">{formatCurrency(item.cuota)}</td>
                                    <td className="p-3 text-right">{formatCurrency(item.saldoFinal)}</td>
                                </tr>
                            ))}

                            {/* TOTALES */}
                            <tr className="border-t bg-slate-50 font-semibold">
                                <td colSpan={3} className="p-3 text-right">
                                    Totales
                                </td>
                                <td className="p-3 text-right">
                                    {formatCurrency(resultado.detalle.reduce((acc, i) => acc + Number(i.interes), 0))}
                                </td>
                                <td className="p-3 text-right">
                                    {formatCurrency(resultado.detalle.reduce((acc, i) => acc + Number(i.capital), 0))}
                                </td>
                                <td className="p-3 text-right">
                                    {formatCurrency(resultado.detalle.reduce((acc, i) => acc + Number(i.cuota), 0))}
                                </td>
                                <td className="p-3 text-right">$ 0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>


        </div>
    );
}





