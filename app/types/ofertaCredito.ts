export type FrecuenciaPago = "mensual" | "semanal";

export interface SimulacionCreditoDTO {
    monto: number;
    plazo: number;
    interes: number; // %
    cuota: number;
    montoTotal: number;
    fechaInicio: string;
    frecuencia: FrecuenciaPago;
    sistema: "frances";
}


export interface OfertaCreditoDTO {
    monto: number;
    cuota: number;
    plazo: number;
    interes: number;
    frecuencia: FrecuenciaPago;
    fecha_inicio: string;
}
