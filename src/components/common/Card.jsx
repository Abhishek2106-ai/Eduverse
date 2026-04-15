import React from "react";

const Card = ({ children }) => {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg hover:scale-105 transition-all">
      {children}
    </div>
  );
};

export default Card;