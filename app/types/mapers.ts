import type { SimulacionCreditoDTO } from "./ofertaCredito";
import type { CreateCreditoDTO, CreateFinanciacionDTO } from "./types";

function mapSimulacionToCreateFinanciacion(
    simulacion: SimulacionCreditoDTO,
    clienteCedula: string
): {
    financiacion: CreateFinanciacionDTO;
    credito: CreateCreditoDTO;
} {
    return {
        financiacion: {
            cliente_cedula: clienteCedula,
            tipo: "credito",
            total_financiado: simulacion.monto,
            cuota: simulacion.cuota,
            plazos_totales: simulacion.plazo,
            frecuencia: simulacion.frecuencia,
            fecha_inicio: simulacion.fechaInicio,
        },
        credito: {
            porcentaje_interes: simulacion.interes,
        },
    };
}
