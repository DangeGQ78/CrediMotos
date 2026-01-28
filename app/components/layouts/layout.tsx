import type { ReactElement } from "react";
import { Outlet, NavLink, useParams, useLocation } from "react-router";
import { useState } from "react";
import type { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function AppLayout(): ReactElement {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return (
        <div className="h-screen bg-(--primary-50) flex flex-col md:flex-row">
            {/* Sidebar mobile overlay */}
            <div
                className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300
  ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300
    ${sidebarOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setSidebarOpen(false)}
                />

                {/* Sidebar */}
                <aside
                    className={`absolute left-0 top-0 h-full w-64 bg-(--primary-300)
    border-r flex flex-col shadow-lg
    transform transition-transform duration-300 ease-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="p-4 font-bold text-lg flex justify-between items-center">
                        Credimotos
                        <button onClick={() => setSidebarOpen(false)}>✕</button>
                    </div>

                    <nav className="flex-1 px-3 space-y-2">
                        <MenuItem to="credimotos/dashboard" label="Dashboard" icon="dashboard" onClickMobile={() => setSidebarOpen(false)} />
                        <MenuItem to="credimotos/clientes" label="Clientes" icon="user" onClickMobile={() => setSidebarOpen(false)} />
                        <MenuItem to="credimotos/creditos" label="Créditos" icon="credit-card" onClickMobile={() => setSidebarOpen(false)} />
                        <MenuItem to="credimotos/motos" label="Motos" icon="motorcycle" onClickMobile={() => setSidebarOpen(false)} />
                        <MenuItem to="credimotos/productos" label="Electrodomésticos" icon="box-open" onClickMobile={() => setSidebarOpen(false)} />
                        <MenuItem to="credimotos/simuladorPlazoFijo" label="Simulador(Plazo)" icon="sliders" onClickMobile={() => setSidebarOpen(false)} />
                    </nav>


                </aside>
            </div>


            {/* Sidebar desktop */}
            <aside className="hidden md:flex w-64 bg-(--primary-300) border-r flex-col">
                <h1 className="p-4 font-bold text-lg">Credimotos</h1>
                <nav className="flex-1 px-3 space-y-2">
                    <MenuItem to="credimotos/dashboard" label="Dashboard" icon="dashboard" />
                    <MenuItem to="credimotos/clientes" label="Clientes" icon="user" />
                    <MenuItem to="credimotos/creditos" label="Créditos" icon="credit-card" />
                    <MenuItem to="credimotos/motos" label="Motos" icon="motorcycle" />
                    <MenuItem to="credimotos/productos" label="Electrodomésticos" icon="box-open" />
                    <MenuItem to="credimotos/simuladorPlazoFijo" label="Simulador(Plazo)" icon="sliders" onClickMobile={() => setSidebarOpen(false)} />
                </nav>

            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="h-16 bg-(--primary-300) border-b flex items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        {/* Hamburger para mobile */}
                        <button
                            className="md:hidden p-2 rounded hover:bg-(--primary-400)"
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>
                        <h1 className="font-semibold text-lg">{lastSegment}</h1>
                    </div>
                    <div className="flex items-center gap-4">🔔 👤</div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-amber-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

function MenuItem({ to, label, icon, onClickMobile }: { to: string; label: string; icon: IconProp, onClickMobile?: () => void }) {
    return (
        <NavLink
            onClick={onClickMobile}
            to={to}
            end
            className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer hover:bg-(--primary-500)  hover:scale-105 text-(--neutral-50) ${isActive ? "bg-(--primary-500) scale-105 font-semibold " : ""
                }`
            }
        >
            <FontAwesomeIcon icon={icon} className="w-5 h-5" />
            <span> {label}</span>

        </NavLink>
    );
}
