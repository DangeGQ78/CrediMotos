import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
    layout("./components/layouts/layout.tsx", [
        ...prefix("credimotos", [

            route("dashboard", "./routes/dashboardPage.tsx"),
            route("creditos", "./routes/creditsPage.tsx"),
            route("clientes", "./routes/clientsPage.tsx"),
            route("motos", "./routes/bikesPage.tsx"),
            route("productos", "./routes/productsPage.tsx"),
            route("simuladorPlazoFijo", "./routes/simulatorPlazosPage.tsx"),
        ])
    ])
] satisfies RouteConfig;
