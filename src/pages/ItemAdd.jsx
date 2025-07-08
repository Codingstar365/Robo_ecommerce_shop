import React, { useState, useEffect } from 'react';
import {
  FaTag,
  FaRupeeSign,
  FaPercent,
  FaStar,
  FaCoins,
  FaImage,
  FaPen,
} from 'react-icons/fa';
import useProductStore from '../data/stores/ProductStore';

const ItemAdd = () => {
  const {
    addProduct,
    loading,
    categories,
    fetchCategories,
    addCategory,
    addSubcategory,
  } = useProductStore();

  const [items, setItems] = useState([
    {
      name: '',
      originalPrice: '',
      discountedPrice: '',
      discountPercent: '',
      rating: '',
      rcCoins: '',
      category: '',
      subcategory: '',
      image: '',
      imageFile: null,
      description: '',
      isAddingCategory: false,
      newCategory: '',
      isAddingSubcategory: false,
      newSubcategory: '',
    },
  ]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (index, e) => {
    const updated = [...items];
    updated[index][e.target.name] = e.target.value;
    setItems(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...items];
    updated[index].imageFile = file;
    updated[index].image = URL.createObjectURL(file);
    setItems(updated);
  };

  const handleAddForm = () => {
    setItems(prev => [
      ...prev,
      {
        name: '',
        originalPrice: '',
        discountedPrice: '',
        discountPercent: '',
        rating: '',
        rcCoins: '',
        category: '',
        subcategory: '',
        image: '',
        imageFile: null,
        description: '',
        isAddingCategory: false,
        newCategory: '',
        isAddingSubcategory: false,
        newSubcategory: '',
      },
    ]);
  };

  const handleDeleteForm = index => {
    if (items.length === 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveNewCategory = async index => {
    const updated = [...items];
    const newCat = updated[index].newCategory.trim();
    if (newCat && !categories.find(c => c.name === newCat)) {
      await addCategory(newCat);
    }
    updated[index].category = newCat;
    updated[index].newCategory = '';
    updated[index].isAddingCategory = false;
    setItems(updated);
  };

  const handleSaveNewSubcategory = async index => {
    const updated = [...items];
    const newSub = updated[index].newSubcategory.trim();
    if (newSub) {
      await addSubcategory(updated[index].category, newSub);
      updated[index].subcategory = newSub;
      updated[index].newSubcategory = '';
      updated[index].isAddingSubcategory = false;
      setItems(updated);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addProduct(...items); // If you're using image upload, handle it separately
      alert('Product(s) added successfully!');
      setItems([
        {
          name: '',
          originalPrice: '',
          discountedPrice: '',
          discountPercent: '',
          rating: '',
          rcCoins: '',
          category: '',
          subcategory: '',
          image: '',
          imageFile: null,
          description: '',
          isAddingCategory: false,
          newCategory: '',
          isAddingSubcategory: false,
          newSubcategory: '',
        },
      ]);
    } catch {
      alert('Error adding product');
    }
  };

  return (
    <div className="p-6 pt-24 max-w-4xl mx-auto bg-white rounded shadow mt-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Products</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {items.map((item, index) => (
          <div key={index} className="relative p-6 border rounded shadow-md bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Product {index + 1}</h3>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteForm(index)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="relative">
                <FaTag className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={item.name}
                  onChange={e => handleChange(index, e)}
                  className="pl-10 border px-3 py-2 rounded w-full"
                />
              </div>

              {/* Category Selector */}
              <div className="flex items-center gap-2">
                {item.isAddingCategory ? (
                  <>
                    <input
                      type="text"
                      name="newCategory"
                      placeholder="New Category"
                      value={item.newCategory}
                      onChange={e => handleChange(index, e)}
                      className="flex-1 border px-3 py-2 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveNewCategory(index)}
                      className="px-3 py-2 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <select
                      name="category"
                      value={item.category}
                      onChange={e => handleChange(index, e)}
                      className="flex-1 border px-3 py-2 rounded"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat, i) => (
                        <option key={i} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const upd = [...items];
                        upd[index].isAddingCategory = true;
                        setItems(upd);
                      }}
                      className="px-3 py-2 bg-gray-200 border rounded"
                    >
                      + Add Category
                    </button>
                  </>
                )}
              </div>

              {/* Subcategory Dropdown */}
              {item.category && (
                <div className="flex items-center gap-2">
                  <select
                    name="subcategory"
                    value={item.subcategory}
                    onChange={e => handleChange(index, e)}
                    className="flex-1 border px-3 py-2 rounded"
                  >
                    <option value="">Select Subcategory</option>
                    {(categories.find(c => c.name === item.category)?.subcategories || []).map(
                      (subcat, i) => (
                        <option key={i} value={subcat}>
                          {subcat}
                        </option>
                      )
                    )}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      const upd = [...items];
                      upd[index].isAddingSubcategory = true;
                      setItems(upd);
                    }}
                    className="px-3 py-2 bg-gray-200 border rounded"
                  >
                    + Add Subcategory
                  </button>
                </div>
              )}

              {/* New Subcategory Input */}
              {item.isAddingSubcategory && (
                <div className="flex items-center gap-2 col-span-full mt-2">
                  <input
                    type="text"
                    name="newSubcategory"
                    placeholder="New Subcategory"
                    value={item.newSubcategory}
                    onChange={e => handleChange(index, e)}
                    className="flex-1 border px-3 py-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveNewSubcategory(index)}
                    className="px-3 py-2 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              )}

              {/* Pricing Fields */}
              {[{ name: 'originalPrice', icon: <FaRupeeSign /> },
                { name: 'discountedPrice', icon: <FaRupeeSign /> },
                { name: 'discountPercent', icon: <FaPercent /> },
                { name: 'rating', icon: <FaStar /> },
                { name: 'rcCoins', icon: <FaCoins /> }].map(({ name, icon }) => (
                  <div key={name} className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
                    <input
                      type="number"
                      name={name}
                      placeholder={name.replace(/([A-Z])/g, ' $1')}
                      value={item[name]}
                      onChange={e => handleChange(index, e)}
                      className="pl-10 border px-3 py-2 rounded w-full"
                    />
                  </div>
              ))}

              {/* Image URL */}
              <div className="relative">
                <FaImage className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="image"
                  placeholder="Paste image URL"
                  value={item.image}
                  onChange={e => handleChange(index, e)}
                  className="pl-10 border px-3 py-2 rounded w-full"
                />
              </div>

              {/* File Upload */}
              <div className="col-span-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(index, e.target.files[0])}
                  className="border px-3 py-2 rounded"
                />
                {item.image && (
                  <img
                    src={item.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover border rounded"
                  />
                )}
              </div>

              {/* Description */}
              <div className="relative col-span-full mt-4">
                <FaPen className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={e => handleChange(index, e)}
                  rows="3"
                  className="pl-10 border px-3 py-2 rounded w-full"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddForm}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            + Add Another Product
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Submitting...' : 'Submit All'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemAdd;
