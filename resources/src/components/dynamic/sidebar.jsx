import { NavLink } from "react-router-dom";
import axios from "axios";
import {
    LayoutDashboard,
    Package,
    Layers,
    CreditCard,
    Users,
    LogOut,
} from "lucide-react";
// import { Axios } from "node_modules/axios/index.cjs";

export default function Sidebar() {
    const menuItems = [
        { to: "/dashboard", label: "Dashboards", icon: LayoutDashboard, end: true },
        { to: "/dashboard/products", label: "Products", icon: Package },
        { to: "/dashboard/categories", label: "Categories", icon: Layers },
        { to: "/dashboard/transactions", label: "Transactions", icon: CreditCard },
        { to: "/dashboard/users", label: "Users", icon: Users },
    ];

    const handleLogout = () => {
        // Add logout logic here
        const res = axios.post("/api/logout", {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
                Accept: "application/json",
            },
        });
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <aside className="w-64 bg-white border-r h-screen flex flex-col">
            {/* HEADER */}
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-primary">Admin</h1>
                <p className="text-sm text-muted-foreground">
                    Warung Mang Dashboard
                </p>
            </div>

            {/* NAV */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                    isActive
                                        ? "bg-primary text-white shadow"
                                        : "text-foreground hover:bg-secondary"
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* LOGOUT BUTTON */}
            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-red-100 hover:text-red-600 transition-all font-medium"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
