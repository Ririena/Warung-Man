
import { useState } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'


const mockProducts = [
  { id: '1', name: 'Wireless Headphones', category: 'Electronics', price: '$89.99', stock: 45, status: 'Active' },
  { id: '2', name: 'Laptop Stand', category: 'Office', price: '$34.99', stock: 120, status: 'Active' },
  { id: '3', name: 'USB-C Cable', category: 'Electronics', price: '$12.99', stock: 5, status: 'Active' },
  { id: '4', name: 'Desk Lamp', category: 'Office', price: '$29.99', stock: 30, status: 'Inactive' },
  { id: '5', name: 'Mechanical Keyboard', category: 'Electronics', price: '$129.99', stock: 23, status: 'Active' },
  { id: '6', name: 'Monitor Arm', category: 'Office', price: '$44.99', stock: 15, status: 'Active' },
  { id: '7', name: 'Webcam HD', category: 'Electronics', price: '$59.99', stock: 8, status: 'Active' },
  { id: '8', name: 'Desk Organizer', category: 'Office', price: '$19.99', stock: 60, status: 'Active' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Products</h2>
          <p className="text-muted-foreground mt-1">Manage your product inventory</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left py-4 px-6 font-semibold text-foreground">Product Name</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Category</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Price</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Stock</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border hover:bg-secondary transition-colors last:border-b-0"
                >
                  <td className="py-4 px-6 text-foreground font-medium">{product.name}</td>
                  <td className="py-4 px-6 text-muted-foreground">{product.category}</td>
                  <td className="py-4 px-6 text-foreground font-semibold">{product.price}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 20
                          ? 'bg-green-100 text-green-700'
                          : product.stock > 5
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border border-border">
          <p className="text-muted-foreground text-sm font-medium">Total Products</p>
          <p className="text-3xl font-bold text-foreground mt-2">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border">
          <p className="text-muted-foreground text-sm font-medium">Active Products</p>
          <p className="text-3xl font-bold text-primary mt-2">{products.filter((p) => p.status === 'Active').length}</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border">
          <p className="text-muted-foreground text-sm font-medium">Low Stock Items</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{products.filter((p) => p.stock < 20).length}</p>
        </div>
      </div>
    </div>
  )
}
