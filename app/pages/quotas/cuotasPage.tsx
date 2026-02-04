import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PaymentsPage from "./payments";
import CuotasOverview from "./cuotasOverview";

export default function CuotasPage() {
    const [tab, setTab] = useState(0);



    return (
        <Box className="bg-white rounded-xl shadow p-4 space-y-4">


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
                <Tab label="Cuotas" />
                <Tab label="Pagos" />
            </Tabs>

            {/* 📄 Contenido */}
            <Box>
                {tab === 0 && <CuotasOverview />}
                {tab === 1 && <PaymentsPage />}
            </Box>
        </Box>
    );
}
