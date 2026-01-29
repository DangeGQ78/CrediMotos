import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../assets/logo-Credimoto-removebg-preview.png";
import { formatCurrency } from "~/utils/formatos";

const styles = StyleSheet.create({
    page: {
        padding: 32,
        fontSize: 9,
        fontFamily: "Helvetica",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    logo: {
        width: 120,
        height: 40,
        objectFit: "contain",
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4F46E5", // primary-500
    },

    section: {
        marginBottom: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },

    field: {
        flexDirection: "column",
        marginBottom: 4,
    },

    label: {
        color: "#64748B", // slate-500
        fontSize: 8,
    },

    value: {
        fontSize: 10,
        fontWeight: "bold",
    },

    table: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 4,
        overflow: "hidden",
    },

    headerRow: {
        flexDirection: "row",
        backgroundColor: "#E8F1FF", // light primary
        borderBottomWidth: 1,
        borderColor: "#CBD5E1",
        paddingVertical: 4,
        paddingHorizontal: 4,
    },

    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        paddingVertical: 4,
        paddingHorizontal: 4,
    },

    rowOdd: {
        backgroundColor: "#F8FAFC", // filas alternas
    },

    cellSmall: { width: "6%", textAlign: "left" },
    cellDate: { width: "14%", textAlign: "left" },
    cell: { width: "16%", textAlign: "right" },

    headerText: {
        fontWeight: "bold",
    },

    totalsRow: {
        flexDirection: "row",
        backgroundColor: "#E0E7FF",
        paddingVertical: 4,
        paddingHorizontal: 4,
        fontWeight: "bold",
    },
});

interface DetalleItem {
    periodo: number;
    saldoInicial: number;
    cuota: number;
    interes: number;
    capital: number;
    saldoFinal: number;
}

interface Props {
    resultado: {
        detalle: DetalleItem[];
        fechas: string[];
    };
    montoInicial: number;
    interes: number;
    plazo: number;
}

export const CreditSchedulePDF = ({ resultado, montoInicial, interes, plazo }: Props) => {
    const today = new Date().toLocaleDateString("es-CO");

    const totalInteres = resultado.detalle.reduce((acc, i) => acc + Number(i.interes), 0);
    const totalCapital = resultado.detalle.reduce((acc, i) => acc + Number(i.capital), 0);
    const totalCuota = resultado.detalle.reduce((acc, i) => acc + Number(i.cuota), 0);

    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                {/* Header */}
                <View style={styles.header}>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.title}>Calendario de Pagos</Text>
                </View>

                {/* Datos del crédito */}
                <View style={styles.section}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Fecha de simulación</Text>
                        <Text style={styles.value}>{today}</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Monto inicial</Text>
                        <Text style={styles.value}>{formatCurrency(montoInicial)}</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Interés mensual</Text>
                        <Text style={styles.value}>{interes}%</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Plazo</Text>
                        <Text style={styles.value}>{plazo} meses</Text>
                    </View>
                </View>

                {/* Tabla */}
                <View style={styles.table} wrap>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Text style={[styles.cellSmall, styles.headerText]}>Mes</Text>
                        <Text style={[styles.cellDate, styles.headerText]}>Fecha de pago</Text>
                        <Text style={[styles.cell, styles.headerText]}>Saldo inicial</Text>
                        <Text style={[styles.cell, styles.headerText]}>Pago de Interés</Text>
                        <Text style={[styles.cell, styles.headerText]}>Pago de Capital</Text>
                        <Text style={[styles.cell, styles.headerText]}>Cuota Total</Text>
                        <Text style={[styles.cell, styles.headerText]}>Saldo pendiente</Text>
                    </View>

                    {/* Rows */}
                    {resultado.detalle.map((item, i) => (
                        <View key={i} style={[styles.row, i % 2 === 0 ? styles.rowOdd : {}]} wrap={false}>
                            <Text style={styles.cellSmall}>{item.periodo}</Text>
                            <Text style={styles.cellDate}>{resultado.fechas[i]}</Text>
                            <Text style={styles.cell}>{formatCurrency(item.saldoInicial)}</Text>
                            <Text style={styles.cell}>{formatCurrency(item.interes)}</Text>
                            <Text style={styles.cell}>{formatCurrency(item.capital)}</Text>
                            <Text style={styles.cell}>{formatCurrency(item.cuota)}</Text>
                            <Text style={styles.cell}>{formatCurrency(item.saldoFinal)}</Text>
                        </View>
                    ))}

                    {/* Totales */}
                    <View style={styles.totalsRow}>
                        <Text style={[styles.cellSmall]}></Text>
                        <Text style={[styles.cellDate, styles.headerText]}>Totales</Text>
                        <Text style={styles.cell}></Text>
                        <Text style={styles.cell}>{formatCurrency(totalInteres)}</Text>
                        <Text style={styles.cell}>{formatCurrency(totalCapital)}</Text>
                        <Text style={styles.cell}>{formatCurrency(totalCuota)}</Text>
                        <Text style={styles.cell}></Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
