import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PaymentsPage from "./payments";
import CuotasVencidasTab from "./cuotasVencidas";
import CuotasPorVencerTab from "./cuotasPorVencer";
import { useCuotasPorVencer, useCuotasVencidas } from "~/hooks/useFee";


export default function CuotasOverview() {
    const [tab, setTab] = useState(0);

    // 👉 estos luego vienen del backend
    const { data: cuotasVencidas } = useCuotasVencidas()
    const { data: cuotasPorVencer } = useCuotasPorVencer()


    return (
        <Box className="bg-white rounded-xl shadow p-4 space-y-4">
            {/* 🔝 Dashboard resumen */}
            <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Vencidas */}
                <div
                    onClick={() => setTab(0)}
                    className="cursor-pointer rounded-xl border border-red-200 bg-red-50 p-4 hover:shadow-md transition"
                >
                    <p className="text-sm text-red-700">Cuotas vencidas</p>
                    <p className="text-3xl font-semibold text-red-800">
                        {cuotasVencidas ? cuotasVencidas.length : 0}
                    </p>
                </div>

                {/* Por vencer */}
                <div
                    onClick={() => setTab(1)}
                    className="cursor-pointer rounded-xl border border-yellow-200 bg-yellow-50 p-4 hover:shadow-md transition"
                >
                    <p className="text-sm text-yellow-700">
                        Cuotas por vencer (≤ 3 días)
                    </p>
                    <p className="text-3xl font-semibold text-yellow-800">
                        {cuotasPorVencer ? cuotasPorVencer.length : 0}
                    </p>
                </div>
            </Box>

            {/* 🧭 Tabs */}
            <Tabs
                value={tab}
                onChange={(_, value) => setTab(value)}
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    "& .MuiTab-root": {
                        textTransform: "none",
                        fontWeight: 500,
                    },
                    "& .Mui-selected": {
                        color: "var(--primary-500)",
                    },
                    "& .MuiTabs-indicator": {
                        backgroundColor: "var(--primary-500)",
                    },
                }}
            >
                <Tab label="Vencidas" />
                <Tab label="Por vencer" />
            </Tabs>

            {/* 📄 Contenido */}
            <Box>
                {tab === 0 && <CuotasVencidasTab />}
                {tab === 1 && <CuotasPorVencerTab />}
            </Box>
        </Box>
    );
}
