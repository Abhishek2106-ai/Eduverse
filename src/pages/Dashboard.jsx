import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Analytics from "../components/core/Dashboard/Analytics";
import Sidebar from "../components/core/Dashboard/Sidebar"
import ProgressBar from "@ramonak/react-progress-bar";
function Dashboard() {
  <h2 className="text-xl font-bold mt-4">
  🔥 5 Day Learning Streak
</h2>
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  
  <ProgressBar
  completed={60}
  bgColor="#FFD60A"
  height="10px"
  isLabelVisible={true}
/>

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
      <Analytics />
    </div>
  )
}

export default Dashboard