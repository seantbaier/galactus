import { Sidebar } from "/@/components/Sidebar"
import { Breadcrumbs } from "/@/components/Breadcrumbs"

interface DashboardProps {
  children: React.ReactNode
}

function Dashboard({ children }: DashboardProps): JSX.Element {
  return (
    <div id="dashboard" className="flex w-full">
      <Sidebar />
      <div className="pl-5 pt-2 mt-[30px] bg-black-dark w-full">
        <div className="mb-4">
          <Breadcrumbs />
        </div>
        <div className="flex w-full">{children}</div>
      </div>
    </div>
  )
}

export default Dashboard
