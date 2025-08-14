// src/components/MyLottie.js
import React from "react";
import Lottie from "lottie-react";

const MyLottie = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Lottie
        animationData={require("../assets/myAnimation.json")} // If downloaded
        loop={true}
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default MyLottie;
