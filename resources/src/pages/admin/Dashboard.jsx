import { useState } from "react";
import DashboardOverview from "@/components/dynamic/dashboard-overview";
import ProductsPage from "@/components/dynamic/products-page";
import CategoriesPage from "@/components/dynamic/categories-page";
import TransactionsPage from "@/components/dynamic/transaction-page";
import UsersPage from "@/components/dynamic/users-page";
import Sidebar from "@/components/dynamic/sidebar";

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState("dashboard");
    return (
        <>
            <div className="flex h-screen bg-background">
                <Sidebar
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <main className="flex-1 overflow-auto">
                    {currentPage === "dashboard" && <DashboardOverview />}
                    {currentPage === "products" && <ProductsPage />}
                    {currentPage === "categories" && <CategoriesPage />}
                    {currentPage === "transactions" && <TransactionsPage />}
                    {currentPage === "users" && <UsersPage />}
                </main>
            </div>
        </>
    );
};

export default Dashboard
