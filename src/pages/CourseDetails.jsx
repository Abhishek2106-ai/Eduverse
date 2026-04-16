
import React, { useEffect, useState, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"
import CodeEditor from "../components/common/CodeEditor";
import Discussion from "../components/core/Course/Discussion";
import Analytics from "../components/core/Dashboard/Analytics";
function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()

  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [summary, setSummary] = useState("")
  const [note, setNote] = useState("")
  const [quiz, setQuiz] = useState("")
  const [explanation, setExplanation] = useState("") // ✅ NEW

  const videoRef = useRef(null)

  // SAVE LAST COURSE
  useEffect(() => {
    localStorage.setItem("lastCourse", courseId)
  }, [courseId])

  // LOAD VIDEO TIME
  useEffect(() => {
    const savedTime = localStorage.getItem(`video-${courseId}`)
    if (savedTime && videoRef.current) {
      videoRef.current.currentTime = savedTime
    }
  }, [courseId])

  // Load notes
  useEffect(() => {
    const saved = localStorage.getItem(`notes-${courseId}`)
    if (saved) setNote(saved)
  }, [courseId])

  // Fetch course
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch {
        console.log("Error fetching course")
      }
    })()
  }, [courseId])
  

  // Avg rating
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

  // Destructure AFTER response
  const {
    courseName,
    courseDescription,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
  } = response?.data?.courseDetails || {}

  // 🤖 AI SUMMARY
  const getSummary = async () => {
    try {
      const res = await fetch("http://https://your-backend-name.onrender.com/api/v1/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Summarize this course simply: ${courseDescription}`,
        }),
      })
      const data = await res.json()
      setSummary(data.reply)
    } catch {
      console.log("AI error")
    }
  }

  // 🤖 AI QUIZ
  const generateQuiz = async () => {
    try {
      const res = await fetch("http://https://your-backend-name.onrender.com/api/v1/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Generate 3 quiz questions from: ${courseDescription}`,
        }),
      })
      const data = await res.json()
      setQuiz(data.reply)
    } catch {
      console.log("Quiz error")
    }
  }

  // 🤖 NEW: EXPLAIN COURSE
  const explainCourse = async () => {
    try {
      const res = await fetch("http://https://your-backend-name.onrender.com/api/v1/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Explain this course in simple words for a beginner: ${courseDescription}`,
        }),
      })
      const data = await res.json()
      setExplanation(data.reply)
    } catch {
      console.log("Explain error")
    }
  }

  if (loading || !response) return <div className="spinner"></div>
  if (!response.success) return <Error />

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
    } else {
      setConfirmationModal({
        text1: "Login required",
        text2: "Please login",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })
    }
  }

  return (
    <>
      {/* HERO */}
      <div className="bg-richblack-800 p-6 text-white">
        <h1 className="text-3xl">{courseName}</h1>
        <p>{courseDescription}</p>

        {/* VIDEO */}
        <video
          ref={videoRef}
          controls
          className="w-full mt-4 rounded"
          onTimeUpdate={(e) => {
            localStorage.setItem(`video-${courseId}`, e.target.currentTime)
          }}
        >
          <source src="/sample.mp4" type="video/mp4" />
        </video>

        {/* 🤖 AI BUTTONS */}
        <div className="flex gap-3 mt-3 flex-wrap">

          <button onClick={getSummary} className="bg-blue-500 px-3 py-2 rounded">
            🤖 AI Summary
          </button>

          <button onClick={generateQuiz} className="bg-green-500 px-3 py-2 rounded">
            🧠 Quiz
          </button>

          <button onClick={explainCourse} className="bg-purple-500 px-3 py-2 rounded">
            📘 Explain
          </button>

        </div>

        {/* AI OUTPUTS */}
        {summary && <div className="mt-3 p-3 bg-richblack-700 rounded">{summary}</div>}
        {quiz && <div className="mt-3 p-3 bg-richblack-700 rounded">{quiz}</div>}
        {explanation && <div className="mt-3 p-3 bg-richblack-700 rounded">{explanation}</div>}

        {/* ACTIONS */}
        <div className="flex gap-3 mt-4 flex-wrap">
          <button onClick={handleBuyCourse} className="yellowButton">Buy Now</button>

          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="bg-green-500 px-3 py-2 rounded"
          >
            ▶️ Continue
          </button>

          <button
            onClick={() => {
              localStorage.setItem("bookmarkCourse", JSON.stringify(response.data.courseDetails))
              alert("Bookmarked 🔖")
            }}
            className="bg-purple-500 px-3 py-2 rounded"
          >
            🔖 Bookmark
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="p-6 text-white">
        <p>Price: ₹{price}</p>

        <div className="flex gap-2">
          <span>{avgReviewCount}</span>
          <RatingStars Review_Count={avgReviewCount} />
          <span>({ratingAndReviews.length} reviews)</span>
        </div>

        <div className="mt-6">
          <h2 className="text-xl">What you'll learn</h2>
          <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
        </div>

        <div className="mt-6">
          <h2 className="text-xl">Course Content</h2>
          {courseContent.map((c, i) => (
            <CourseAccordionBar key={i} course={c} />
          ))}
        </div>

        {/* NOTES */}
        <div className="mt-6">
          <h2>📝 Notes</h2>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 text-black"
          />

          <button
            onClick={() => {
              localStorage.setItem(`notes-${courseId}`, note)
              alert("Saved!")
            }}
            className="bg-yellow-500 px-3 py-1 mt-2"
          >
            Save Notes
          </button>
        </div>
      </div>
<CodeEditor />
<Discussion />
      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails