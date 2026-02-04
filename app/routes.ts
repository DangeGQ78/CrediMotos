import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
    layout("./components/layouts/layout.tsx", [
        ...prefix("credimotos", [

            route("dashboard", "./pages/dashboard/dashboardPage.tsx"),
            route("creditos", "./pages/credits/creditsPage.tsx"),
            route("clientes", "./pages/clients/clientsPage.tsx"),
            route("cuotas", "./pages/quotas/cuotasPage.tsx"),



        ])
    ])
] satisfies RouteConfig;
