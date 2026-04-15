import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

import { FaStar } from "react-icons/fa"
import { FreeMode, Pagination, Autoplay } from "swiper/modules"

import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("Fetching reviews from:", ratingsEndpoints.REVIEWS_DETAILS_API)

        const res = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )

        console.log("Review API response:", res)

        if (res?.data?.success) {
          setReviews(res.data.data)
        } else {
          setReviews([]) // fallback
        }
      } catch (error) {
        console.log("❌ Review API failed:", error.message)
        setReviews([]) // prevent crash
      }
    }

    fetchReviews()
  }, [])

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">

        {reviews.length === 0 ? (
          <p className="text-center text-gray-400">
            No reviews available 🚫
          </p>
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={25}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="w-full"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 rounded-lg">

                  {/* USER */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image ||
                        `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="user"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div>
                      <h1 className="font-semibold text-richblack-5">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </h1>
                      <p className="text-xs text-richblack-400">
                        {review?.course?.courseName}
                      </p>
                    </div>
                  </div>

                  {/* REVIEW TEXT */}
                  <p className="text-sm">
                    {review?.review?.split(" ").length > truncateWords
                      ? review.review.split(" ").slice(0, truncateWords).join(" ") + "..."
                      : review?.review}
                  </p>

                  {/* RATING */}
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-100 font-bold">
                      {review?.rating?.toFixed(1)}
                    </span>

                    <ReactStars
                      count={5}
                      value={review?.rating}
                      size={18}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </div>
  )
}

export default ReviewSlider