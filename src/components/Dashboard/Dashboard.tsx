import { Sidebar } from "/@/components/Sidebar"

interface DashboardProps {
  children: React.ReactNode
}

function Dashboard({ children }: DashboardProps): JSX.Element {
  return (
    <div id="dashboard" className="flex w-full">
      <Sidebar />
      <div className="flex w-full p-[25px] mt-[30px]">{children}</div>
    </div>
  )
}

export default Dashboard
