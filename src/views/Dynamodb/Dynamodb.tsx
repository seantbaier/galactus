import { Outlet } from "react-router-dom"

import DynamodbSidebar from "./DynamodbSidebar"
import { Sidebar } from "/@/components/Layout/Sidebar"

import { Breadcrumbs } from "/@/components/Breadcrumbs"
import { classNames } from "/@/utils/tailwind"
import { DASHBOARD_WIDTH } from "/@/constants/layout"

function Dynamodb() {
  return (
    <div className="flex w-full bg-black-dark">
      <Sidebar />

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
    </div>
  )
}

export default Dynamodb
