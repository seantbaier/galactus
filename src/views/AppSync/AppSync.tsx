import { Outlet } from "react-router-dom"

function AppSync() {
  return (
    <div className="w-full">
      <div className="mb-4 w-full">
        <h1 className="text-xl mb-4">AppSync</h1>
        <Outlet />
      </div>
    </div>
  )
}

export default AppSync
