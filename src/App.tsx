import { styled } from "@stitches/react"

import AppRoutes from "/@/AppRoutes"
import { Titlebar } from "./components/Titlebar"
import { TERTIARY, BLACK400 } from "./constants/colors"
import { MAC_OS_TITLEBAR_HEIGHT } from "./constants/macos"

const AppStyles = styled("div", {
  backgroundColor: BLACK400,
  color: TERTIARY,
  width: "100vw",
  height: "100vh",
})

const Main = styled("div", {
  marginTop: MAC_OS_TITLEBAR_HEIGHT,
  display: "flex",
  height: "100%",
})

function App(): JSX.Element {
  return (
    <AppStyles>
      <Titlebar />
      <Main>
        <AppRoutes />
      </Main>
    </AppStyles>
  )
}

export default App
