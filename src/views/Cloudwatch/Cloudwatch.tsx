import { Outlet } from "react-router-dom"

import { Sidebar } from "/@/components/Layout/Sidebar"
import { Breadcrumbs } from "/@/components/Breadcrumbs"
import { classNames } from "/@/utils/tailwind"
import { DASHBOARD_WIDTH } from "/@/constants/layout"
import { useListLogGroups } from "/@/hooks/useCloudwatch"

function Cloudwatch() {
  const { status, result } = useListLogGroups({})
  console.log("data", result)

  return <div className="flex w-full bg-black-dark">cloudwatch</div>
}

export default Cloudwatch
