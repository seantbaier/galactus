import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

import DynamodbSidebar from "./DynamodbSidebar"
import { Sidebar } from "/@/components/Layout/Sidebar"
import { Breadcrumbs } from "/@/components/Breadcrumbs"
import { classNames } from "/@/utils/tailwind"
import { DASHBOARD_WIDTH } from "/@/constants/layout"
import { useLocalstackStatusQuery } from "/@/hooks/useLocalstack"
import { ExclamationTriangleIcon } from "/@/components/Icons"

function ServiceNotRunning() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-black-main text-white p-6 min-w-md">
        <ExclamationTriangleIcon className="h-xs w-xs" />
        <div>Service Not Running!</div>
      </div>
    </div>
  )
}

function Dynamodb() {
  const { data } = useLocalstackStatusQuery()

  const [running, setRunning] = useState<boolean>(true)

  console.log("data", data)

  useEffect(() => {
    const { services } = data?.data || {}
    let isRunning = false
    if (services?.dynamodb && services?.dynamodb === "running") {
      //   isRunning = true
    }
    setRunning(isRunning)
  }, [data])

  return (
    <div className="flex w-full bg-black-dark">
      <Sidebar />

      {running ? (
        <main className={classNames("flex justify-items-stretch flex-col", DASHBOARD_WIDTH)}>
          <Breadcrumbs />
          <div className="flex flex-1 w-full">
            <div className="w-[20%] min-w-[200px]">
              <DynamodbSidebar />
            </div>
            <div className="w-[80%]">
              <Outlet />
            </div>
          </div>
        </main>
      ) : (
        <ServiceNotRunning />
      )}
    </div>
  )
}

export default Dynamodb
