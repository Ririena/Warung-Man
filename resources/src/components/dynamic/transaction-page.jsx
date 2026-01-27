import { useEffect, useState } from 'react'
import { Search, Download, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { useFetch } from '@/lib/useFetch'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



export default function TransactionsPage() {
    const { data, loading, error, fetchData } = useFetch("/api/transaksi-all")
    const [transactions, setTransactions] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        if (data) {
            console.log('Full API Response:', data)
            if (Array.isArray(data)) {
                setTransactions(data)
            } else if (data.data && Array.isArray(data.data)) {
                console.log('Transactions:', data.data)
                setTransactions(data.data)
            }
        }
    }, [data])

    console.log('Current transactions state:', transactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState()

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totals = {
    completed: transactions.filter((t) => t.status === "telahdikirim").reduce((sum, t) => {
      const totals = parseFloat(t.totals)
      return sum + totals
    }, 0),
    pending: transactions.filter((t) => t.status === "dikirim").reduce((sum, t) => {
      const totals = parseFloat(t.totals)
      return sum + totals
    }, 0),
    failed: transactions.filter((t) => t.status === "dikirim").reduce((sum, t) => {
      const totals = parseFloat(t.totals)
      return sum + totals
    }, 0),
  }
    async function handdleConfirmComplete(id) {
        // alert("Konfirmasi transaksi selesai untuk ID: " + id);
        try {
            const res = await axios.post(`/api/transaksi/confirm-complete/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
                    Accept: "application/json",
                },
            });
            const data = await res.data;
            if (data.status === "success") {
                alert("Transaksi berhasil dikonfirmasi selesai.");
                fetchData(); // Refresh the transactions list
            }
        } catch (error) {
            console.error("Error during confirming transaction:", error);
        }
    }
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Transactions</h2>
          <p className="text-muted-foreground mt-1">View and manage all payment transactions</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium">
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">Total Transactions</p>
          <p className="text-3xl font-bold text-foreground mt-2">{transactions.length}</p>
          <p className="text-xs text-muted-foreground mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">${(totals.completed / 1000).toFixed(1)}K</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <ArrowDownLeft className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">${(totals.pending / 1000).toFixed(1)}K</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100">
              <ArrowUpRight className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Failed</p>
              <p className="text-3xl font-bold text-red-600 mt-2">${(totals.failed / 1000).toFixed(1)}K</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <ArrowUpRight className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-4 py-2">
          <Filter size={20} className="text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent outline-none text-foreground font-medium cursor-pointer"
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left py-4 px-6 font-semibold text-foreground">Order ID</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Amount</th>
                {/* <th className="text-left py-4 px-6 font-semibold text-foreground">Type</th> */}
                {/* <th className="text-left py-4 px-6 font-semibold text-foreground">Method</th> */}
                <th className="text-left py-4 px-6 font-semibold text-foreground">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">status Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                // onclick={() => navigate(`/transactions/${transaction.id}`)}
                <tr
                //   onClick={() => navigate(`/transactions/${transaction.id}`)}
                  key={transaction.id}
                  className="border-b border-border hover:bg-secondary transition-colors last:border-b-0"
                >
                  <td className="py-4 px-6 font-medium text-primary">{transaction.name}</td>
                  <td className="py-4 px-6 text-foreground">{transaction.user?.name || "N/A"}</td>
                  <td className="py-4 px-6 font-semibold text-foreground">{parseInt(transaction.totals).toLocaleString()}</td>
                  {/* <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {transaction.type === 'Credit' ? (
                        <ArrowUpRight className="w-4 h-4 text-red-600" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-green-600" />
                      )}
                      <span className={transaction.type === 'Credit' ? 'text-red-600' : 'text-green-600'}>
                        {transaction.type}
                      </span>
                    </div>
                  </td> */}
                  {/* <td className="py-4 px-6 text-muted-foreground">{transaction.method}</td> */}
                  <td className="py-4 px-6 text-muted-foreground">{transaction.transaction_date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        transaction.status === "selesai"
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {transaction.status === "selesai" ? "completed": "pending"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        transaction.payment?.status === "paid"
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {transaction.payment?.status === "paid" ? "paid": "pending"}
                    </span>
                  </td>
                  {transaction.status == "dikirim" && (
                    <td>
                      <button
                        onClick={() => handdleConfirmComplete(transaction.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium"
                      >
                        Konfirmasi Selesai
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground text-sm">
          Showing <span className="font-semibold text-foreground">{filteredTransactions.length}</span> of{' '}
          <span className="font-semibold text-foreground">{transactions.length}</span> transactions
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors font-medium">
            Previous
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-medium">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
