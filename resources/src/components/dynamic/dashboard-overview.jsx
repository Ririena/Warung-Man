
import {
    TrendingUp,
    ShoppingCart,
    Users,
    DollarSign,
    ArrowUpRight,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

const salesData = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 2000, revenue: 9800 },
    { month: "Apr", sales: 2780, revenue: 3908 },
    { month: "May", sales: 1890, revenue: 4800 },
    { month: "Jun", sales: 2390, revenue: 3800 },
];

const categoryData = [
    { category: "Electronics", sales: 4000 },
    { category: "Clothing", sales: 3000 },
    { category: "Home & Garden", sales: 2800 },
    { category: "Sports", sales: 2200 },
    { category: "Books", sales: 2290 },
];

function MetricCard({ title, value, change, icon: Icon, color }) {
    return (
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-muted-foreground text-sm font-medium">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-foreground mt-2">
                        {value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight
                            className={`w-4 h-4 ${change >= 0 ? "text-green-600" : "text-red-600"}`}
                        />
                        <span
                            className={`text-sm font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                            {change >= 0 ? "+" : ""}
                            {change}%
                        </span>
                    </div>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );
}

export default function DashboardOverview() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    Dashboard
                </h2>
                <p className="text-muted-foreground">
                    Welcome back! Here's your business overview.
                </p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Revenue"
                    value="$45,231"
                    change={12}
                    icon={DollarSign}
                    color="bg-primary"
                />
                <MetricCard
                    title="Total Orders"
                    value="1,234"
                    change={8}
                    icon={ShoppingCart}
                    color="bg-accent"
                />
                <MetricCard
                    title="Active Users"
                    value="892"
                    change={15}
                    icon={Users}
                    color="bg-green-500"
                />
                <MetricCard
                    title="Growth Rate"
                    value="24.5%"
                    change={5}
                    icon={TrendingUp}
                    color="bg-blue-500"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-border shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-6">
                        Sales & Revenue Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--color-border)"
                            />
                            <XAxis
                                dataKey="month"
                                stroke="var(--color-muted-foreground)"
                            />
                            <YAxis stroke="var(--color-muted-foreground)" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "white",
                                    border: "1px solid var(--color-border)",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="var(--color-primary)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-primary)" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="var(--color-accent)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-accent)" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Chart */}
                <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-6">
                        Sales by Category
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--color-border)"
                            />
                            <XAxis
                                dataKey="category"
                                stroke="var(--color-muted-foreground)"
                            />
                            <YAxis stroke="var(--color-muted-foreground)" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "white",
                                    border: "1px solid var(--color-border)",
                                }}
                            />
                            <Bar
                                dataKey="sales"
                                fill="var(--color-primary)"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-6">
                    Recent Orders
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 font-semibold text-foreground">
                                    Order ID
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-foreground">
                                    Customer
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-foreground">
                                    Amount
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-foreground">
                                    Date
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-foreground">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    id: "#12345",
                                    customer: "John Doe",
                                    amount: "$1,234",
                                    date: "Jan 15, 2024",
                                    status: "Completed",
                                },
                                {
                                    id: "#12344",
                                    customer: "Jane Smith",
                                    amount: "$856",
                                    date: "Jan 14, 2024",
                                    status: "Completed",
                                },
                                {
                                    id: "#12343",
                                    customer: "Bob Johnson",
                                    amount: "$2,341",
                                    date: "Jan 13, 2024",
                                    status: "Pending",
                                },
                                {
                                    id: "#12342",
                                    customer: "Alice Brown",
                                    amount: "$434",
                                    date: "Jan 12, 2024",
                                    status: "Completed",
                                },
                            ].map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-border hover:bg-secondary transition-colors"
                                >
                                    <td className="py-3 px-4 text-foreground font-medium">
                                        {order.id}
                                    </td>
                                    <td className="py-3 px-4 text-foreground">
                                        {order.customer}
                                    </td>
                                    <td className="py-3 px-4 text-foreground font-medium">
                                        {order.amount}
                                    </td>
                                    <td className="py-3 px-4 text-muted-foreground">
                                        {order.date}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                order.status === "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
