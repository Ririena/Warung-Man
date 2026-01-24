"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-warung-man-500x500.png";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                            <img
                                src={logo}
                                className="object-fit"
                                width={1000}
                                height={1000}
                            />
                        </div>
                        <span className="text-green-500 font-semibold italic text-lg hidden sm:inline">
                            Warung Man
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/product"
                            className="text-sm font-medium hover:text-accent transition-colors"
                        >
                            Produk
                        </Link>

                        <Link
                            to="#"
                            className="text-sm font-medium hover:text-accent transition-colors"
                        >
                            Kontak
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors hidden sm:inline-flex">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors relative">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                        </button>

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
