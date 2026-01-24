import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Layers,
    CreditCard,
    Users,
} from "lucide-react";

export default function Sidebar() {
    const menuItems = [
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
        { to: "/dashboard/products", label: "Products", icon: Package },
        { to: "/dashboard/categories", label: "Categories", icon: Layers },
        { to: "/dashboard/transactions", label: "Transactions", icon: CreditCard },
        { to: "/dashboard/users", label: "Users", icon: Users },
    ];

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
        </aside>
    );
}
