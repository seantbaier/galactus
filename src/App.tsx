import { styled } from "@stitches/react"

import AppRoutes from "/@/AppRoutes"
import { BLACK500, TERTIARY } from "./constants/colors"

const AppStyles = styled("div", {
  width: "100vw",
  height: "100vh",
  backgroundColor: BLACK500,
  display: "flex",
  color: TERTIARY,
})

function App(): JSX.Element {
  return (
    <AppStyles>
      <AppRoutes />
    </AppStyles>
  )
}

export default App
