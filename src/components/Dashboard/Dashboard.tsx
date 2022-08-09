import { Sidebar } from "/@/components/Sidebar"

interface DashboardProps {
  children: React.ReactNode
}

function Dashboard({ children }: DashboardProps): JSX.Element {
  return (
    <div id="dashboard" className="flex w-100">
      <Sidebar />
      <div className="flex w-screen p-[25px]">{children}</div>
    </div>
  )
}

export default Dashboard
