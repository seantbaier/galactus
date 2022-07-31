import { styled } from "@stitches/react"

import { Sidebar } from "/@/components/Sidebar"

const Layout = styled("div", {
  display: "flex",
  width: "100%",
})

interface DashboardProps {
  children: React.ReactNode
}

function Dashboard({ children }: DashboardProps): JSX.Element {
  return (
    <Layout id="default-layout">
      <Sidebar />
      <div>{children}</div>
    </Layout>
  )
}

export default Dashboard
