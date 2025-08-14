import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { navData } from "../constants/SubCategory";
import ItemCard from "../components/ItemCard";
import PageSidebar from "../components/PageSideBar";
import PagesBData from "../components/PagesBData";
import { CardData } from "../constants/CardConstant.jsx";

const CollectionPageSecond = () => {
  const { subcategoryRef } = useParams(); // URL param, e.g. 'arduino'
  const [subcategory, setSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [pageTitle, setPageTitle] = useState("Products");
console.log(subcategoryRef,"hhhhhhhhhhhhhh")
  useEffect(() => {
    if (!subcategoryRef) {
      setPageTitle("Products");
      setProducts(CardData);
      return;
    }

    // ✅ This time we fetch from shopByBrand
    const matchedCategory = navData.shopByBrand.find(
      (category) => category.href.replace("/", "") === subcategoryRef
    );

    if (matchedCategory) {
      setPageTitle(matchedCategory.name);
    } else {
      setPageTitle("Products");
    }

    // Search for subcategory in all brands
    let foundSubcategory = null;
    for (const category of navData.shopByBrand) {
      if (!category.subcategories) continue;

      const match = category.subcategories.find(
        (sub) => sub.href.replace("/", "") === subcategoryRef
      );

      if (match) {
        foundSubcategory = match;
        break;
      }
    }

    if (foundSubcategory) {
      setSubcategory(foundSubcategory);

      if (foundSubcategory.products && foundSubcategory.products.length > 0) {
        setProducts(foundSubcategory.products);
      } else {
        // fallback
        setProducts(CardData);
      }
    } else {
      setSubcategory(null);
      setProducts(CardData);
    }
  }, [subcategoryRef]);

  return (
    <div className="flex flex-col w-full px-2 sm:px-6 md:px-10">
      {/* Title */}
      <div className="mt-40 mb-8 border border-gray-300 rounded-lg p-4">
        <h2 className="text-center text-2xl font-bold mb-6">{pageTitle}</h2>
      </div>

      {/* Product and Sidebar */}
      <div className="border border-gray-300 rounded-lg p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[250px]">
            <PageSidebar />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5 mx-5 mb-5">
            {products.length > 0 ? (
              products.map((item, idx) => (
                <ItemCard
                  key={idx}
                  name={item.name}
                  price={item.price}
                  discount={item.discount}
                />
              ))
            ) : (
              <p className="text-center w-full">No products found in this subcategory.</p>
            )}
          </div>
        </div>
      </div>

      {/* Extra info */}
      <div className="mb-10">
        <PagesBData />
      </div>
    </div>
  );
};

export default CollectionPageSecond;
