import type { EstadoCuota, EstadoFinanciacion, FrecuenciaPago, TipoFinanciacion } from "./enums";

export interface Financiacion {
    id: string;

    cliente_cedula: string;
    tipo: TipoFinanciacion;

    total_financiado: number;
    cuota: number;

    plazos_totales: number;
    frecuencia: FrecuenciaPago;

    fecha_inicio: string;
    fecha_fin?: string | null;

    estado: EstadoFinanciacion;
    creado_en?: string;
}

export interface FinanciacionCredito {
    financiacion_id: string;
    porcentaje_interes: number;
}


export interface FinanciacionMoto {
    financiacion_id: string;

    valor_moto: number;
    factor_pago: number;
    marca?: string | null;
    modelo?: string | null;
}

export interface FinanciacionElectro {
    financiacion_id: string;
    valor_producto: number;
    porcentaje_markup: number;
}

export interface Cuota {
    id: string;

    financiacion_id: string;
    numero_cuota: number;

    fecha_vencimiento: string;
    monto: number;

    estado: EstadoCuota;
    fecha_pago?: string | null;

    creado_en?: string;
}


export interface Cliente {
    cedula: string;
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;
}



/* ======================
   FINANCIACIÓN (BASE)
====================== */

export interface FinanciacionDTO {
    id: string;
    cliente_cedula: string;
    tipo: TipoFinanciacion;

    total_financiado: number;
    cuota: number;

    plazos_totales: number;
    frecuencia: FrecuenciaPago;

    fecha_inicio: string;
    fecha_fin: string | null;

    estado: EstadoFinanciacion;
    creado_en: string;
}

export interface CreateFinanciacionDTO {
    cliente_cedula: string;
    tipo: TipoFinanciacion;

    total_financiado: number;
    cuota: number;

    plazos_totales: number;
    frecuencia: FrecuenciaPago;

    fecha_inicio: string;
}

/* ======================
   CRÉDITO
====================== */

export interface CreateCreditoDTO {
    porcentaje_interes: number;
}

/* ======================
   CUOTAS
====================== */

export interface CuotaDTO {
    id: string;
    financiacion_id: string;
    numero_cuota: number;
    fecha_vencimiento: string;
    monto: number;
    estado: EstadoCuota;
    fecha_pago: string | null;
    creado_en: string;
}

export interface CreateCuotaDTO {
    financiacion_id: string;
    numero_cuota: number;
    fecha_vencimiento: string;
    monto: number;
}


export interface CreateFinanciacionMotoDTO {
    valor_moto: number;
    factor_pago?: number;
    marca?: string;
    modelo?: string;
}


export interface CreateFinanciacionElectroDTO {
    valor_producto: number;
    porcentaje_markup: number;
}

export interface CreditoListadoView {
    id: string;

    cliente_cedula: string;
    cliente_nombre: string;

    total_financiado: number;
    cuota: number;
    plazos_totales: number;

    proxima_fecha_pago: string | null;

    estado: EstadoFinanciacion;
}
