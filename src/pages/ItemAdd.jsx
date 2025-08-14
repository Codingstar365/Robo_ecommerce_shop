import React, { useState, useEffect } from "react";
import {
  FaTag,
  FaRupeeSign,
  FaPercent,
  FaStar,
  FaCoins,
  FaImage,
  FaPen,
  FaChevronDown
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
    console.log(file, "this is file selected");
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
  console.log("From add items of admin1",items.image);
  console.log("From add items of admin2",items.imageFile);
    // ✅ Validation to ensure all fields are filled
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      console.log("from loop")
      console.log("dskfjsldfjsldf", item.imageFile)
      console.log(item.image)
      if (
        !item.name ||
        !item.originalPrice ||
        !item.discountedPrice ||
        !item.discountPercent ||
        !item.rating ||
        !item.rcCoins ||
        !item.category ||
        !item.subcategory ||
        (!item.image && !item.imageFile) ||
        !item.description
      ) {
        alert(`Please fill all fields for Product ${i + 1}`);
        return;
      }
    }

    try {
      setSubmitLoading(true);
      // const itemsWithoutFile = items.map(({ imageFile, ...rest }) => rest);
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

              {/* Category Selector + Add Button */}
              <div className="flex items-center gap-2 relative">
                <div className="relative flex-1">
                  <select
                    name="category"
                    value={item.category}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border border-gray-300 px-3 py-2 rounded appearance-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, i) => (
                      <option key={i} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>

                {/* Add Category Button */}
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

                {/* Edit Category Button */}
                <button
                  type="button"
                  onClick={() => {
                    const currentCat = item.category;
                    if (!currentCat) {
                      alert("Select a category to edit");
                      return;
                    }
                    const newName = prompt("Edit category name", currentCat);
                    if (newName && newName.trim()) {
                      editCategory(currentCat, newName.trim());
                    }
                  }}
                  className="text-blue-500"
                >
                  <FiEdit2 />
                </button>

                {/* Delete Category Button */}
                <button
                  type="button"
                  onClick={() => {
                    const currentCat = item.category;
                    if (!currentCat) {
                      alert("Select a category to delete");
                      return;
                    }
                    if (window.confirm(`Delete category "${currentCat}"?`)) {
                      deleteCategory(currentCat);
                      const updated = [...items];
                      updated[index].category = "";
                      setItems(updated);
                    }
                  }}
                  className="text-red-500"
                >
                  <FiTrash2 />
                </button>
              </div>

              {/* New Category Input */}
              {item.isAddingCategory && (
                <div className="flex items-center gap-2 col-span-full mt-2">
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
                </div>
              )}

              {/* Subcategory Selector */}
              {item.category && (
                <>
                  <div className="flex items-center gap-2">
                    <select
                      name="subcategory"
                      value={item.subcategory}
                      onChange={(e) => handleChange(index, e)}
                      className="flex-1 border border-gray-300 px-3 py-2 rounded"
                    >
                      <option value="">Select Subcategory</option>
                      {(categories.find((c) => c.name === item.category)
                        ?.subcategories || []
                      ).map((subcat, i) => (
                        <option key={i} value={subcat}>
                          {subcat}
                        </option>
                      ))}
                    </select>

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

                  {/* Edit/Delete Subcategory List */}
                  <div className="flex flex-col gap-1 col-span-full mt-2">
                    {(categories.find((c) => c.name === item.category)
                      ?.subcategories || []
                    ).map((subcat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span>{subcat}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newName = prompt(
                              "Edit subcategory name",
                              subcat
                            );
                            if (newName && newName.trim()) {
                              editSubcategory(
                                item.category,
                                subcat,
                                newName.trim()
                              );
                            }
                          }}
                          className="text-blue-500"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm("Delete this subcategory?")) {
                              deleteSubcategory(item.category, subcat);
                            }
                          }}
                          className="text-red-500"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
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
