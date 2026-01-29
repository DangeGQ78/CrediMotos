import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { LineChart, BarChart, PieChart } from "@mui/x-charts";

export default function DashboardPage() {
    return (
        <Box sx={{ padding: 3 }}>
            {/* Header */}

            <Typography color="text.secondary" mb={3}>
                Bienvenido al panel de control
            </Typography>

            {/* Cards métricas */}
            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={4}>
                    <MetricCard title="Usuarios" value="1,245" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MetricCard title="Créditos Activos" value="320" />
                </Grid>
                <Grid item md={4}>
                    <MetricCard title="Ingresos" value="$12,500" />
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                {/* Line Chart */}
                <Grid item xs={12} md={6}>
                    <ChartCard title="Crecimiento Mensual">
                        <LineChart
                            xAxis={[{ data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"] }]}
                            series={[
                                {
                                    data: [400, 600, 800, 700, 1000, 1200],
                                    label: "Usuarios",
                                },
                            ]}
                            height={300}
                        />
                    </ChartCard>
                </Grid>

                {/* Bar Chart */}
                <Grid item xs={12} md={6}>
                    <ChartCard title="Créditos por Mes">
                        <BarChart
                            xAxis={[{ data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"] }]}
                            series={[
                                {
                                    data: [30, 45, 60, 50, 70, 90],
                                    label: "Créditos",
                                },
                            ]}
                            height={300}
                        />
                    </ChartCard>
                </Grid>

                {/* Pie Chart */}
                <Grid item xs={12}>
                    <ChartCard title="Tipos de Crédito">
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 40, label: "Motos" },
                                        { id: 1, value: 35, label: "Electrodomésticos" },
                                        { id: 2, value: 25, label: "Otros" },
                                    ],
                                },
                            ]}
                            height={300}
                        />
                    </ChartCard>
                </Grid>
            </Grid>
        </Box>
    );
}

/* =======================
   COMPONENTES REUTILIZABLES
======================= */

function MetricCard({ title, value }: { title: string; value: string }) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography color="text.secondary">{title}</Typography>
                <Typography variant="h5" fontWeight="bold">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}

function ChartCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography fontWeight="bold" mb={2}>
                    {title}
                </Typography>
                {children}
            </CardContent>
        </Card>
    );
}
