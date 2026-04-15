import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)

  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])

  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  // ✅ NEW: COMMENTS SYSTEM
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(`comments-${course._id}`)
    if (saved) setComments(JSON.parse(saved))
  }, [course._id])

  const addComment = () => {
    if (!comment.trim()) return
    const updated = [...comments, comment]
    setComments(updated)
    localStorage.setItem(`comments-${course._id}`, JSON.stringify(updated))
    setComment("")
  }

  return (
    <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
      <div>
        <div
          className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]"
          onClick={() => handleActive(course._id)}
        >
          <div className="flex items-center gap-2">
            <i className={isActive.includes(course._id) ? "rotate-180" : "rotate-0"}>
              <AiOutlineDown />
            </i>
            <p>{course?.sectionName}</p>
          </div>

          <div className="space-x-4">
            <span className="text-yellow-25">
              {`${course.subSection.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={contentEl}
        className="relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s]"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-2 px-7 py-6 font-semibold">
          {course?.subSection?.map((subSec, i) => (
            <CourseSubSectionAccordion subSec={subSec} key={i} />
          ))}
        </div>

        {/* ✅ NEW: COMMENT UI */}
        <div className="px-7 pb-4">
          <h3 className="text-sm mb-2">💬 Comments</h3>

          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 text-black rounded"
          />

          <button
            onClick={addComment}
            className="mt-2 px-3 py-1 bg-yellow-400 text-black rounded"
          >
            Add
          </button>

          <div className="mt-2 text-xs">
            {comments.map((c, i) => (
              <p key={i}>• {c}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}