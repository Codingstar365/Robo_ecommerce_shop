import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // ✅ Your Firebase config
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";

const AdminUserSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSnapshots, setPageSnapshots] = useState([]); // ✅ Store first doc of each page
  const [hasMore, setHasMore] = useState(true);

  const USERS_PER_PAGE = 15;

  // ✅ Fetch users by page
  const fetchUsers = async (pageNum) => {
    try {
      setLoading(true);
      let q;

      if (pageNum === 1) {
        // First page
        q = query(collection(db, "users"), orderBy("name"), limit(USERS_PER_PAGE));
      } else {
        // Start after last doc of previous page
        q = query(
          collection(db, "users"),
          orderBy("name"),
          startAfter(pageSnapshots[pageNum - 2]),
          limit(USERS_PER_PAGE)
        );
      }

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const fetchedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(fetchedUsers);

        // ✅ Save the last doc of this page for navigation
        const newSnapshots = [...pageSnapshots];
        newSnapshots[pageNum - 1] = snapshot.docs[snapshot.docs.length - 1];
        setPageSnapshots(newSnapshots);

        setHasMore(snapshot.docs.length === USERS_PER_PAGE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleNext = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchUsers(nextPage);
    }
  };

  const handleBack = async () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);

      if (prevPage === 1) {
        fetchUsers(1);
      } else {
        const snapshot = await getDocs(
          query(
            collection(db, "users"),
            orderBy("name"),
            startAfter(pageSnapshots[prevPage - 2]),
            limit(USERS_PER_PAGE)
          )
        );
        setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setHasMore(snapshot.docs.length === USERS_PER_PAGE);
      }
    }
  };

  return (
    <div className="p-6 pt-24 max-w-6xl mx-auto bg-white rounded shadow">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Registered Users</h2>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* User Table */}
      {!loading && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{idx + 1 + (page - 1) * USERS_PER_PAGE}</td>
                  <td className="p-3 border">{user.name || "N/A"}</td>
                  <td className="p-3 border">{user.email || "N/A"}</td>
                  <td className="p-3 border">{user.address || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Users */}
      {!loading && users.length === 0 && (
        <p className="text-gray-500 text-center">No registered users found.</p>
      )}

      {/* Pagination Buttons */}
      {!loading && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleBack}
            disabled={page === 1}
            className={`px-6 py-2 rounded ${
              page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!hasMore}
            className={`px-6 py-2 rounded ${
              !hasMore ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUserSection;
