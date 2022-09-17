import { Sidebar } from "/@/components/Sidebar"
import { Breadcrumbs } from "/@/components/Breadcrumbs"
import { classNames } from "/@/utils/tailwind"
import { DASHBOARD_WIDTH } from "/@/constants/layout"

interface DashboardProps {
  children: React.ReactNode
}

function Dashboard({ children }: DashboardProps): JSX.Element {
  return (
    <div id="dashboard" className="flex w-full bg-black-dark ">
      <Sidebar />
      <main className={classNames("flex justify-items-stretch flex-col", DASHBOARD_WIDTH)}>
        <Breadcrumbs />
        <div className="p-[5px]">
          <div className="flex flex-1 w-full px-5">{children}</div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
