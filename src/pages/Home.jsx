// Icons Import
import { FaArrowRight } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { TypeAnimation } from "react-type-animation";
import ParticlesBg from "../components/common/ParticlesBg";

// Image and Video Import
import Banner from "../assets/Images/banner.mp4"

// Component Imports
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import HighlightText from "../components/core/HomePage/HighlightText"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/TimelineSection"
import AIChat from "../components/common/AIChat";

function Home() {

  // ✅ FIX: moved inside component
  const navigate = useNavigate();
  const lastCourse = localStorage.getItem("lastCourse");

  return (
    <>
      <ParticlesBg />
      <div className="relative z-10">

        {/* Section 1 */}
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">

          {/* Become Instructor */}
          <Link to={"/signup"}>
            <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 transition-all hover:scale-95">
              <div className="flex items-center gap-2 px-10 py-1 group-hover:bg-richblack-900 rounded-full">
                Become an Instructor <FaArrowRight />
              </div>
            </div>
          </Link>

          {/* ORIGINAL HEADING */}
          <div className="text-center text-4xl font-semibold">
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
          </div>

          {/* 🔥 TYPING ANIMATION */}
          <TypeAnimation
            sequence={[
              "Learn Development 💻",
              2000,
              "Master Cybersecurity 🔐",
              2000,
              "Build Real Projects 🚀",
              2000,
            ]}
            repeat={Infinity}
            className="text-xl mt-4 text-yellow-400"
          />

          {/* ORIGINAL SUBHEADING */}
          <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
            With our online coding courses, you can learn at your own pace,
            anywhere, with projects, quizzes, and expert guidance.
          </div>

          {/* 🔥 NEW: RESUME BUTTON (ADDED ONLY) */}
          {lastCourse && (
            <button
              onClick={() => navigate(`/courses/${lastCourse}`)}
              className="bg-blue-500 px-4 py-2 rounded mt-2 hover:scale-105 transition"
            >
              🔥 Resume Last Course
            </button>
          )}

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-7">
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>

            <AIChat />
          </div>

          {/* Video */}
          <div className="mx-3 my-7 shadow-xl shadow-blue-200">
            <video muted loop autoPlay>
              <source src={Banner} type="video/mp4" />
            </video>
          </div>

          {/* Code Section 1 */}
          <CodeBlocks
position={"flex-col lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} />
              </div>
            }
            subheading={"Learn by building real-world applications."}
            ctabtn1={{ btnText: "Try it Yourself", link: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
            codeColor={"text-yellow-25"}
            codeblock={`<h1>Welcome to Eduverse 🚀</h1>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />

          {/* Code Section 2 */}
          <CodeBlocks
position={"flex-col lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighlightText text={"coding instantly"} />
              </div>
            }
            subheading={"Hands-on learning from day one."}
            ctabtn1={{ btnText: "Continue Lesson", link: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
            codeColor={"text-white"}
            codeblock={`console.log("Eduverse 🚀")`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />

          <ExploreMore />

        </div>

        {/* Section 2 */}
        <div className="bg-pure-greys-5 text-richblack-700">
           {/* WHY EDUVERSE */}

<div className="mt-16 text-center">
  <h2 className="text-3xl font-bold mb-6 text-yellow-500">
    Why Eduverse? 🚀
  </h2>

  <div className="grid md:grid-cols-3 gap-6 px-5">
    <div className="p-5 bg-white rounded-lg hover:scale-105 transition shadow-md border border-gray-200">
      💻 Build real-world projects
    </div>

    <div className="p-5 bg-white rounded-lg hover:scale-105 transition shadow-md border border-gray-200">
      🔐 Learn Cybersecurity + Development
    </div>

    <div className="p-5 bg-white rounded-lg hover:scale-105 transition shadow-md border border-gray-200">
      ⚡ Fast, interactive UI learning
    </div>
  </div>
</div>

          <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-8">

            <div className="flex flex-col lg:flex-row gap-7">
             <div className="text-4xl font-semibold text-center my-10">
            Get skills for a
            <HighlightText text={"job that is in demand"} />
              </div>

              
            </div>

            <TimelineSection />
            <LearningLanguageSection />
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="mt-20 text-center text-white">
          <h2 className="text-3xl font-bold mb-6 text-yellow-500">
            What Students Say 💬
          </h2>

          <div className="grid md:grid-cols-2 gap-6 w-11/12 mx-auto">
            <div className="p-5 bg-richblack-800 rounded-lg shadow-lg">
              "Best platform to learn coding!" ⭐⭐⭐⭐⭐
            </div>

            <div className="p-5 bg-richblack-800 rounded-lg shadow-lg">
              "Loved the UI and projects!" 🚀
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="my-20 flex flex-col items-center gap-8 bg-richblack-900 text-white">
          <InstructorSection />

          <h1 className="text-4xl font-semibold mt-8">
            Reviews from learners
          </h1>

          <ReviewSlider />
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home