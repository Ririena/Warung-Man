import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search, BarChart3 } from 'lucide-react'
import { useFetch } from '@/lib/useFetch'
import axios from 'axios'
import { data, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
function Card({category}){
return (<tr key={category.id} className="border-b border-border hover:bg-secondary transition-colors last:border-b-0">
                  <td className="py-4 px-6 font-medium text-foreground">{category.name}</td>
                  <td className="py-4 px-6 text-foreground">{new Date(category.created_at).toLocaleDateString()}</td>
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
                </tr>)
}

export default function CategoriesPage() {
    const navigate = useNavigate()
  const { data, loading, error, fetchData } = useFetch("/api/kategoris")
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setCategories(data.data)
    }
  }, [data])

  if (loading) return <p>loading..</p>
  if (error) return <p>error...</p>

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id))
  }
//   const navigate = useNavigate()
  const handdleClickUpdate = (index) => {
    console.log(categories[index])
    return
    navigate("categories/add",{state: {data:filteredCategories[index]} })
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Categories</h2>
          <p className="text-muted-foreground mt-1">Manage product categories</p>
        </div>
        <Link to={"/dashboard/categories/add"}>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium">
          <Plus size={20} />
          Add Category
        </button>
        </Link>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
                <p className="text-muted-foreground text-sm mt-1">Created: {new Date(category.created_at).toLocaleDateString()}</p>
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
                <th className="text-left py-4 px-6 font-semibold text-foreground">Created At</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <Card category={category} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
