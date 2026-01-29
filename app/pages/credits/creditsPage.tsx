import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import type { Credit } from "~/types/types";
import SimulatorPage from "./simulatorPlazosPage";
import CreditsManagmentsPage from "./creditsManagmentsPage";


export default function CreditsPage() {
    const [tab, setTab] = useState(0)
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
                <Tab label="Gestion de Creditos" />
                <Tab label="Simulador de Creditos" />
                {/* <Tab label="PDF" /> */}
            </Tabs>
            <Box p={2}>
                {tab === 0 && <CreditsManagmentsPage />}
                {tab === 1 && <SimulatorPage />}
                {/* {tab === 2 && <CreditoPdf />} */}
            </Box>
        </Box>
    );

}



