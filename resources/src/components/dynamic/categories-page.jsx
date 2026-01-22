
import { useState } from 'react'
import { Plus, Edit2, Trash2, Search, BarChart3 } from 'lucide-react'


const mockCategories = [
  { id: '1', name: 'Electronics', description: 'Electronic devices and accessories', products: 45, revenue: '$125,400', status: 'Active' },
  { id: '2', name: 'Office Supplies', description: 'Office furniture and supplies', products: 67, revenue: '$87,600', status: 'Active' },
  { id: '3', name: 'Home & Garden', description: 'Home improvement and garden tools', products: 34, revenue: '$56,300', status: 'Active' },
  { id: '4', name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear', products: 52, revenue: '$94,200', status: 'Active' },
  { id: '5', name: 'Books', description: 'Physical and digital books', products: 120, revenue: '$42,100', status: 'Inactive' },
  { id: '6', name: 'Clothing', description: 'Apparel and fashion items', products: 85, revenue: '$156,700', status: 'Active' },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id))
  }

  const totalRevenue = categories.reduce((sum, cat) => {
    const revenue = parseFloat(cat.revenue.replace('$', '').replace(',', ''))
    return sum + revenue
  }, 0)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Categories</h2>
          <p className="text-muted-foreground mt-1">Manage product categories and organization</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium">
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Categories</p>
              <p className="text-3xl font-bold text-foreground mt-2">{categories.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Products</p>
              <p className="text-3xl font-bold text-foreground mt-2">{categories.reduce((sum, c) => sum + c.products, 0)}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-foreground mt-2">${(totalRevenue / 1000).toFixed(0)}K</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary">
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase">Products</p>
                <p className="text-2xl font-bold text-foreground mt-1">{category.products}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase">Revenue</p>
                <p className="text-2xl font-bold text-primary mt-1">{category.revenue}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase">Status</p>
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                    category.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {category.status}
                </span>
              </div>
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
                <th className="text-left py-4 px-6 font-semibold text-foreground">Products</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Revenue</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-border hover:bg-secondary transition-colors last:border-b-0"
                >
                  <td className="py-4 px-6 font-medium text-foreground">{category.name}</td>
                  <td className="py-4 px-6 text-foreground">{category.products}</td>
                  <td className="py-4 px-6 font-semibold text-primary">{category.revenue}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        category.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
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
