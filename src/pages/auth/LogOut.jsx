import React from "react";
//import useAuthStore from "../store/useAuthStore";
import { useAuthStore } from '../../data/stores/authStore';

const LogOut = () => {
  const { logoutUser } = useAuthStore();

  return (
    <div>
      <h2>Welcome </h2>
       <button onClick={logoutUser}>Logout</button>

    </div>
  );
};
export default LogOut;
