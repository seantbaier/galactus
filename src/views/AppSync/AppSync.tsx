import { Outlet } from "react-router-dom"

import { Dashboard } from "/@/components/Dashboard"

function AppSync() {
  return (
    <Dashboard>
      <div className="w-full">
        <div className="mb-4 w-full">
          <h1 className="text-xl mb-4">AppSync</h1>
          <Outlet />
        </div>
      </div>
    </Dashboard>
  )
}

export default AppSync
