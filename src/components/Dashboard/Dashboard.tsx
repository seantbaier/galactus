import { styled } from "@stitches/react"

import { Sidebar } from "/@/components/Sidebar"

const Layout = styled("div", {
  display: "flex",
  width: "100%",
})

const Main = styled("div", {
  padding: "25px",
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
      <Main>{children}</Main>
    </Layout>
  )
}

export default Dashboard
