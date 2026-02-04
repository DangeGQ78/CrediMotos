import type { ReactElement } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import { useState } from "react";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo-Credimoto-removebg-preview.png";
import {
    faDashboard,
    faCreditCard,
    faDollar,
    faUser
} from "@fortawesome/free-solid-svg-icons";


export default function AppLayout(): ReactElement {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const colorGeneral = "bg-(--primary-600)";

    return (
        <div className="min-h-dvh flex bg-(--primary-50)">
            {/* Sidebar desktop */}
            <aside className="hidden md:flex md:flex-col w-64 bg-(--primary-600) border-r p-3 space-y-2">
                {/* Logo */}
                <img
                    src={logo}
                    alt="CrediMotos"
                    className="h-12 w-auto object-contain rounded-full p-1 bg-(--neutral-50)"
                />
                <MenuItem to="credimotos/dashboard" label="Dashboard" icon={faDashboard} />
                <MenuItem to="credimotos/creditos" label="Créditos" icon={faCreditCard} />
                <MenuItem to="credimotos/cuotas" label="Cuotas" icon={faDollar} />
                <MenuItem to="credimotos/clientes" label="Clientes" icon={faUser} />

            </aside>

            {/* Sidebar mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-30 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className={`absolute left-0 top-0 h-full w-64 ${colorGeneral} border-r flex flex-col shadow-lg p-3`}>
                        <button className="self-end p-2" onClick={() => setSidebarOpen(false)}>✕</button>
                        <MenuItem to="credimotos/dashboard" label="Dashboard" icon={faDashboard} onClickMobile={() => setSidebarOpen(false)} />
                        <MenuItem to="credimotos/creditos" label="Créditos" icon={faCreditCard} onClickMobile={() => setSidebarOpen(false)} />
                        <MenuItem to="credimotos/cuotas" label="Cuotas" icon={faDollar} onClickMobile={() => setSidebarOpen(false)} />
                        <MenuItem to="credimotos/clientes" label="Clientes" icon={faUser} onClickMobile={() => setSidebarOpen(false)} />
                    </aside>
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className={`h-16 ${colorGeneral} border-b flex items-center justify-between px-4 md:px-6`}>
                    <div className="flex items-center gap-4">
                        {/* Hamburger mobile */}
                        <button
                            className="md:hidden p-2 rounded hover:bg-(--primary-400)"
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>



                        {/* Título de sección */}
                        <h1 className="font-semibold text-lg">{lastSegment.toLocaleUpperCase()}</h1>
                    </div>

                    <div className="flex items-center gap-4">🔔 👤</div>
                </header>

                {/* Page content */}
                <main className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 bg-amber-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

function MenuItem({ to, label, icon, onClickMobile }: { to: string; label: string; icon: IconProp; onClickMobile?: () => void }) {
    return (
        <NavLink
            onClick={onClickMobile}
            to={to}
            end
            className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer hover:bg-(--primary-500) hover:scale-105 text-(--neutral-50) ${isActive ? "bg-(--primary-500) scale-105 font-semibold" : ""
                }`
            }
        >
            <FontAwesomeIcon icon={icon} className="w-5 h-5" />
            <span>{label}</span>
        </NavLink>
    );
}
