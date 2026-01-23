"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const MAIN_MENU = [
        { label: "Produk", to: "/product" },
        { label: "Kontak", to: "/contact" },
    ];

    const USER_MENU = [
        { label: "Profile", to: "/profile" },
        { label: "Pesanan", to: "/orders" },
        { label: "Logout", to: "/logout", danger: true },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            {/* Logo Whatever entar */}
                        </div>
                        <span className="font-bold text-lg hidden sm:inline">
                            Warung Man
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {MAIN_MENU.map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className="text-sm font-medium hover:text-accent transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button className="p-2  rounded-lg transition-colors hidden sm:inline-flex">
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button className="p-2  rounded-lg transition-colors relative">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="p-2 rounded-lg"
                                >
                                    <User className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-48" align="end">
                                <DropdownMenuLabel className="text-center">
                                    Akun Saya
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {USER_MENU.map((item) => (
                                    <DropdownMenuItem
                                        key={item.label}
                                        asChild
                                        className={
                                            item.danger
                                                ? "text-red-500 hover:cursor-pointer"
                                                : "hover:cursor-pointer"
                                        }
                                    >
                                        <Link to={item.to}>{item.label}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
                        <Link
                            href="#"
                            className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                        >
                            Shop
                        </Link>
                        <Link
                            href="#"
                            className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                        >
                            Collections
                        </Link>
                        <Link
                            href="#"
                            className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                        >
                            About
                        </Link>
                        <Link
                            href="#"
                            className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                        >
                            Contact
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
