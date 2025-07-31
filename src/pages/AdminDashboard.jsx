import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // ✅ Ensure firebase.js exports db

const AdminDashboard = () => {
  // ✅ State for Orders, Products, Users, Revenue, and Sales Graph
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [sales, setSales] = useState([]); // dynamically generated from Firestore

  // ✅ Stats (Updated dynamically from Firestore)
  const stats = [
    { title: "Total Orders", value: totalOrders.toString(), color: "bg-blue-500" },
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "bg-green-500" },
    { title: "Total Products", value: totalProducts.toString(), color: "bg-yellow-500" },
    { title: "Total Users", value: totalUsers.toString(), color: "bg-pink-500" },
  ];

  // ✅ Top Products (Dummy)
  const products = [
    { name: "iPhone 15 Pro", sold: 120 },
    { name: "Samsung S24 Ultra", sold: 95 },
    { name: "Sony WH-1000XM5", sold: 80 },
  ];

  // ✅ Fetch Orders, Products, Users, Revenue from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
        setTotalOrders(snapshot.size);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        setTotalProducts(snapshot.size);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        setTotalUsers(snapshot.size);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchRevenue = async () => {
      try {
        const revenueRef = doc(db, "revenue", "totalRevenue");
        const revenueSnap = await getDoc(revenueRef);
        if (revenueSnap.exists()) {
          setTotalRevenue(revenueSnap.data().totalAmount || 0);
        }
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    };

    // ✅ Fetch Monthly Sales Data from orderHistory
    const fetchSalesFromOrderHistory = async () => {
      try {
        const snapshot = await getDocs(collection(db, "orderHistory"));
        const monthlyTotals = {};

        // Fill all 12 months with 0 initially
        const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        allMonths.forEach((m) => (monthlyTotals[m] = 0));

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();

          if (data.createdAt && data.totalAmount) {
            // 🔹 FIX: Convert Firestore Timestamp to JS Date
            const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
            if (!isNaN(date.getTime())) {
              const monthName = date.toLocaleString("default", { month: "short" });
              monthlyTotals[monthName] += data.totalAmount || 0;
            }
          }
        });

        // Convert to array for chart in correct month order
        const salesArray = allMonths.map((month) => ({
          month,
          value: monthlyTotals[month],
        }));

        setSales(salesArray);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchOrders();
    fetchProducts();
    fetchUsers();
    fetchRevenue();
    fetchSalesFromOrderHistory();
  }, []);

  // ✅ Ensure tallest month is 100% height
  const maxValue = sales.length > 0 ? Math.max(...sales.map((s) => s.value)) || 1 : 1;
  const nonZeroMonths = sales.filter((s) => s.value > 0).length;

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen pt-20 mt-15">
      {/* 📊 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg text-white shadow ${stat.color}`}
          >
            <p className="text-sm">{stat.title}</p>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* 📈 Sales Chart */}
      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Sales Overview</h3>
        <div className="flex items-end gap-4 h-48">
          {sales.map((item, idx) => {
            let heightPercent;
            if (nonZeroMonths === 1 && item.value > 0) {
              heightPercent = 100; // Full height if only one month has sales
            } else {
              heightPercent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
            }
            const finalHeight = heightPercent > 0 && heightPercent < 5 ? 5 : heightPercent; // min 5% visible
            return (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-blue-500 rounded-t transition-all"
                  style={{
                    height: `${finalHeight}%`,
                  }}
                ></div>
                <span className="text-sm mt-1">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 📦 Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <ul>
            {products.map((p, idx) => (
              <li
                key={idx}
                className="flex justify-between py-2 border-b last:border-none"
              >
                <span>{p.name}</span>
                <span className="font-semibold">{p.sold} Sold</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
