
import { useState } from 'react'
import { Search, Download, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react'



const mockTransactions = [
  { id: '1', orderId: '#12345', customer: 'John Doe', amount: '$1,234.50', type: 'Debit', method: 'Credit Card', date: 'Jan 20, 2024', status: 'Completed' },
  { id: '2', orderId: '#12344', customer: 'Jane Smith', amount: '$856.00', type: 'Debit', method: 'PayPal', date: 'Jan 19, 2024', status: 'Completed' },
  { id: '3', orderId: '#12343', customer: 'Bob Johnson', amount: '$2,341.75', type: 'Debit', method: 'Credit Card', date: 'Jan 18, 2024', status: 'Pending' },
  { id: '4', orderId: '#12342', customer: 'Alice Brown', amount: '$434.25', type: 'Debit', method: 'Debit Card', date: 'Jan 17, 2024', status: 'Completed' },
  { id: '5', orderId: '#12341', customer: 'Charlie Wilson', amount: '$1,567.00', type: 'Credit', method: 'Refund', date: 'Jan 16, 2024', status: 'Completed' },
  { id: '6', orderId: '#12340', customer: 'Diana Davis', amount: '$789.50', type: 'Debit', method: 'Credit Card', date: 'Jan 15, 2024', status: 'Completed' },
  { id: '7', orderId: '#12339', customer: 'Eve Martinez', amount: '$543.00', type: 'Debit', method: 'PayPal', date: 'Jan 14, 2024', status: 'Failed' },
  { id: '8', orderId: '#12338', customer: 'Frank Moore', amount: '$2,100.00', type: 'Debit', method: 'Bank Transfer', date: 'Jan 13, 2024', status: 'Completed' },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState()

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totals = {
    completed: transactions.filter((t) => t.status === 'Completed').reduce((sum, t) => {
      const amount = parseFloat(t.amount.replace('$', '').replace(',', ''))
      return sum + amount
    }, 0),
    pending: transactions.filter((t) => t.status === 'Pending').reduce((sum, t) => {
      const amount = parseFloat(t.amount.replace('$', '').replace(',', ''))
      return sum + amount
    }, 0),
    failed: transactions.filter((t) => t.status === 'Failed').reduce((sum, t) => {
      const amount = parseFloat(t.amount.replace('$', '').replace(',', ''))
      return sum + amount
    }, 0),
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
                <th className="text-left py-4 px-6 font-semibold text-foreground">Type</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Method</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-border hover:bg-secondary transition-colors last:border-b-0"
                >
                  <td className="py-4 px-6 font-medium text-primary">{transaction.orderId}</td>
                  <td className="py-4 px-6 text-foreground">{transaction.customer}</td>
                  <td className="py-4 px-6 font-semibold text-foreground">{transaction.amount}</td>
                  <td className="py-4 px-6">
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
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{transaction.method}</td>
                  <td className="py-4 px-6 text-muted-foreground">{transaction.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        transaction.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : transaction.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
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
