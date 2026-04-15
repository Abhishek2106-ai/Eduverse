import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';
import Card from "../../common/Card";

const Course_Card = ({ course }) => {

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    if (course?.ratingAndReviews) {
      const count = GetAvgRating(course.ratingAndReviews);
      setAvgReviewCount(count);
    }
  }, [course]);

  return (
    <Link to={`/courses/${course._id}`}>
      <Card>

        {/* IMAGE */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={course?.thumbnail || "/default-course.jpg"}
            alt="course thumbnail"
            className="w-full h-40 object-cover transition-all duration-300 hover:scale-110"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={(e) => {
            e.preventDefault();

            // Save course
            localStorage.setItem("savedCourse", JSON.stringify(course));

            // XP system
            let xp = localStorage.getItem("xp") || 0;
            xp = parseInt(xp) + 10;
            localStorage.setItem("xp", xp);

            alert("Course Saved ⭐ +10 XP");
          }}
          className="mt-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded hover:scale-105 transition"
        >
          ⭐ Save
        </button>

        {/* CONTENT */}
        <div className="flex flex-col gap-2 px-1 py-3">

          {/* COURSE NAME */}
          <p className="text-lg font-semibold text-richblack-5 line-clamp-2">
            {course?.courseName}
          </p>

          {/* INSTRUCTOR */}
          <p className="text-sm text-richblack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>

          {/* RATING */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold">
              {avgReviewCount || 0}
            </span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400 text-sm">
              ({course?.ratingAndReviews?.length || 0})
            </span>
          </div>

          {/* PRICE */}
          <p className="text-xl font-bold text-richblack-5">
            ₹ {course?.price}
          </p>

        </div>

      </Card>
    </Link>
  )
}

export default Course_Card;