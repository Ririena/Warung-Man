
import { useState } from 'react'
import { Plus, Edit2, Trash2, Search, Mail, Phone, MapPin } from 'lucide-react'



const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', location: 'New York, USA', joinDate: 'Jan 5, 2023', totalOrders: 12, totalSpent: '$2,456.50', status: 'Active', role: 'Customer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 234-5678', location: 'Los Angeles, USA', joinDate: 'Mar 12, 2023', totalOrders: 8, totalSpent: '$1,875.00', status: 'Active', role: 'Customer' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 345-6789', location: 'Chicago, USA', joinDate: 'May 20, 2023', totalOrders: 5, totalSpent: '$892.75', status: 'Active', role: 'Customer' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', phone: '(555) 456-7890', location: 'Houston, USA', joinDate: 'Jul 8, 2023', totalOrders: 15, totalSpent: '$3,234.25', status: 'Active', role: 'Customer' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', phone: '(555) 567-8901', location: 'Phoenix, USA', joinDate: 'Sep 15, 2023', totalOrders: 3, totalSpent: '$543.00', status: 'Inactive', role: 'Customer' },
  { id: '6', name: 'Diana Davis', email: 'diana@example.com', phone: '(555) 678-9012', location: 'Philadelphia, USA', joinDate: 'Nov 22, 2023', totalOrders: 9, totalSpent: '$1,654.50', status: 'Active', role: 'Moderator' },
  { id: '7', name: 'Eve Martinez', email: 'eve@example.com', phone: '(555) 789-0123', location: 'San Antonio, USA', joinDate: 'Dec 1, 2023', totalOrders: 7, totalSpent: '$1,245.75', status: 'Active', role: 'Customer' },
  { id: '8', name: 'Frank Moore', email: 'frank@example.com', phone: '(555) 890-1234', location: 'San Diego, USA', joinDate: 'Jan 10, 2024', totalOrders: 11, totalSpent: '$2,789.00', status: 'Active', role: 'Admin' },
]

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Users</h2>
          <p className="text-muted-foreground mt-1">Manage customer accounts and permissions</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium">
          <Plus size={20} />
          Add User
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">Total Users</p>
          <p className="text-3xl font-bold text-foreground mt-2">{users.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Registered accounts</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">Active Users</p>
          <p className="text-3xl font-bold text-primary mt-2">{users.filter((u) => u.status === 'Active').length}</p>
          <p className="text-xs text-muted-foreground mt-2">Currently active</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            $
            {(
              users.reduce((sum, u) => {
                const spent = parseFloat(u.totalSpent.replace('$', '').replace(',', ''))
                return sum + spent
              }, 0) / 1000
            ).toFixed(1)}
            K
          </p>
          <p className="text-xs text-muted-foreground mt-2">From all users</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">Avg Orders</p>
          <p className="text-3xl font-bold text-accent mt-2">
            {(users.reduce((sum, u) => sum + u.totalOrders, 0) / users.length).toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Per user</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-white text-foreground font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{user.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.role === 'Admin'
                        ? 'bg-primary text-white'
                        : user.role === 'Moderator'
                          ? 'bg-accent text-white'
                          : 'bg-secondary text-foreground'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={16} />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={16} />
                    {user.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={16} />
                    {user.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary">
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase">Orders</p>
                <p className="text-2xl font-bold text-foreground mt-1">{user.totalOrders}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase">Spent</p>
                <p className="text-2xl font-bold text-primary mt-1">{user.totalSpent}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase">Joined</p>
                <p className="text-xs text-foreground mt-1 font-medium">{user.joinDate}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Table View */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left py-4 px-6 font-semibold text-foreground">Name</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Orders</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Total Spent</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Role</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-secondary transition-colors last:border-b-0"
                >
                  <td className="py-4 px-6 font-medium text-foreground">{user.name}</td>
                  <td className="py-4 px-6 text-muted-foreground">{user.email}</td>
                  <td className="py-4 px-6 text-foreground">{user.totalOrders}</td>
                  <td className="py-4 px-6 font-semibold text-primary">{user.totalSpent}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                        user.role === 'Admin'
                          ? 'bg-primary text-white'
                          : user.role === 'Moderator'
                            ? 'bg-accent text-white'
                            : 'bg-secondary text-foreground'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
