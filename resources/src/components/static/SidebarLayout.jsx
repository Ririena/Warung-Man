import Sidebar from "@/components/dynamic/sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const SidebarLayout = ({children}) => {
    const [currentPage, setCurrentPage] = useState("products");
    return (
        <>
            <div className="flex h-screen bg-background">
                <Sidebar
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </>
    );
};

export default SidebarLayout;
