import React, { useEffect, useState } from "react";

const XPBar = () => {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const storedXP = localStorage.getItem("xp") || 0;
    setXp(parseInt(storedXP));
  }, []);

  const level = Math.floor(xp / 100) + 1;

  return (
    <div className="text-white text-sm">
      ⭐ XP: {xp} | 🏆 Level: {level}
    </div>
  );
};

export default XPBar;