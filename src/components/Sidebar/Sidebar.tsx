import { styled } from "@stitches/react"

// Componentes
import { Navigation } from "./Navbar"

// Constants
import { PRIMARY_BLACK } from "/@/constants/colors"

const SidebarStyles = styled("div", {
  backgroundColor: PRIMARY_BLACK,
  minWidth: "50px",
  display: "flex",
  justifyContent: "center",
  padding: "15px 0 0 0",
})

function Sidebar(): JSX.Element {
  return (
    <SidebarStyles>
      <Navigation />
    </SidebarStyles>
  )
}

export default Sidebar
