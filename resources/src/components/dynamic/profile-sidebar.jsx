import { Link, useLocation } from "react-router-dom";
import { User, Package, MapPin, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";

const MENU = [
    {
        label: "Profil Saya",
        to: "/profile",
        icon: User,
    },
    {
        label: "Pesanan Saya",
        to: "/profile/orders",
        icon: Package,
    },
    {
        label: "Alamat",
        to: "/profile/address",
        icon: MapPin,
    },
];

const ProfileSidebar = () => {
    const location = useLocation();

    return (
        <Card className="rounded-sm p-2">
            <nav className="space-y-1">
                {MENU.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.to;

                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                                ${
                                    active
                                        ? "bg-secondary font-medium"
                                        : "hover:bg-secondary"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    );
                })}

                <div className="pt-2 mt-2 border-t">
                    <button
                        className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-red-500 hover:bg-red-500/10 transition"
                        onClick={() => {
                            // TODO: panggil API logout
                            console.log("logout");
                        }}
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </nav>
        </Card>
    );
};

export default ProfileSidebar;
