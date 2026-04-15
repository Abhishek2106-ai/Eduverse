import React, { useEffect, useState } from "react";
import { getBadges } from "../../utils/badges";

const Badges = () => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const xp = parseInt(localStorage.getItem("xp")) || 0;
    setBadges(getBadges(xp));
  }, []);

  return (
    <div className="text-white text-xs flex gap-2">
      {badges.map((badge, index) => (
        <span key={index} className="bg-yellow-500 text-black px-2 py-1 rounded">
          {badge}
        </span>
      ))}
    </div>
  );
};

export default Badges;