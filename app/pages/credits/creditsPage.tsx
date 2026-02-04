import { Box, Tab, Tabs, Badge } from "@mui/material";
import { useState, useEffect } from "react";
import SimulatorPage from "./simulatorTab";
import CreditsManagmentsPage from "./creditsManagTab";
import { useOfertaCreditoStore } from "~/stores/ofertaCreditosStore";



export default function CreditsPage() {
    const [tab, setTab] = useState(0);
    const { hasOferta } = useOfertaCreditoStore();

    // 🔁 Si hay simulación → ir automáticamente a gestión
    useEffect(() => {
        if (hasOferta()) {
            setTab(0);
        }
    }, [hasOferta]);

    return (
        <Box className="bg-white rounded-xl shadow">
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
                <Tab
                    label={
                        hasOferta() ? (
                            <Badge color="success" variant="dot">
                                Gestión de Créditos
                            </Badge>
                        ) : (
                            "Gestión de Créditos"
                        )
                    }
                />
                <Tab label="Simulador de Créditos" />
            </Tabs>

            <Box p={3}>
                {tab === 0 && <CreditsManagmentsPage />}
                {tab === 1 && <SimulatorPage />}

            </Box>
        </Box>
    );
}
