import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import useProductStore from '../data/stores/ProductStore';

const Products = () => {
  const navigate = useNavigate();
  const { products, categories, fetchProducts, fetchCategories, loading, error } = useProductStore();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFocus, setCategoryFocus] = useState(false);
  const [subcategoryFocus, setSubcategoryFocus] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const currentSubs = categories.find(c => c.name === selectedCategory)?.subcategories || [];
  const allSubcategories = Array.from(
    new Set(categories.flatMap(c => c.subcategories || []))
  );

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subcategory?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedSubcategory && p.subcategory !== selectedSubcategory) return false;
    return true;
  });

  return (
    <div className="p-6 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product List</h2>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/admin/products/add')}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add New Product
          </button>
          <button
            onClick={() => navigate('/admin/products/delete')}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search product..."
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/2 focus:outline-none focus:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Dropdown with Rotating Arrow */}
        <div className="relative w-full md:w-1/3">
          <select
            className="border border-gray-300 px-4 py-2 pr-10 rounded w-full appearance-none focus:outline-none focus:ring-0"
            value={selectedCategory}
            onFocus={() => setCategoryFocus(true)}
            onBlur={() => setCategoryFocus(false)}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory('');
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {/* Rotating Arrow */}
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${
              categoryFocus ? 'rotate-180' : ''
            }`}
          >
            ˅
          </span>
        </div>

        {/* Subcategory Dropdown with Rotating Arrow */}
        {(selectedCategory ? currentSubs.length > 0 : allSubcategories.length > 0) && (
          <div className="relative w-full md:w-1/3">
            <select
              className="border border-gray-300 px-4 py-2 pr-10 rounded w-full appearance-none focus:outline-none focus:ring-0"
              value={selectedSubcategory}
              onFocus={() => setSubcategoryFocus(true)}
              onBlur={() => setSubcategoryFocus(false)}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              <option value="">All Subcategories</option>
              {(selectedCategory ? currentSubs : allSubcategories).map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
            {/* Rotating Arrow */}
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${
                subcategoryFocus ? 'rotate-180' : ''
              }`}
            >
              ˅
            </span>
          </div>
        )}
      </div>

      {/* Result Label */}
      {(selectedCategory || selectedSubcategory) && (
        <h3 className="text-lg font-semibold mb-4">
          Showing: {selectedCategory && <span className="text-blue-600">{selectedCategory}</span>}
          {selectedSubcategory && <> › <span className="text-green-600">{selectedSubcategory}</span></>}
        </h3>
      )}

      {/* Product Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No matching products</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.originalPrice}
              discount={item.discountPercent}
              image={item.image}
              rating={item.rating}
              isAdmin={true} // 👈 Admin mode (hide heart)
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
