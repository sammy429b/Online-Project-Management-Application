import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function Main() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row justify-between">
        <div className="w-full md:w-[5%] h-[10vh]">
          <Sidebar/>
        </div>
        <div className="w-full md:w-[95%] h-[90vh]">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default Main