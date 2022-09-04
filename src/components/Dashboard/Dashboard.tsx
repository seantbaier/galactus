import { Sidebar } from "/@/components/Sidebar"
import { Breadcrumbs } from "/@/components/Breadcrumbs"
import { classNames } from "/@/utils/tailwind"
import { DASHBOARD_WIDTH } from "/@/constants/layout"

interface DashboardProps {
  children: React.ReactNode
}

function Dashboard({ children }: DashboardProps): JSX.Element {
  return (
    <div id="dashboard" className="flex w-full bg-black-dark">
      <Sidebar />
      <main className={classNames("flex-col h-full pt-[30px]", DASHBOARD_WIDTH)}>
        <div className="h-full p-[5px]">
          <Breadcrumbs className="mb-4" />
          <div className="flex w-full px-5">{children}</div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
