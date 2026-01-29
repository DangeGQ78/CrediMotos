export interface Credit {
    id: number;
    cliente: string;
    monto: number;
    interes: number;
    plazo: number;
    cuota: number;
    fechaInicio: string;
    proximaFechaPago: string;
};

export interface Cliente {
    cedula: string;
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;
}