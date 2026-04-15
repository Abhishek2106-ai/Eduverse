import React, { useEffect, useState } from "react";

const SavedCourses = () => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("savedCourse");
    if (saved) {
      setCourse(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl mb-4">⭐ Saved Course</h1>

      {course ? (
        <div className="border p-4 rounded">
          <img src={course.thumbnail} alt="" className="w-60 mb-3" />
          <h2>{course.courseName}</h2>
          <p>Rs. {course.price}</p>
        </div>
      ) : (
        <p>No saved course</p>
      )}
    </div>
  );
};

export default SavedCourses;