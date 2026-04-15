import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* PROFILE CARD */}
      <div className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt="profile"
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>

        <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")}>
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* 🎮 GAMIFICATION SECTION */}
      <div className="my-10 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-xl font-semibold text-yellow-300">
          🎮 Your Learning Progress
        </h2>

        <div className="mt-4 space-y-2">
          <p className="text-richblack-5">XP: {user?.xp || 0}</p>
          <p className="text-richblack-5">
            Level: {user?.level || "Beginner"}
          </p>

          <div>
            <p className="text-richblack-5">Badges:</p>

            <div className="flex gap-2 mt-2 flex-wrap">
              {user?.badges?.length > 0 ? (
                user.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="bg-yellow-400 text-black px-2 py-1 rounded text-sm"
                  >
                    {badge}
                  </span>
                ))
              ) : (
                <span className="text-richblack-400">
                  No badges yet 🚀
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="my-10 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")}>
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p className="mt-2 text-sm text-richblack-300">
          {user?.additionalDetails?.about || "Write Something About Yourself"}
        </p>
      </div>

      {/* PERSONAL DETAILS */}
      <div className="my-10 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")}>
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex justify-between mt-6 max-w-[500px]">
          <div>
            <p className="text-sm text-richblack-600">First Name</p>
            <p className="text-richblack-5">{user?.firstName}</p>

            <p className="text-sm text-richblack-600 mt-3">Email</p>
            <p className="text-richblack-5">{user?.email}</p>

            <p className="text-sm text-richblack-600 mt-3">Gender</p>
            <p className="text-richblack-5">
              {user?.additionalDetails?.gender || "Add Gender"}
            </p>
          </div>

          <div>
            <p className="text-sm text-richblack-600">Last Name</p>
            <p className="text-richblack-5">{user?.lastName}</p>

            <p className="text-sm text-richblack-600 mt-3">Phone</p>
            <p className="text-richblack-5">
              {user?.additionalDetails?.contactNumber || "Add Contact"}
            </p>

            <p className="text-sm text-richblack-600 mt-3">DOB</p>
            <p className="text-richblack-5">
              {formattedDate(user?.additionalDetails?.dateOfBirth) ||
                "Add DOB"}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}