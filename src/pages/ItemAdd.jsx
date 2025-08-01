import React, { useState, useEffect } from "react";
import {
  FaTag,
  FaRupeeSign,
  FaPercent,
  FaStar,
  FaCoins,
  FaImage,
  FaPen,
} from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import useProductStore from "../data/stores/ProductStore";

const ItemAdd = () => {
  const {
    addProduct,
    loading,
    categories,
    fetchCategories,
    addCategory,
    addSubcategory,
    editCategory,
    deleteCategory,
    editSubcategory,
    deleteSubcategory,
  } = useProductStore();

  const [items, setItems] = useState([
    {
      name: "",
      originalPrice: "",
      discountedPrice: "",
      discountPercent: "",
      rating: "",
      rcCoins: "",
      category: "",
      subcategory: "",
      image: "",
      imageFile: null,
      description: "",
      isAddingCategory: false,
      newCategory: "",
      isAddingSubcategory: false,
      newSubcategory: "",
    },
  ]);

  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(null);

  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [subcategoryDropdownOpen, setSubcategoryDropdownOpen] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

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
    setItems((prev) => [
      ...prev,
      {
        name: "",
        originalPrice: "",
        discountedPrice: "",
        discountPercent: "",
        rating: "",
        rcCoins: "",
        category: "",
        subcategory: "",
        image: "",
        imageFile: null,
        description: "",
        isAddingCategory: false,
        newCategory: "",
        isAddingSubcategory: false,
        newSubcategory: "",
      },
    ]);
  };

  const handleDeleteForm = (index) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveNewCategory = async (index) => {
    setActionLoading(true);
    const updated = [...items];
    const newCat = updated[index].newCategory.trim();
    if (newCat && !categories.find((c) => c.name === newCat)) {
      await addCategory(newCat);
    }
    updated[index].category = newCat;
    updated[index].newCategory = "";
    updated[index].isAddingCategory = false;
    setItems(updated);
    setActionLoading(false);
  };

  const handleSaveNewSubcategory = async (index) => {
    setActionLoading(true);
    const updated = [...items];
    const newSub = updated[index].newSubcategory.trim();
    if (newSub) {
      await addSubcategory(updated[index].category, newSub);
      updated[index].subcategory = newSub;
      updated[index].newSubcategory = "";
      updated[index].isAddingSubcategory = false;
      setItems(updated);
    }
    setActionLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      await addProduct(...items);
      alert("Product(s) added successfully!");
      setItems([
        {
          name: "",
          originalPrice: "",
          discountedPrice: "",
          discountPercent: "",
          rating: "",
          rcCoins: "",
          category: "",
          subcategory: "",
          image: "",
          imageFile: null,
          description: "",
          isAddingCategory: false,
          newCategory: "",
          isAddingSubcategory: false,
          newSubcategory: "",
        },
      ]);
    } catch {
      alert("Error adding product");
    }
    setSubmitLoading(false);
  };

  return (
    <div className="p-6 pt-24 max-w-4xl mx-auto bg-white rounded shadow mt-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Products</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative p-6 border border-gray-300 rounded bg-white"
          >
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
                  onChange={(e) => handleChange(index, e)}
                  className="pl-10 border border-gray-300 px-3 py-2 rounded w-full"
                />
              </div>

              {/* Category Selector */}
              <div className="flex items-center gap-2 relative">
                {item.isAddingCategory ? (
                  <>
                    <input
                      type="text"
                      name="newCategory"
                      placeholder="New Category"
                      value={item.newCategory}
                      onChange={(e) => handleChange(index, e)}
                      className="flex-1 border border-gray-300 px-3 py-2 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveNewCategory(index)}
                      disabled={actionLoading}
                      className="px-3 py-2 bg-green-500 text-white rounded"
                    >
                      {actionLoading ? "Saving..." : "Save"}
                    </button>
                  </>
                ) : (
                  <>
                    <select
                      name="category"
                      value={item.category}
                      onChange={(e) => handleChange(index, e)}
                      className="flex-1 border border-gray-300 px-3 py-2 rounded"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat, i) => (
                        <option key={i} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>

                    {item.category && (
                      <div className="relative">
                        <button
                          type="button"
                          className="px-3 py-2 bg-gray-200 border border-gray-300 rounded"
                          onClick={() =>
                            setCategoryDropdownOpen(
                              categoryDropdownOpen === index ? null : index
                            )
                          }
                        >
                          ⋮
                        </button>
                        {categoryDropdownOpen === index && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCategory(item.category);
                                setNewCategoryName(item.category);
                                setCategoryDropdownOpen(null);
                              }}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
                            >
                              <FiEdit2 className="text-blue-500" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={async () => {
                                setActionLoading(true);
                                await deleteCategory(item.category);
                                setActionLoading(false);
                                setCategoryDropdownOpen(null);
                              }}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
                            >
                              {actionLoading ? "Deleting..." : <FiTrash2 className="text-red-500" />}
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const upd = [...items];
                        upd[index].isAddingCategory = true;
                        setItems(upd);
                      }}
                      className="px-3 py-2 bg-gray-200 border border-gray-300 rounded"
                    >
                      + Add Category
                    </button>
                  </>
                )}
              </div>

              {/* Edit Category */}
              {editingCategory && (
                <div className="flex gap-2 col-span-full">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 border border-gray-300 px-3 py-2 rounded"
                  />
                  <button
                    type="button"
                    className="bg-green-500 text-white px-3 py-2 rounded"
                    onClick={async () => {
                      setActionLoading(true);
                      await editCategory(editingCategory, newCategoryName);
                      setActionLoading(false);
                      setEditingCategory(null);
                      setNewCategoryName("");
                    }}
                  >
                    {actionLoading ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 px-3 py-2 rounded"
                    onClick={() => setEditingCategory(null)}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Subcategory Selector */}
              {item.category && (
                <div className="flex items-center gap-2">
                  <select
                    name="subcategory"
                    value={item.subcategory}
                    onChange={(e) => handleChange(index, e)}
                    className="flex-1 border border-gray-300 px-3 py-2 rounded"
                  >
                    <option value="">Select Subcategory</option>
                    {(categories.find((c) => c.name === item.category)?.subcategories || []).map(
                      (subcat, i) => (
                        <option key={i} value={subcat}>
                          {subcat}
                        </option>
                      )
                    )}
                  </select>

                  {item.subcategory && (
                    <div className="relative">
                      <button
                        type="button"
                        className="px-3 py-2 bg-gray-200 border border-gray-300 rounded"
                        onClick={() =>
                          setSubcategoryDropdownOpen(
                            subcategoryDropdownOpen === index ? null : index
                          )
                        }
                      >
                        ⋮
                      </button>
                      {subcategoryDropdownOpen === index && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-lg z-10">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingSubcategory({
                                category: item.category,
                                subcategory: item.subcategory,
                              });
                              setNewSubcategoryName(item.subcategory);
                              setSubcategoryDropdownOpen(null);
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            <FiEdit2 className="text-blue-500" /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              setActionLoading(true);
                              await deleteSubcategory(item.category, item.subcategory);
                              setActionLoading(false);
                              setSubcategoryDropdownOpen(null);
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            {actionLoading ? "Deleting..." : <FiTrash2 className="text-red-500" />}
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const upd = [...items];
                      upd[index].isAddingSubcategory = true;
                      setItems(upd);
                    }}
                    className="px-3 py-2 bg-gray-200 border border-gray-300 rounded"
                  >
                    + Add Subcategory
                  </button>
                </div>
              )}

              {/* Edit Subcategory */}
              {editingSubcategory && (
                <div className="flex gap-2 col-span-full">
                  <input
                    type="text"
                    value={newSubcategoryName}
                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                    className="flex-1 border border-gray-300 px-3 py-2 rounded"
                  />
                  <button
                    type="button"
                    className="bg-green-500 text-white px-3 py-2 rounded"
                    onClick={async () => {
                      setActionLoading(true);
                      await editSubcategory(
                        editingSubcategory.category,
                        editingSubcategory.subcategory,
                        newSubcategoryName
                      );
                      setActionLoading(false);
                      setEditingSubcategory(null);
                      setNewSubcategoryName("");
                    }}
                  >
                    {actionLoading ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 px-3 py-2 rounded"
                    onClick={() => setEditingSubcategory(null)}
                  >
                    Cancel
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
                    onChange={(e) => handleChange(index, e)}
                    className="flex-1 border border-gray-300 px-3 py-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveNewSubcategory(index)}
                    disabled={actionLoading}
                    className="px-3 py-2 bg-green-500 text-white rounded"
                  >
                    {actionLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              )}

              {/* Pricing Fields */}
              {[
                { name: "originalPrice", icon: <FaRupeeSign /> },
                { name: "discountedPrice", icon: <FaRupeeSign /> },
                { name: "discountPercent", icon: <FaPercent /> },
                { name: "rating", icon: <FaStar /> },
                { name: "rcCoins", icon: <FaCoins /> },
              ].map(({ name, icon }) => (
                <div key={name} className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    {icon}
                  </span>
                  <input
                    type="number"
                    name={name}
                    placeholder={name.replace(/([A-Z])/g, " $1")}
                    value={item[name]}
                    onChange={(e) => handleChange(index, e)}
                    className="pl-10 border border-gray-300 px-3 py-2 rounded w-full"
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
                  onChange={(e) => handleChange(index, e)}
                  className="pl-10 border border-gray-300 px-3 py-2 rounded w-full"
                />
              </div>

              {/* File Upload */}
              <div className="col-span-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  className="border border-gray-300 px-3 py-2 rounded"
                />
                {item.image && (
                  <img
                    src={item.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover border border-gray-300 rounded"
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
                  onChange={(e) => handleChange(index, e)}
                  rows="3"
                  className="pl-10 border border-gray-300 px-3 py-2 rounded w-full"
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
            disabled={submitLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {submitLoading ? "Submitting..." : "Submit All"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemAdd;
