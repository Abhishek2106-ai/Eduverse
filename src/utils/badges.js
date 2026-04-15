export const getBadges = (xp) => {
  const badges = [];

  if (xp >= 10) badges.push("🔥 Beginner");
  if (xp >= 50) badges.push("⚡ Learner");
  if (xp >= 100) badges.push("🏆 Pro");
  if (xp >= 200) badges.push("👑 Master");

  return badges;
};